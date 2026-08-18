const FraudEngine = {
  thresholds: {
    high: 500000,
    medium: 150000,
    hardBlock: 2000000,
    rapidMinutes: 5,
    rapidCount: 3,
    duplicateCount: 3
  },

  riskyCategories: [
    'International Transfer',
    'Online Gambling',
    'Cryptocurrency',
    'Cash Advance'
  ],

  rules: [
    { name: 'Hard block', description: 'Any amount above NPR 2,000,000 is immediately blocked as high risk.' },
    { name: 'Large amount', description: 'Amount of NPR 500,000 or more is treated as high risk.' },
    { name: 'Elevated amount', description: 'Amount of NPR 150,000 or more is treated as a medium-risk indicator.' },
    { name: 'High-risk category', description: 'Categories such as International Transfer, Online Gambling, Cryptocurrency and Cash Advance add a medium-risk indicator.' },
    { name: 'Rapid activity', description: 'Three or more transactions within five minutes indicate unusual automated behaviour.' },
    { name: 'Repeated pattern', description: 'Three or more transactions of the same amount suggest a systematic duplicate pattern.' },
    { name: 'Escalation', description: 'Two or more medium-risk indicators escalate the transaction to high risk.' }
  ],

  highMessage(amount) {
    return `Amount of NPR ${amount} at or above the high-risk threshold (NPR 500,000)`;
  },

  mediumMessage(amount) {
    return `Amount of NPR ${amount} at or above the elevated threshold (NPR 150,000)`;
  },

  analyze(tx, history) {
    const reasons = [];
    const t = this.thresholds;
    const recent = (history || []).filter((h) => h.owner === tx.owner && h.id !== tx.id);

    if (tx.amount > t.hardBlock) {
      reasons.push({ level: 'HIGH', message: 'Amount exceeds the hard block threshold of NPR 2,000,000' });
    }

    if (tx.amount >= t.high) {
      reasons.push({ level: 'HIGH', message: this.highMessage(this.formatAmount(tx.amount)) });
    }

    if (tx.amount >= t.medium) {
      reasons.push({ level: 'MEDIUM', message: this.mediumMessage(this.formatAmount(tx.amount)) });
    }

    if (this.riskyCategories.includes(tx.category)) {
      reasons.push({ level: 'MEDIUM', message: `Category "${tx.category}" is recognised as high-risk` });
    }

    const cutoff = tx.date - t.rapidMinutes * 60000;
    const rapidCount = recent.filter((h) => h.date >= cutoff).length;
    if (rapidCount >= t.rapidCount - 1) {
      reasons.push({ level: 'MEDIUM', message: `Rapid activity: ${t.rapidCount} or more transactions within ${t.rapidMinutes} minutes` });
    }

    const duplicateCount = recent.filter((h) => h.amount === tx.amount).length;
    if (duplicateCount >= t.duplicateCount - 1) {
      reasons.push({ level: 'MEDIUM', message: `Repeated pattern: ${t.duplicateCount} or more transactions of the same amount` });
    }

    const mediumCount = reasons.filter((r) => r.level === 'MEDIUM').length;
    const hasHigh = reasons.some((r) => r.level === 'HIGH');
    if (!hasHigh && mediumCount >= 2) {
      reasons.push({ level: 'HIGH', message: 'Escalation: multiple medium-risk indicators combined' });
    }

    let risk = 'LOW';
    if (reasons.some((r) => r.level === 'HIGH')) {
      risk = 'HIGH';
    } else if (mediumCount >= 1) {
      risk = 'MEDIUM';
    }

    let status = 'APPROVED';
    if (risk === 'MEDIUM') {
      status = 'FLAGGED';
    } else if (risk === 'HIGH') {
      status = 'BLOCKED';
    }

    return { risk, status, reasons };
  },

  formatAmount(value) {
    return Number(value).toLocaleString('en-US', { maximumFractionDigits: 0 });
  }
};