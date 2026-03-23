const crypto = require('crypto');

class User {
  constructor(username, email, password = null, role = 'user') {
    this.username = username;
    this.email = email;
    this.password = password || this.generatePassword();
    this.role = role;
    this.createdAt = new Date();
  }

  generatePassword() {
    const length = 16;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  toJSON() {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
      createdAt: this.createdAt
    };
  }
}

module.exports = User;
