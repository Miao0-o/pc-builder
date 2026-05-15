import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const url = new URL(req.url);
  const path = url.pathname.split("/").filter(Boolean);
  const method = req.method;

  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");
    let userId: string | null = null;

    if (token) {
      const { data: { user } } = await supabase.auth.getUser(token);
      userId = user?.id || null;
    }

    // GET /configs — list user configs
    if (method === "GET" && path.length <= 2) {
      // If path has an ID, get single config
      if (path.length === 2 && path[1] !== "configs") {
        const configId = path[path.length - 1];
        const { data, error } = await supabase
          .from("configs")
          .select("*")
          .eq("id", configId)
          .is("deleted_at", null)
          .single();
        if (error) throw error;
        if (!data.is_public && data.user_id !== userId) {
          return new Response(JSON.stringify({ error: "Not found" }), {
            status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify({ data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // List configs
      if (!userId) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const status = url.searchParams.get("status") || "draft,published,private";
      const page = parseInt(url.searchParams.get("page") || "1");
      const limit = Math.min(parseInt(url.searchParams.get("limit") || "20"), 100);
      const offset = (page - 1) * limit;

      let query = supabase
        .from("configs")
        .select("*", { count: "exact" })
        .eq("user_id", userId)
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (status !== "all") {
        query = query.in("status", status.split(","));
      }

      const { data, count, error } = await query;
      if (error) throw error;

      return new Response(JSON.stringify({ data, total: count, page, limit }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // POST /configs — create
    if (method === "POST") {
      const body = await req.json();

      let shareCode = null;
      if (body.is_public) {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        for (let attempt = 0; attempt < 20; attempt++) {
          let code = "";
          for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
          const { data: existing } = await supabase.from("configs").select("id").eq("share_code", code).single();
          if (!existing) { shareCode = code; break; }
        }
      }

      const { data, error } = await supabase.from("configs").insert({
        user_id: userId,
        name: body.name,
        parts_snapshot: body.parts_snapshot || {},
        total_price: body.total_price || 0,
        benchmark_score: body.benchmark_score || 0,
        benchmark_level: body.benchmark_level,
        platform: body.platform,
        is_public: body.is_public || false,
        share_code: shareCode,
        shared_at: shareCode ? new Date().toISOString() : null,
      }).select().single();

      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // PATCH /configs/:id — update
    if (method === "PATCH" && path.length === 3) {
      if (!userId) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const configId = path[path.length - 1];
      const body = await req.json();
      const { data: existing, error: fetchErr } = await supabase
        .from("configs")
        .select("version, user_id, is_public")
        .eq("id", configId)
        .single();

      if (fetchErr || !existing || existing.user_id !== userId) {
        return new Response(JSON.stringify({ error: "Not found" }), {
          status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (body.version && body.version !== existing.version) {
        return new Response(JSON.stringify({ error: "Conflict: version mismatch", currentVersion: existing.version }), {
          status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const updates: Record<string, any> = { updated_at: new Date().toISOString(), version: existing.version + 1 };
      if (body.name !== undefined) updates.name = body.name;
      if (body.status !== undefined) {
        updates.status = body.status;
        if (body.status === "published") {
          updates.is_public = true;
          if (!existing.is_public) {
            const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
            for (let attempt = 0; attempt < 20; attempt++) {
              let code = "";
              for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
              const { data: dup } = await supabase.from("configs").select("id").eq("share_code", code).single();
              if (!dup) { updates.share_code = code; break; }
            }
            updates.shared_at = new Date().toISOString();
          }
        }
        if (body.status === "trashed") updates.deleted_at = new Date().toISOString();
      }
      if (body.parts_snapshot !== undefined) updates.parts_snapshot = body.parts_snapshot;
      if (body.total_price !== undefined) updates.total_price = body.total_price;
      if (body.benchmark_score !== undefined) updates.benchmark_score = body.benchmark_score;
      if (body.benchmark_level !== undefined) updates.benchmark_level = body.benchmark_level;

      const { data, error } = await supabase
        .from("configs")
        .update(updates)
        .eq("id", configId)
        .select()
        .single();

      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // DELETE /configs/:id — soft delete
    if (method === "DELETE" && path.length === 3) {
      if (!userId) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const configId = path[path.length - 1];
      const { error } = await supabase
        .from("configs")
        .update({ status: "trashed", deleted_at: new Date().toISOString(), updated_at: new Date().toISOString() })
        .eq("id", configId)
        .eq("user_id", userId);

      if (error) throw error;
      return new Response(JSON.stringify({ deleted: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // GET /s/:shareCode — public share page data
    if (method === "GET" && path.length >= 2 && path[path.length - 2] === "s") {
      const shareCode = path[path.length - 1];
      const { data, error } = await supabase
        .from("configs")
        .select("*")
        .eq("share_code", shareCode)
        .is("deleted_at", null)
        .single();

      if (error || !data) {
        return new Response(JSON.stringify({ error: "Not found" }), {
          status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Increment view count
      await supabase.from("configs").update({ view_count: (data.view_count || 0) + 1 }).eq("id", data.id);

      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
