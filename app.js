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

// List 전체 조회
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

// List 전체 삭제
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

// 단일 To-Do 추가
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

// 단일 To-Do 삭제
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});