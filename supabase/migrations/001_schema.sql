-- ============================================================
-- PC Builder Database Schema v1.0
-- ============================================================

-- 1. Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username    TEXT UNIQUE,
  avatar_url  TEXT,
  preferences JSONB DEFAULT '{"theme":"dark","currency":"CNY","platform":"auto"}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_read_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Auto-set updated_at on row update
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_configs_updated_at
  BEFORE UPDATE ON configs
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username) VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 2. Configs
CREATE TABLE IF NOT EXISTS configs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name            TEXT NOT NULL DEFAULT '我的配置',
  status          TEXT NOT NULL DEFAULT 'draft'
                  CHECK (status IN ('draft','published','private','trashed')),
  CONSTRAINT chk_total_price_non_negative CHECK (total_price >= 0),
  CONSTRAINT chk_benchmark_score_non_negative CHECK (benchmark_score >= 0),
  parts_snapshot  JSONB NOT NULL DEFAULT '{}',
  total_price     INT NOT NULL DEFAULT 0,
  benchmark_score INT NOT NULL DEFAULT 0,
  benchmark_level TEXT,
  platform        TEXT,
  is_public       BOOLEAN NOT NULL DEFAULT false,
  share_code      TEXT UNIQUE,
  shared_at       TIMESTAMPTZ,
  view_count      INT NOT NULL DEFAULT 0,
  version         INT NOT NULL DEFAULT 1,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at      TIMESTAMPTZ
);

CREATE INDEX idx_configs_user_status ON configs(user_id, status) WHERE deleted_at IS NULL;
CREATE INDEX idx_configs_share_code ON configs(share_code) WHERE share_code IS NOT NULL;
CREATE INDEX idx_configs_created ON configs(created_at DESC);
CREATE INDEX idx_configs_public ON configs(is_public, created_at DESC) WHERE is_public = true AND deleted_at IS NULL;

ALTER TABLE configs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "configs_read_own" ON configs FOR SELECT USING (
  auth.uid() = user_id OR is_public = true
);
CREATE POLICY "configs_insert_own" ON configs FOR INSERT WITH CHECK (
  auth.uid() = user_id OR user_id IS NULL
);
CREATE POLICY "configs_update_own" ON configs FOR UPDATE USING (
  auth.uid() = user_id
);
CREATE POLICY "configs_delete_own" ON configs FOR DELETE USING (
  auth.uid() = user_id
);

-- Generate unique 6-char share code
CREATE OR REPLACE FUNCTION gen_share_code()
RETURNS TEXT
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  code TEXT;
  done BOOLEAN := false;
  max_iterations INT := 100;
  iteration INT := 0;
BEGIN
  WHILE NOT done LOOP
    iteration := iteration + 1;
    IF iteration > max_iterations THEN
      RAISE EXCEPTION 'Failed to generate unique share code after % attempts', max_iterations;
    END IF;
    code := '';
    FOR i IN 1..6 LOOP
      code := code || substr(chars, floor(random() * length(chars) + 1)::int, 1);
    END LOOP;
    IF NOT EXISTS (SELECT 1 FROM configs WHERE share_code = code) THEN
      done := true;
    END IF;
  END LOOP;
  RETURN code;
END;
$$ LANGUAGE plpgsql VOLATILE;

-- 3. Favorites
CREATE TABLE IF NOT EXISTS favorites (
  user_id    UUID REFERENCES profiles(id) ON DELETE CASCADE,
  config_id  UUID REFERENCES configs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, config_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "favorites_read_own" ON favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "favorites_insert_own" ON favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "favorites_delete_own" ON favorites FOR DELETE USING (auth.uid() = user_id);

-- 4. View History
CREATE TABLE IF NOT EXISTS view_history (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES profiles(id) ON DELETE CASCADE,
  config_id  UUID REFERENCES configs(id) ON DELETE CASCADE,
  viewed_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_history_user_time ON view_history(user_id, viewed_at DESC);

ALTER TABLE view_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "history_read_own" ON view_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "history_insert_own" ON view_history FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 5. Feedbacks
CREATE TABLE IF NOT EXISTS feedbacks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES profiles(id) ON DELETE SET NULL,
  type        TEXT NOT NULL CHECK (type IN ('bug','feature','data','other')),
  description TEXT NOT NULL CHECK (length(description) >= 10),
  screenshot  TEXT,
  context     JSONB NOT NULL DEFAULT '{}',
  status      TEXT NOT NULL DEFAULT 'open'
              CHECK (status IN ('open','acknowledged','resolved','closed')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_feedbacks_status ON feedbacks(status);

ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "feedbacks_insert_all" ON feedbacks FOR INSERT WITH CHECK (true);
CREATE POLICY "feedbacks_read_own" ON feedbacks FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

-- 6. Parts Price Cache
CREATE TABLE IF NOT EXISTS parts_cache (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category         TEXT NOT NULL,
  name             TEXT NOT NULL,
  specs            JSONB NOT NULL DEFAULT '{}',
  lowest_price     JSONB,
  price_updated_at TIMESTAMPTZ,
  in_stock         BOOLEAN DEFAULT true,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(category, name)
);

ALTER TABLE parts_cache ENABLE ROW LEVEL SECURITY;
CREATE POLICY "parts_cache_read_all" ON parts_cache FOR SELECT USING (true);

-- 7. Rate Limits
CREATE TABLE IF NOT EXISTS rate_limits (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID REFERENCES profiles(id) ON DELETE CASCADE,
  endpoint     TEXT NOT NULL,
  count        INT NOT NULL DEFAULT 1,
  window_start TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_ratelimit_user ON rate_limits(user_id, endpoint);

ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "rate_limits_read_own" ON rate_limits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "rate_limits_insert_own" ON rate_limits FOR INSERT WITH CHECK (auth.uid() = user_id);
