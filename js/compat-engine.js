// ============================================================
// CompatEngine — 9-rule hardware compatibility checker
// ============================================================

const SEVERITY = { BLOCK: 'block', WARN: 'warn', INFO: 'info' };

export class CompatEngine {
  constructor() {
    this.rules = this._buildRules();
  }

  _specOf(selectedParts, category) {
    const part = selectedParts[category];
    if (!part) return null;
    if (typeof part === 'string') {
      return pcComponents[category]?.options.find(o => o.name === part)?.structuredSpecs || null;
    }
    return part.structuredSpecs || null;
  }

  _partName(selectedParts, category) {
    const part = selectedParts[category];
    if (!part) return '';
    if (typeof part === 'string') return part;
    return part.name || '';
  }

  _buildRules() {
    const self = this;
    return [
      // Rule 1: CPU ↔ Motherboard Socket (BLOCK)
      {
        id: 'cpu-socket', name: 'CPU 与主板插槽兼容', severity: SEVERITY.BLOCK,
        applies: parts => !!(parts.cpu && parts.motherboard),
        check(parts) {
          const cpu = self._specOf(parts, 'cpu');
          const mb = self._specOf(parts, 'motherboard');
          if (!cpu || !mb) return null;
          if (cpu.socket !== mb.socket) {
            return {
              ruleId: 'cpu-socket', severity: SEVERITY.BLOCK,
              message: `${self._partName(parts, 'cpu')}（${cpu.socket}）无法安装到 ${self._partName(parts, 'motherboard')}（${mb.socket}）`,
              conflictParts: ['cpu', 'motherboard'],
              detail: `CPU 接口 ${cpu.socket} ≠ 主板接口 ${mb.socket}，物理插槽不匹配`,
              fix: `更换为 ${mb.socket} 接口的 CPU，或更换为 ${cpu.socket} 接口的主板`,
            };
          }
          return null;
        },
      },
      // Rule 2: Motherboard ↔ Memory Type (BLOCK)
      {
        id: 'memory-type', name: '内存类型兼容', severity: SEVERITY.BLOCK,
        applies: parts => !!(parts.ram && parts.motherboard),
        check(parts) {
          const ram = self._specOf(parts, 'ram');
          const mb = self._specOf(parts, 'motherboard');
          if (!ram || !mb) return null;
          if (ram.type !== mb.memoryType) {
            return {
              ruleId: 'memory-type', severity: SEVERITY.BLOCK,
              message: `${ram.type} 内存无法插入 ${mb.memoryType} 主板`,
              conflictParts: ['ram', 'motherboard'],
              detail: `内存类型 ${ram.type} ≠ 主板支持 ${mb.memoryType}，DDR4/DDR5 金手指缺口位置不同，无法互插`,
              fix: `更换为 ${mb.memoryType} 内存`,
            };
          }
          return null;
        },
      },
      // Rule 3: PSU Wattage (BLOCK)
      {
        id: 'psu-wattage', name: '电源功率检查', severity: SEVERITY.BLOCK,
        applies: parts => !!(parts.psu && (parts.cpu || parts.gpu)),
        check(parts) {
          const psu = self._specOf(parts, 'psu');
          const cpu = self._specOf(parts, 'cpu');
          const gpu = self._specOf(parts, 'gpu');
          if (!psu) return null;
          const cpuTdp = cpu?.tdp || 0;
          const gpuTdp = gpu?.tdp || 0;
          const totalTdp = cpuTdp + gpuTdp;
          const required = totalTdp + 150;
          if (psu.wattage < totalTdp + 50) {
            return {
              ruleId: 'psu-wattage', severity: SEVERITY.BLOCK,
              message: `电源功率不足：CPU(${cpuTdp}W)+GPU(${gpuTdp}W)≈${totalTdp}W，需至少${required}W，当前${psu.wattage}W`,
              conflictParts: ['psu', 'cpu', 'gpu'],
              detail: `满载功耗 ${totalTdp}W + 建议余量150W = ${required}W > 电源额定 ${psu.wattage}W`,
              fix: `更换为 ${Math.ceil(required / 50) * 50}W 以上电源`,
            };
          }
          if (psu.wattage < required) {
            return {
              ruleId: 'psu-wattage', severity: SEVERITY.WARN,
              message: `电源余量不足：需${required}W，当前${psu.wattage}W`,
              conflictParts: ['psu'],
              detail: `建议电源 ${required}W 以上以获得合理余量`,
              fix: `建议升级到 ${Math.ceil(required / 50) * 50}W 电源`,
            };
          }
          return null;
        },
      },
      // Rule 4: GPU Length ↔ Case
      {
        id: 'gpu-length', name: '显卡长度与机箱兼容', severity: SEVERITY.WARN,
        applies: parts => !!(parts.gpu && parts.case),
        check(parts) {
          const gpu = self._specOf(parts, 'gpu');
          const c = self._specOf(parts, 'case');
          if (!gpu?.length || !c?.gpuMaxLength) return null;
          const diff = gpu.length - c.gpuMaxLength;
          if (diff > 3) {
            return {
              ruleId: 'gpu-length', severity: SEVERITY.BLOCK,
              message: `显卡过长：${gpu.length}mm > 机箱限长 ${c.gpuMaxLength}mm`,
              conflictParts: ['gpu', 'case'],
              detail: `显卡 ${gpu.length}mm 超过机箱限长 ${c.gpuMaxLength}mm，无法安装`,
              fix: `更换长度 ≤ ${c.gpuMaxLength}mm 的显卡`,
            };
          }
          if (diff > 0) {
            return {
              ruleId: 'gpu-length', severity: SEVERITY.WARN,
              message: `显卡偏长：${gpu.length}mm，机箱限长 ${c.gpuMaxLength}mm，仅余${Math.abs(diff)}mm`,
              conflictParts: ['gpu', 'case'],
              detail: `仅剩 ${Math.abs(diff)}mm 空间，安装可能困难`,
              fix: `建议选长度 ≤ ${c.gpuMaxLength - 10}mm 的显卡`,
            };
          }
          return null;
        },
      },
      // Rule 5: Cooler Height ↔ Case
      {
        id: 'cooler-height', name: '散热器高度兼容', severity: SEVERITY.WARN,
        applies: parts => !!(parts.cooler && parts.case),
        check(parts) {
          const cooler = self._specOf(parts, 'cooler');
          const c = self._specOf(parts, 'case');
          if (!cooler?.height || !c?.coolerMaxHeight) return null;
          if (cooler.height > c.coolerMaxHeight) {
            return {
              ruleId: 'cooler-height', severity: SEVERITY.BLOCK,
              message: `散热器过高：${cooler.height}mm > 机箱限高 ${c.coolerMaxHeight}mm`,
              conflictParts: ['cooler', 'case'],
              detail: `风冷散热器高度 ${cooler.height}mm > 机箱限高 ${c.coolerMaxHeight}mm，侧板盖不上`,
              fix: `更换高度 ≤ ${c.coolerMaxHeight}mm 的散热器，或换水冷`,
            };
          }
          return null;
        },
      },
      // Rule 6: Motherboard Form Factor ↔ Case
      {
        id: 'mb-formfactor', name: '主板板型兼容', severity: SEVERITY.WARN,
        applies: parts => !!(parts.motherboard && parts.case),
        check(parts) {
          const mb = self._specOf(parts, 'motherboard');
          const c = self._specOf(parts, 'case');
          if (!mb?.formFactor || !c?.supportedMB) return null;
          if (!c.supportedMB?.includes(mb.formFactor)) {
            return {
              ruleId: 'mb-formfactor', severity: SEVERITY.BLOCK,
              message: `${mb.formFactor} 主板无法装入仅支持 ${c.supportedMB?.join('/')} 的机箱`,
              conflictParts: ['motherboard', 'case'],
              detail: `主板板型 ${mb.formFactor} 不在机箱支持列表 [${c.supportedMB}] 中`,
              fix: `更换为 ${c.supportedMB[0]} 主板，或更换支持 ${mb.formFactor} 的机箱`,
            };
          }
          return null;
        },
      },
      // Rule 7: CPU ↔ Chipset (INFO)
      {
        id: 'cpu-chipset', name: 'CPU 芯片组搭配', severity: SEVERITY.INFO,
        applies: parts => !!(parts.cpu && parts.motherboard),
        check(parts) {
          const cpu = self._specOf(parts, 'cpu');
          const mb = self._specOf(parts, 'motherboard');
          if (!cpu || !mb) return null;
          const cpuName = self._partName(parts, 'cpu');
          if (cpu.platform === 'intel') {
            const isKCpu = cpuName?.includes('K') || cpuName?.includes('KF');
            const isBLow = mb.chipset?.startsWith('B');
            if (isKCpu && isBLow) {
              return {
                ruleId: 'cpu-chipset', severity: SEVERITY.INFO,
                message: `K系CPU搭配${mb.chipset}主板无法CPU超频，但不影响正常使用`,
                conflictParts: ['cpu', 'motherboard'],
                detail: 'K系列CPU支持超频，但B系芯片组不支持CPU超频功能（不影响内存超频）',
                fix: '如需CPU超频，更换为Z系列主板（如 Z790）',
              };
            }
          }
          return null;
        },
      },
      // Rule 8: Radiator ↔ Case
      {
        id: 'radiator-support', name: '水冷冷排兼容', severity: SEVERITY.INFO,
        applies: parts => !!(parts.cooler && parts.case),
        check(parts) {
          const cooler = self._specOf(parts, 'cooler');
          const c = self._specOf(parts, 'case');
          if (!cooler?.radiatorSize || !c?.radiatorSupport) return null;
          if (!c.radiatorSupport.includes(cooler.radiatorSize)) {
            return {
              ruleId: 'radiator-support', severity: SEVERITY.BLOCK,
              message: `${cooler.radiatorSize}mm 水冷需要机箱支持该冷排位`,
              conflictParts: ['cooler', 'case'],
              detail: `机箱冷排支持: ${c.radiatorSupport.join('/')}，不支持 ${cooler.radiatorSize}`,
              fix: `更换为 ${c.radiatorSupport[0]} 水冷，或换支持 ${cooler.radiatorSize} 冷排的机箱`,
            };
          }
          return null;
        },
      },
      // Rule 9: M.2 Slots
      {
        id: 'm2-slots', name: 'M.2接口数量', severity: SEVERITY.INFO,
        applies: parts => !!(parts.storage && parts.motherboard),
        check(parts) {
          const ssd = self._specOf(parts, 'storage');
          const mb = self._specOf(parts, 'motherboard');
          if (!ssd || ssd.type !== 'NVMe' || !mb?.m2Slots) return null;
          if (mb.m2Slots < 1) {
            return {
              ruleId: 'm2-slots', severity: SEVERITY.WARN,
              message: '主板没有 M.2 接口，NVMe 固态无法安装',
              conflictParts: ['storage', 'motherboard'],
              detail: '需要 M.2 接口的主板才能安装 NVMe 固态',
              fix: '更换带 M.2 接口的主板，或改用 SATA 固态',
            };
          }
          return null;
        },
      },
    ];
  }

  checkAll(selectedParts) {
    const results = [];
    for (const rule of this.rules) {
      if (!rule.applies(selectedParts)) continue;
      const result = rule.check(selectedParts);
      if (result) results.push(result);
    }
    const blocks = results.filter(r => r.severity === SEVERITY.BLOCK);
    const warns = results.filter(r => r.severity === SEVERITY.WARN);
    const infos = results.filter(r => r.severity === SEVERITY.INFO);
    return {
      results,
      summary: {
        total: results.length,
        blocks: blocks.length,
        warns: warns.length,
        infos: infos.length,
        isReady: blocks.length === 0,
        status: blocks.length > 0 ? 'blocked' : warns.length > 0 ? 'warning' : 'compatible',
      }
    };
  }

  isCompatible(selectedParts) {
    return this.checkAll(selectedParts).summary.isReady;
  }
}

export const compatEngine = new CompatEngine();
