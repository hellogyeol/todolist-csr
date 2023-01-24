require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const { MongoClient } = require("mongodb");
const url = process.env.DB_URL;
const client = new MongoClient(url);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});


app.get('/test', (req, res) => {
  console.log(req.body)
  res.send('get msg');
});
app.post('/test', (req, res) => {
  console.log(req.body.wow)
  res.send('post msg');
});


// app.get('/todolist', (req, res) => {
//   getTodoList();
//   async function getTodoList() {
//     await client.connect();
//     const col = client.db('csrDb').collection('csrCol');

//     const todoList = await col.find({}).toArray();
//     console.log(todoList);
//     console.log(req.body)

//     res.send(todoList);
//   }
// });

// app.post('/todolist', (req, res) => {
//   postTodoList();
//   async function postTodoList() {
//     await client.connect();
//     const col = client.db('csrDb').collection('csrCol');

//     await col.insertOne({
//       id: String(Date.now()),
//       content: req.body.content,
//       done: false
//     })

//     const todoList = await col.find({}).toArray();
//     console.log(todoList);

//     res.send(todoList);
//   }
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});