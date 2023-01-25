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

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get('/list', (req, res) => {
  getList();
  async function getList() {
    await client.connect();
    const col = client.db('csrDb').collection('csrCol');
    // await col.deleteMany({})
    const todoList = await col.find({}).toArray();
    console.log(todoList);
    res.send(todoList);
  }
});

app.post('/list', (req, res) => {
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
    console.log(todoList);
    res.send(todoList);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});