require("dotenv").config();
const express = require('express');
const app = express();

app.use(express.json());

// ตัวแปรเก็บข้อมูล
let books = [ 
    {
        id : 1,
        title : 'Book 1',
        author : 'Author 1'
    },
    {
        id : 2,
        title : 'Book 2',
        author : 'Author 2'
    },
        {
        id : 3,
        title : 'Book 3',
        author : 'Author 3'
    }
];
//route หรือ URL สำหรับเรียก API /siriBooks
app.get('/siriBooks', (req, res) => {
  res.json(books); // สมมติว่า books ยังเป็นตัวแปรที่เก็บข้อมูลอยู่
});
