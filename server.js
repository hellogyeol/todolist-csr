require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const { MongoClient } = require("mongodb");
const url = process.env.DB_URL;
const client = new MongoClient(url);

app.get('/', (req, res) => {
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
  res.sendFile(`${__dirname}/index.html`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});