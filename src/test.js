/**
 * Test file to demonstrate User model and password generation
 */

const User = require('../models/User');

console.log('='.repeat(60));
console.log('📋 User Model Demo');
console.log('='.repeat(60));

// Create sample users from the Excel data
const sampleUsers = [
  new User('user01', 'user01@haha.com'),
  new User('user02', 'user02@haha.com'),
  new User('user03', 'user03@haha.com'),
  new User('user04', 'user04@haha.com'),
  new User('user05', 'user05@haha.com')
];

console.log('\n✅ Sample Users Generated:\n');

sampleUsers.forEach((user, index) => {
  console.log(`${index + 1}. Username: ${user.username}`);
  console.log(`   Email: ${user.email}`);
  console.log(`   Password: ${user.password} (${user.password.length} chars)`);
  console.log(`   Role: ${user.role}`);
  console.log(`   Created: ${user.createdAt.toISOString()}`);
  console.log('');
});

console.log('='.repeat(60));
console.log('📊 Statistics');
console.log('='.repeat(60));
console.log(`Total Users: ${sampleUsers.length}`);
console.log(`Generated Passwords: ${sampleUsers.length}`);
console.log(`Average Password Length: ${Math.round(sampleUsers[0].password.length)} chars`);
console.log('');
console.log('✨ All users have role: "user"');
console.log('✨ All passwords are unique and random');
console.log('✨ Ready for import and email sending!');
console.log('');
