require('dotenv').config();
const path = require('path');
const fs = require('fs');
const { readUsersFromExcel } = require('./utils/excelReader');
const { sendPasswordEmail } = require('./utils/emailService');

async function importUsers() {
  try {
    // Define the path to user.xlsx
    const excelPath = path.join(__dirname, '..', 'data', 'user.xlsx');
    
    // Check if file exists
    if (!fs.existsSync(excelPath)) {
      // For demo purposes, use provided path from attachment context
      const demoPath = path.join(__dirname, '..', 'user.xlsx');
      if (fs.existsSync(demoPath)) {
        console.log(`📁 Using Excel file from: ${demoPath}`);
      } else {
        throw new Error(`Excel file not found at ${excelPath} or ${demoPath}`);
      }
    }

    console.log('\n🚀 Starting user import process...\n');

    // Read users from Excel
    const actualPath = fs.existsSync(excelPath) ? excelPath : path.join(__dirname, '..', 'user.xlsx');
    const users = readUsersFromExcel(actualPath);

    // Store user results
    const results = {
      successful: [],
      failed: [],
      totalProcessed: 0
    };

    // Process each user
    console.log('\n📧 Sending emails with passwords...\n');
    for (const user of users) {
      results.totalProcessed++;
      console.log(`Processing: ${user.username} (${user.email})`);
      
      const emailResult = await sendPasswordEmail(user);
      
      if (emailResult.success) {
        results.successful.push({
          username: user.username,
          email: user.email,
          password: user.password,
          messageId: emailResult.messageId
        });
      } else {
        results.failed.push({
          username: user.username,
          email: user.email,
          password: user.password,
          error: emailResult.error
        });
      }

      // Small delay between emails
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📋 IMPORT SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Processed: ${results.totalProcessed}`);
    console.log(`✅ Successful: ${results.successful.length}`);
    console.log(`❌ Failed: ${results.failed.length}`);
    console.log('='.repeat(60) + '\n');

    // Save results to JSON
    const resultsFile = path.join(__dirname, '..', 'import-results.json');
    fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
    console.log(`📁 Results saved to: ${resultsFile}\n`);

    if (results.failed.length > 0) {
      console.log('❌ Failed users:');
      results.failed.forEach(failed => {
        console.log(`  - ${failed.username}: ${failed.error}`);
      });
    }

    return results;

  } catch (error) {
    console.error('❌ Fatal Error:', error.message);
    process.exit(1);
  }
}

// Run the import
importUsers().then(() => {
  console.log('✨ Import process completed!');
  process.exit(0);
}).catch(error => {
  console.error('Process failed:', error);
  process.exit(1);
});
