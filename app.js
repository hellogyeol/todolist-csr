require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const { MongoClient } = require("mongodb");
const url = process.env.DB_URL;
const client = new MongoClient(url);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// HTML 템플릿
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// 전체 목록 조회
app.get('/list', (req, res) => {
  getList();
  async function getList() {
    await client.connect();
    const col = client.db('csrDb').collection('csrCol');
    const todoList = await col.find({}).toArray();
    console.log('*********************************************************');
    console.log(todoList);
    res.send(todoList);
  }
});

// 전체 목록 삭제
app.delete('/list', (req, res) => {
  clearList();
  async function clearList() {
    await client.connect();
    const col = client.db('csrDb').collection('csrCol');
    await col.deleteMany({})
    const todoList = await col.find({}).toArray();
    res.send(todoList);
  }
});

// To-Do 생성
app.post('/todo', (req, res) => {
  postList();
  async function postList() {
    await client.connect();
    const col = client.db('csrDb').collection('csrCol');
    await col.insertOne({
      id: String(Date.now()),
      content: req.body.content,
      done: false
    })
    const todoList = await col.find({}).toArray();
    res.send(todoList);
  }
});

// To-Do 삭제
app.delete('/todo', (req, res) => {
  deleteTodo();
  async function deleteTodo() {
    await client.connect();
    const col = client.db('csrDb').collection('csrCol');
    await col.deleteOne({id: req.body.id});
    const todoList = await col.find({}).toArray();
    res.send(todoList);
  }
});



app.get('/done', (req, res) => {
  doneTodo();
  async function doneTodo() {
    await client.connect();
    const col = client.db('csrDb').collection('csrCol');
    await col.updateOne({id: req.body.id}, {done: true});
    const todoList = await col.find({}).toArray();
    res.send(todoList);
  }
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});