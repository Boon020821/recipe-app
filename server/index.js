const express = require('express');
const admin = require('./firebaseAdmin');
const app = express();

app.get('/api/recipes', async (req, res) => {
  // 从Firestore获取菜谱数据
});

app.listen(5000, () => console.log('backend run in progress: http://localhost:5000'));