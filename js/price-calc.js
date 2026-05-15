// ============================================================
// Price Calculator — total, power, value score, alerts
// ============================================================

export const PriceCalc = {
  getTotal(selectedParts) {
    let total = 0;
    const breakdown = {};
    for (const [key, part] of Object.entries(selectedParts)) {
      const price = typeof part === 'object' ? part.price : 0;
      total += price || 0;
      breakdown[key] = price || 0;
    }
    return { total, breakdown };
  },

  getCategoryPercentages(breakdown, total) {
    const pct = {};
    for (const [key, value] of Object.entries(breakdown)) {
      pct[key] = total > 0 ? Math.round((value / total) * 100) : 0;
    }
    return pct;
  },

  getPowerEstimate(selectedParts) {
    const cpuTdp = selectedParts.cpu?.structuredSpecs?.tdp || 0;
    const gpuTdp = selectedParts.gpu?.structuredSpecs?.tdp || 0;
    const mbPower = 50;
    const ramPower = (selectedParts.ram?.structuredSpecs?.sticks || 2) * 5;
    const storagePower = 10;
    const fanPower = 4 * 3;
    const totalWatts = cpuTdp + gpuTdp + mbPower + ramPower + storagePower + fanPower;
    const psuWattage = selectedParts.psu?.structuredSpecs?.wattage || 0;
    const headroom = psuWattage - totalWatts;
    const headroomPercent = psuWattage > 0 ? Math.round((headroom / psuWattage) * 100) : 0;

    return {
      totalWatts,
      cpuTdp,
      gpuTdp,
      headroom,
      headroomPercent,
      psuWattage,
      isOverloaded: headroom < 0,
      status: headroom < 0 ? 'overload' : headroomPercent < 15 ? 'tight' : 'good',
    };
  },

  getValueScore(selectedParts, benchmark) {
    const { total } = this.getTotal(selectedParts);
    if (total === 0) return { score: 0, grade: '—' };

    const scorePerYuan = benchmark.totalWan / (total / 10000);
    let grade;
    if (scorePerYuan >= 1.2) grade = '优秀';
    else if (scorePerYuan >= 0.9) grade = '良好';
    else if (scorePerYuan >= 0.6) grade = '一般';
    else grade = '偏低';

    return {
      score: Math.min(Math.round(scorePerYuan * 100 / 1.5), 100),
      scorePerYuan: Math.round(scorePerYuan * 100) / 100,
      grade,
    };
  },

  getPriceAlerts(breakdown, total) {
    const alerts = [];
    const pct = this.getCategoryPercentages(breakdown, total);

    if (pct.gpu > 45) {
      alerts.push({ type: 'gpu-heavy', severity: 'warn', message: `显卡占预算 ${pct.gpu}%，比例偏高` });
    }
    if (pct.case < 2 && total > 5000) {
      alerts.push({ type: 'case-cheap', severity: 'info', message: '机箱预算占比偏低，可能影响散热和扩展性' });
    }
    if (pct.psu < 4) {
      alerts.push({ type: 'psu-cheap', severity: 'warn', message: '电源预算占比偏低，劣质电源可能损坏硬件' });
    }

    return alerts;
  },
};
