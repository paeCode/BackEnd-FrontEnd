// โหลดค่าตัวแปรสิ่งแวดล้อมจากไฟล์ .env
require('dotenv').config();
// เรียกใช้งาน Express framework
const express = require('express');
// สร้างแอป Express ใหม่
const app = express();
// กำหนดพอร์ตจาก .env หรือใช้ 3000 ถ้าไม่มี
const port = process.env.PORT || 3000;

app.use(express.json()); // เปิดรับ JSON body

// เรียกใช้ route จากไฟล์ booksRoute.js
require('./booksRoute')(app);


app.get('/', (req, res) =>{
    res.send('Hello World from Express!!!');
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});