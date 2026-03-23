const XLSX = require('xlsx');
const path = require('path');
const User = require('../models/User');

const readUsersFromExcel = (filePath) => {
  try {
    // Read the Excel file
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    
    // Convert worksheet to JSON
    const data = XLSX.utils.sheet_to_json(worksheet);
    
    // Transform to User objects
    const users = data.map(row => {
      return new User(
        row.username || row.user,
        row.email,
        null, // password will be generated
        'user'
      );
    });

    console.log(`📊 Successfully read ${users.length} users from Excel file`);
    return users;
  } catch (error) {
    console.error('❌ Error reading Excel file:', error.message);
    throw error;
  }
};

module.exports = { readUsersFromExcel };
