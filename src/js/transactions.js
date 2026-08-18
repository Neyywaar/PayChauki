const Store = {
  transactionsKey: 'paychauki_transactions',
  alertsKey: 'paychauki_alerts',

  getTransactions() {
    try {
      return JSON.parse(storage.get(this.transactionsKey)) || [];
    } catch (e) {
      return [];
    }
  },

  saveTransactions(list) {
    storage.set(this.transactionsKey, JSON.stringify(list));
  },

  getAlerts() {
    try {
      return JSON.parse(storage.get(this.alertsKey)) || [];
    } catch (e) {
      return [];
    }
  },

  saveAlerts(list) {
    storage.set(this.alertsKey, JSON.stringify(list));
  },

  reset() {
    this.saveTransactions([]);
    this.saveAlerts([]);
  },

  removeLegacy() {
    const list = this.getTransactions().filter(
      (t) => t.owner !== 'Demo Customer' && t.owner !== 'Other Customer'
    );
    this.saveTransactions(list);
  }
};

const Transactions = {
  currency: 'NPR',

  formatAmount(value) {
    return `${this.currency} ${Number(value).toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  },

  create(payload, owner, when) {
    const history = Store.getTransactions();
    const tx = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      description: payload.description.trim(),
      category: payload.category,
      amount: Number(payload.amount),
      location: payload.location.trim() || 'Unspecified',
      owner,
      date: when || Date.now(),
      reported: false
    };

    const result = FraudEngine.analyze(tx, history);
    tx.risk = result.risk;
    tx.status = result.status;
    tx.reasons = result.reasons;

    history.push(tx);
    Store.saveTransactions(history);

    if (tx.status !== 'APPROVED') {
      this.raiseAlert(tx);
    }

    return tx;
  },

  raiseAlert(tx) {
    const alerts = Store.getAlerts();
    const blocked = tx.status === 'BLOCKED';
    alerts.unshift({
      id: tx.id,
      title: blocked
        ? 'High-risk transaction blocked'
        : 'Suspicious transaction flagged',
      message: `${tx.description} — ${this.formatAmount(tx.amount)}`,
      txId: tx.id,
      owner: tx.owner,
      date: tx.date,
      reasons: tx.reasons || []
    });
    Store.saveAlerts(alerts);
  },

  byOwner(owner) {
    return Store.getTransactions()
      .filter((t) => t.owner === owner)
      .sort((a, b) => b.date - a.date);
  },

  all() {
    return Store.getTransactions().slice().sort((a, b) => b.date - a.date);
  },

  report(txId) {
    const all = Store.getTransactions();
    const tx = all.find((t) => t.id === txId);
    if (tx) {
      tx.reported = true;
      Store.saveTransactions(all);
    }
  }
};