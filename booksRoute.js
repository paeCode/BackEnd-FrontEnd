require("dotenv").config();
const express = require('express');
const app = express();

app.use(express.json());

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Database/DataBase_siribooks.db');

// เชื่อมกับ SQLite และสร้างตาราง
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Database_books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL
    )
  `);
});


// CRUDBokkNoDB.js
// module.exports = (app) => {
// // ตัวแปรเก็บข้อมูล
// let books = [ 
//     {
//         id : 1,
//         title : 'Book 1',
//         author : 'Author 1'
//     },
//     {
//         id : 2,
//         title : 'Book 2',
//         author : 'Author 2'
//     },
//         {
//         id : 3,
//         title : 'Book 3',
//         author : 'Author 3'
//     }
// ];


// //route หรือ URL สำหรับเรียก API /siriBooks
// app.get('/siribooks', (req, res) => {
//   res.json(books); // สมมติว่า books ยังเป็นตัวแปรที่เก็บข้อมูลอยู่
// });

//   app.post('/siribooks', (req, res) => {
//     const { title, author } = req.body;
//     if (!title || !author) {
//       return res.status(400).json({ error: 'กรุณากรอก title และ author' });
//     }
//     const newBook = {
//       id: books.length + 1,
//       title,
//       author,
//     };
//     books.push(newBook);
//     res.status(201).json(newBook);
//   });


//   // PUT แก้ไขหนังสือตาม id
//   app.put('/siribooks/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const { title, author } = req.body;
//     const bookIndex = books.findIndex(b => b.id === id);
//     if (bookIndex === -1) {
//       return res.status(404).json({ error: 'Book not found' });
//     }
//     if (!title || !author) {
//       return res.status(400).json({ error: 'Title and author are required' });
//     }
//     books[bookIndex] = { id, title, author };
//     res.json(books[bookIndex]);
//   });

//   // DELETE ลบหนังสือตาม id
//   app.delete('/siribooks/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const bookIndex = books.findIndex(b => b.id === id);
//     if (bookIndex === -1) {
//       return res.status(404).json({ error: 'Book not found' });
//     }
//     const deletedBook = books.splice(bookIndex, 1);
//     res.json({ message: 'Book deleted', book: deletedBook[0] });
//   });
// };

// Route ใช้ SQLite แทน array
module.exports = (app) => {
app.get('/siribooks', (req, res) => {
  db.all('SELECT * FROM Database_books', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/siribooks', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) return res.status(400).json({ error: 'กรุณากรอก title และ author' });

  const sql = 'INSERT INTO Database_books (title, author) VALUES (?, ?)';
  db.run(sql, [title, author], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, title, author });
  });
});

// PUT แก้ไขหนังสือตาม id
app.put('/siribooks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }
  
  const sql = `UPDATE Database_books SET title = ?, author = ? WHERE id = ?`;
  db.run(sql, [title, author, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ id, title, author });
  });
});

// DELETE ลบหนังสือตาม id
app.delete('/siribooks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  const sql = `DELETE FROM Database_books WHERE id = ?`;
  db.run(sql, id, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book deleted' });
  });
});
};
