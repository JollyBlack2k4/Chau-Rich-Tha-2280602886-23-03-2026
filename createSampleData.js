/**
 * Create sample user.xlsx file with users for demo
 * Run: node createSampleData.js
 */

const XLSX = require('xlsx');
const path = require('path');

// Create sample data - 30 users for demo (respecting Mailtrap free tier limits)
const data = [['username', 'email']]; // Header row

for (let i = 1; i <= 30; i++) {
  const userNum = String(i).padStart(2, '0');
  data.push([
    `user${userNum}`,
    `user${userNum}@haha.com`
  ]);
}

// Create workbook from array of arrays
const worksheet = XLSX.utils.aoa_to_sheet(data);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

// Save file
const filePath = path.join(__dirname, 'user.xlsx');
XLSX.writeFile(workbook, filePath);

console.log(`✅ Created ${filePath}`);
console.log(`📊 Total users: 30 (demo with Mailtrap free tier limits)`);
console.log(`📋 Columns: username, email`);
console.log(`💾 File size: ${require('fs').statSync(filePath).size} bytes`);
