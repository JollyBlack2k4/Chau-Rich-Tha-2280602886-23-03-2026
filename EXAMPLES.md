/**
 * Usage Examples
 * Các cách sử dụng hệ thống import users
 */

// Example 1: Direct User Creation
const User = require('./models/User');

const user1 = new User('johndoe', 'john@example.com');
console.log('User 1:', user1.toJSON());
// Output: {
//   username: 'johndoe',
//   email: 'john@example.com',
//   password: 'aB3cD5eF7gH9iJ1k',  // 16 character random password
//   role: 'user',
//   createdAt: '2024-03-23T10:30:00.000Z'
// }

// Example 2: Read from Excel and Process
const { readUsersFromExcel } = require('./utils/excelReader');
const { sendPasswordEmail } = require('./utils/emailService');

async function processUsers() {
  try {
    // Read users from Excel
    const users = readUsersFromExcel('./user.xlsx');

    // Send emails to each user
    for (const user of users) {
      const result = await sendPasswordEmail(user);
      
      if (result.success) {
        console.log(`✅ Email sent to ${user.email}`);
        console.log(`   Password: ${user.password}`);
        console.log(`   Message ID: ${result.messageId}`);
      } else {
        console.log(`❌ Failed to send to ${user.email}: ${result.error}`);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 3: Create User with Custom Password
const user2 = new User('admin', 'admin@example.com', 'MyCustomPass123!', 'admin');
console.log('Admin User:', user2.toJSON());

// Example 4: Bulk User Creation
const userList = [
  { username: 'user01', email: 'user01@example.com' },
  { username: 'user02', email: 'user02@example.com' },
  { username: 'user03', email: 'user03@example.com' }
];

const users = userList.map(u => new User(u.username, u.email));
console.log('Created Users:', users.length);

// Example 5: Export User to Database Format
const userDataForDB = users.map(user => ({
  username: user.username,
  email: user.email,
  passwordHash: user.password, // Should be hashed before DB storage
  role: user.role,
  active: true,
  createdAt: user.createdAt,
  emailSent: false
}));

console.log('Data for Database:', JSON.stringify(userDataForDB, null, 2));

/**
 * Chạy examples:
 * 
 * 1. Chỉ tạo user:
 *    node examples/usage.js
 * 
 * 2. Import từ Excel và gửi email:
 *    npm run import
 * 
 * 3. Test model user:
 *    node src/test.js
 */
