const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'myProject';

const port = 3001;
const mongourl = "mongodb://localhost:27017";



async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');

  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post('/api/user', (req, res) => {
  const data = req.body;
   const mongo = await client.ad
  console.log(data);
  res.json({ message: 'Data received', data });
});

//CRUD - Creat, Read, Update , Delete

app.get('./api/user', async (req, res) => { });
app.post('./app/user', async(req, res) => {}) ;
app.put('./app/user', async(req, res) => {}) 
app.delete('./app/user', async (req, res) => {}) 


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
