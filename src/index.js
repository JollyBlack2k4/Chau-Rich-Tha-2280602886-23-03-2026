/**
 * NNPTUD-C2: User Import System
 * Main entry point
 */

const User = require('./models/User');
const { readUsersFromExcel } = require('./utils/excelReader');
const { sendPasswordEmail } = require('./utils/emailService');

console.log('🚀 NNPTUD-C2 - User Import System');
console.log('==================================');
console.log('');
console.log('To start importing users, run:');
console.log('  npm run import');
console.log('');
console.log('For development with auto-reload:');
console.log('  npm run dev');
console.log('');
console.log('==================================');

module.exports = {
  User,
  readUsersFromExcel,
  sendPasswordEmail
};
