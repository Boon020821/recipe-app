// server/testAdmin.js
const admin = require('./firebaseAdmin');

// 测试列出前10个用户
admin.auth().listUsers(10)
  .then((userRecords) => {
    console.log('Connect to Firebase successfully:');
    console.log(`Found ${userRecords.users.length} users`);
    userRecords.users.forEach(user => console.log(user.email));
  })
  .catch((error) => {
    console.error('Connection failed:', error);
  });