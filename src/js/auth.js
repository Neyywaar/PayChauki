const storage = (() => {
  const memory = {};
  const enabled = (() => {
    try {
      localStorage.setItem('__paychauki_test__', '1');
      localStorage.removeItem('__paychauki_test__');
      return true;
    } catch (e) {
      return false;
    }
  })();

  return {
    get(key) {
      const mem = memory[key] != null ? memory[key] : null;
      if (enabled) {
        try {
          return localStorage.getItem(key) != null ? localStorage.getItem(key) : mem;
        } catch (e) {
          return mem;
        }
      }
      return mem;
    },
    set(key, value) {
      memory[key] = String(value);
      if (enabled) {
        try {
          localStorage.setItem(key, String(value));
        } catch (e) { /* keep in-memory copy */ }
      }
    },
    remove(key) {
      delete memory[key];
      if (enabled) {
        try {
          localStorage.removeItem(key);
        } catch (e) { /* ignore */ }
      }
    }
  };
})();

const Auth = {
  sessionKey: 'paychauki_session',
  usersKey: 'paychauki_users',

  initUsers() {
    if (!storage.get(this.usersKey)) {
      const users = [
        { username: 'sandesh', password: this.hashPassword('admin'), role: 'analyst', createdAt: Date.now() }
      ];
      this.setUsers(users);
    }
  },

  getUsers() {
    try {
      return JSON.parse(storage.get(this.usersKey)) || [];
    } catch (e) {
      return [];
    }
  },

  setUsers(users) {
    storage.set(this.usersKey, JSON.stringify(users));
  },

  hashPassword(password) {
    let hash = 5381;
    const salted = `paychauki::${password}`;
    for (let i = 0; i < salted.length; i++) {
      hash = ((hash << 5) + hash + salted.charCodeAt(i)) | 0;
    }
    return (hash >>> 0).toString(16);
  },

  findByUsername(username) {
    const name = String(username).trim().toLowerCase();
    return this.getUsers().find((u) => u.username.toLowerCase() === name);
  },

  register(username, password) {
    const name = String(username).trim();
    if (name.length < 3) return { error: 'Username must be at least 3 characters.' };
    if (String(password).length < 4) return { error: 'Password must be at least 4 characters.' };
    if (this.findByUsername(name)) return { error: 'That username is already taken.' };

    const user = { username: name, password: this.hashPassword(password), role: 'customer', createdAt: Date.now() };
    const users = this.getUsers();
    users.push(user);
    this.setUsers(users);
    this.setSession({ username: name, role: user.role });
    return { user };
  },

  login(username, password) {
    const user = this.findByUsername(username);
    if (!user || user.password !== this.hashPassword(password)) {
      return { error: 'Invalid username or password.' };
    }
    this.setSession({ username: user.username, role: user.role });
    return { user };
  },

  setSession(session) {
    storage.set(this.sessionKey, JSON.stringify(session));
  },

  logout() {
    storage.remove(this.sessionKey);
  },

  current() {
    try {
      return JSON.parse(storage.get(this.sessionKey));
    } catch (e) {
      return null;
    }
  }
};