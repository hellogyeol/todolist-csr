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

app.get('/todolist', (req, res) => {
  async function getTodoList() {
    await client.connect();
    const col = client.db('csrDb').collection('csrCol');
    const todoList = await col.find({}).toArray();
    console.log(todoList);

    res.send(todoList);
  }
  getTodoList();
});

app.post('/todolist', (req, res) => {
  async function postTodoList() {
    await client.connect();
    const col = client.db('csrDb').collection('csrCol');
    const content = req.body.content;
    await col.insertOne({
      content: content
    });
    const todoList = await col.find({}).toArray();
    console.log(todoList);
  }
  postTodoList();

  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});