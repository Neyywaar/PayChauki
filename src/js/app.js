const App = {
  currentFilter: 'ALL',
  toastTimer: null,

  init() {
    this.bindEvents();
    this.bootstrap();
  },

  bindEvents() {
    document.getElementById('login-form').addEventListener('submit', (e) => this.handleLoginSubmit(e));
    document.getElementById('signup-form').addEventListener('submit', (e) => this.handleSignupSubmit(e));
    document.getElementById('analyst-login-form').addEventListener('submit', (e) => this.handleAnalystSubmit(e));

    document.getElementById('show-signup').addEventListener('click', () => this.showAuthForm('signup-form'));
    document.getElementById('show-login').addEventListener('click', () => this.showAuthForm('login-form'));

    document.getElementById('logout-btn').addEventListener('click', () => this.handleLogout());
    document.getElementById('demo-btn').addEventListener('click', () => this.handleDemo());

    document.getElementById('new-transaction-btn').addEventListener('click', () => this.openModal());
    document.getElementById('modal-close').addEventListener('click', () => this.closeModal());
    document.getElementById('modal-cancel').addEventListener('click', () => this.closeModal());
    document.getElementById('transaction-form').addEventListener('submit', (e) => this.handleCreateTransaction(e));

    document.getElementById('analyst-filters').addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-filter');
      if (btn) this.setFilter(btn.dataset.filter);
    });

    document.getElementById('customer-table-body').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-report]');
      if (btn) this.handleReport(btn.dataset.report);
    });
  },

  bootstrap() {
    Auth.initUsers();
    Store.removeLegacy();

    const session = Auth.current();
    if (session && Auth.findByUsername(session.username)) {
      this.enterApp(session);
    } else {
      if (session) Auth.logout();
      this.showLogin();
    }
  },

  handleLoginSubmit(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const result = Auth.login(username, password);
    if (result.error) {
      this.flashError('error-login', result.error);
      return;
    }
    this.resetFormErrors();
    this.enterApp(Auth.current());
  },

  handleSignupSubmit(e) {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;

    if (username.trim().length < 3) {
      this.flashError('error-signup-username', 'Username must be at least 3 characters.');
      return;
    }
    if (password.length < 4) {
      this.flashError('error-signup-password', 'Password must be at least 4 characters.');
      return;
    }
    if (password !== confirm) {
      this.flashError('error-signup-confirm', 'Passwords do not match.');
      return;
    }

    const result = Auth.register(username, password);
    if (result.error) {
      this.flashError('error-signup-username', result.error);
      return;
    }
    this.resetFormErrors();
    this.enterApp(Auth.current());
  },

  handleAnalystSubmit(e) {
    e.preventDefault();
    const username = document.getElementById('analyst-username').value;
    const password = document.getElementById('analyst-password').value;
    const result = Auth.login(username, password);
    if (result.error) {
      this.flashError('error-analyst', result.error);
      return;
    }
    this.resetFormErrors();
    this.enterApp(Auth.current());
  },

  showAuthForm(formId) {
    document.getElementById('login-form').classList.toggle('hidden', formId !== 'login-form');
    document.getElementById('signup-form').classList.toggle('hidden', formId !== 'signup-form');
    this.resetFormErrors();
  },

  handleLogout() {
    Auth.logout();
    this.showLogin();
  },

  displayName(session) {
    return session.role === 'analyst' ? 'Sandesh Shrestha' : session.username;
  },

  enterApp(session) {
    document.getElementById('login-view').classList.add('hidden');
    document.getElementById('app-view').classList.remove('hidden');

    const displayName = this.displayName(session);
    document.getElementById('user-name').textContent = displayName;
    document.getElementById('avatar').textContent = this.initials(displayName);

    this.showSubview(session.role === 'customer' ? 'customer-view' : 'analyst-view');
  },

  showLogin() {
    document.getElementById('app-view').classList.add('hidden');
    document.getElementById('login-view').classList.remove('hidden');
  },

  initials(name) {
    return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  },

  handleDemo() {
    this.showToast('Academic Demo Prototype', 'Simulated Data Only', 'accent');
  },

  showSubview(key) {
    const sections = ['customer-view', 'analyst-view'];
    sections.forEach((s) => {
      document.getElementById(s).classList.toggle('hidden', s !== key);
    });

    if (key === 'customer-view') {
      this.renderCustomer();
      this.currentFilter = 'ALL';
    } else {
      this.renderAnalyst();
    }
  },

  renderCustomer() {
    const session = Auth.current();
    if (!session) return;

    const txs = Transactions.byOwner(session.username);
    const alerts = Store.getAlerts().filter((a) => a.owner === session.name);
    const total = txs.reduce((sum, t) => sum + t.amount, 0);
    const approved = txs.filter((t) => t.status === 'APPROVED').length;

    document.getElementById('customer-stats').innerHTML = this.statCard('Total Transactions', txs.length, '') +
      this.statCard('Total Amount', Transactions.formatAmount(total), '') +
      this.statCard('Approved', approved, 'success') +
      this.statCard('Active Alerts', alerts.length, alerts.length > 0 ? 'danger' : 'success');

    const alertsEl = document.getElementById('customer-alerts');
    if (alerts.length === 0) {
      alertsEl.innerHTML = '<div class="empty-state">No fraud alerts. You are all clear.</div>';
    } else {
      alertsEl.innerHTML = alerts.map((a) => `
        <div class="alert-item ${a.title.includes('blocked') ? 'blocked' : 'flagged'}">
          <span class="alert-dot"></span>
          <div class="alert-body">
            <div class="alert-title">${a.title}</div>
            <div class="alert-meta">${a.message} · ${this.formatDate(a.date)}</div>
            <div class="alert-reasons">${(a.reasons || []).map((r) => `<span class="chip">${this.escapeHtml(r.message)}</span>`).join('')}</div>
          </div>
        </div>`).join('');
    }

    document.getElementById('customer-table-body').innerHTML = txs
      .map((t) => this.customerRow(t))
      .join('') || this.emptyRow(8);
  },

  customerRow(t) {
    let action = '<span class="muted">—</span>';
    if (t.status === 'FLAGGED' && !t.reported) {
      action = `<button class="btn btn-sm btn-danger" data-report="${t.id}">Report</button>`;
    } else if (t.reported) {
      action = '<span class="badge reported">Reported</span>';
    }

    return `
      <tr>
        <td class="date">${this.formatDate(t.date)}</td>
        <td>${this.escapeHtml(t.description)}</td>
        <td>${this.escapeHtml(t.category)}</td>
        <td>${this.escapeHtml(t.location)}</td>
        <td class="num">${Transactions.formatAmount(t.amount)}</td>
        <td>${this.riskBadge(t.risk)}</td>
        <td>${this.statusBadge(t.status)}</td>
        <td>${action}</td>
      </tr>`;
  },

  renderAnalyst() {
    const txs = Transactions.all().filter((t) => this.currentFilter === 'ALL' || t.status === this.currentFilter);
    const all = Transactions.all();
    const total = all.reduce((sum, t) => sum + t.amount, 0);
    const flagged = all.filter((t) => t.status === 'FLAGGED').length;
    const blocked = all.filter((t) => t.status === 'BLOCKED').length;

    document.getElementById('analyst-stats').innerHTML = this.statCard('Total Transactions', all.length, '') +
      this.statCard('Total Amount', Transactions.formatAmount(total), '') +
      this.statCard('Flagged', flagged, flagged > 0 ? 'warn' : 'success') +
      this.statCard('Blocked', blocked, blocked > 0 ? 'danger' : 'success');

    document.getElementById('analyst-table-body').innerHTML = txs
      .map((t) => this.analystRow(t))
      .join('') || this.emptyRow(9);

    document.getElementById('rules-list').innerHTML = FraudEngine.rules
      .map((r) => `<div class="rule-item"><div class="rule-name">${this.escapeHtml(r.name)}</div><div class="rule-desc">${this.escapeHtml(r.description)}</div></div>`)
      .join('');
  },

  analystRow(t) {
    const reasons = (t.reasons || []).map((r) => `<span class="chip">${this.escapeHtml(r.message)}</span>`).join('');
    const report = t.reported ? '<span class="badge reported">Reported</span>' : '<span class="muted">—</span>';

    return `
      <tr>
        <td class="date">${this.formatDate(t.date)}</td>
        <td>${this.escapeHtml(t.owner)}</td>
        <td>${this.escapeHtml(t.description)}</td>
        <td>${this.escapeHtml(t.category)}</td>
        <td class="num">${Transactions.formatAmount(t.amount)}</td>
        <td>${this.riskBadge(t.risk)}</td>
        <td>${this.statusBadge(t.status)}</td>
        <td><div class="reasons">${reasons}</div></td>
        <td>${report}</td>
      </tr>`;
  },

  setFilter(filter) {
    this.currentFilter = filter;
    document.querySelectorAll('#analyst-filters .btn-filter').forEach((b) => {
      b.classList.toggle('active', b.dataset.filter === filter);
    });
    this.renderAnalyst();
  },

  openModal() {
    const modal = document.getElementById('transaction-modal');
    modal.classList.remove('hidden');
    this.resetFormErrors();
    document.getElementById('tx-description').focus();
  },

  closeModal() {
    document.getElementById('transaction-modal').classList.add('hidden');
    this.resetFormErrors();
    document.getElementById('transaction-form').reset();
  },

  handleCreateTransaction(e) {
    e.preventDefault();

    const description = document.getElementById('tx-description').value;
    const amount = Number(document.getElementById('tx-amount').value);
    const category = document.getElementById('tx-category').value;
    const location = document.getElementById('tx-location').value;

    let valid = true;
    valid = this.validateField('tx-description', 'error-description', description.trim().length > 0) && valid;
    valid = this.validateField('tx-amount', 'error-amount', Number.isFinite(amount) && amount > 0) && valid;
    if (!valid) return;

    const session = Auth.current();
    const tx = Transactions.create({ description, category, amount, location }, session.username);

    this.closeModal();
    this.renderCustomer();

    const blocked = tx.status === 'BLOCKED';
    const flagged = tx.status === 'FLAGGED';
    const title = blocked ? 'Transaction blocked' : flagged ? 'Transaction flagged' : 'Transaction approved';
    const reasonText = tx.reasons.length > 0
      ? tx.reasons.map((r) => r.message).join(' · ')
      : 'No fraud rules triggered.';

    this.showToast(title, `${Transactions.formatAmount(tx.amount)} — ${reasonText}`, blocked ? 'danger' : flagged ? 'warn' : 'success');
  },

  handleReport(txId) {
    Transactions.report(txId);
    this.renderCustomer();
    this.showToast('Report submitted', 'An analyst will review this flagged transaction.', 'warn');
  },

  validateField(inputId, errorId, condition) {
    const ok = condition;
    document.getElementById(errorId).classList.toggle('show', !ok);
    document.getElementById(inputId).style.borderColor = ok ? '' : '#dc2626';
    return ok;
  },

  resetFormErrors() {
    document.querySelectorAll('.field-error').forEach((el) => el.classList.remove('show'));
    document.querySelectorAll('input, select').forEach((el) => {
      el.style.borderColor = '';
    });
  },

  flashError(errorId, message) {
    this.resetFormErrors();
    const el = document.getElementById(errorId);
    el.textContent = message;
    el.classList.add('show');
  },

  statCard(label, value, tone) {
    return `
      <div class="stat-card">
        <div class="stat-label">${label}</div>
        <div class="stat-value ${tone}">${value}</div>
      </div>`;
  },

  riskBadge(risk) {
    const cls = risk.toLowerCase();
    return `<span class="badge ${cls}">${risk}</span>`;
  },

  statusBadge(status) {
    const cls = status.toLowerCase();
    return `<span class="badge ${cls}">${status}</span>`;
  },

  formatDate(ts) {
    const d = new Date(ts);
    const date = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const time = d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    return `${date}, ${time}`;
  },

  escapeHtml(value) {
    const div = document.createElement('div');
    div.textContent = value == null ? '' : String(value);
    return div.innerHTML;
  },

  emptyRow(colspan) {
    return `<tr><td colspan="${colspan}" class="empty-state">No transactions found.</td></tr>`;
  },

  showToast(title, body, type) {
    const el = document.getElementById('toast');
    el.className = `toast ${type || ''}`;
    el.innerHTML = `<div class="toast-title"></div><div class="toast-body"></div>`;
    el.querySelector('.toast-title').textContent = title;
    el.querySelector('.toast-body').textContent = body;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      el.className = 'toast hidden';
    }, 6000);
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
