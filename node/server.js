const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = 'mongodb://localhost:27017';
const DB_NAME = 'userdb';

app.use(express.json());
app.use(cors());

let db, usersCollection;

MongoClient.connect(MONGO_URI, { useUnifiedTopology: true })
  .then(client => {
    db = client.db(DB_NAME);
    usersCollection = db.collection('users');
    console.log('✅ Connected to MongoDB');
    
    // Start server only after DB is connected
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection failed', err));


// GET /users - List all users
app.get('/users', async (req, res) => {
  const users = await usersCollection.find().toArray();
  res.json(users);
});

// GET /users/:id - Get user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await usersCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch {
    res.status(400).json({ error: 'Invalid ID format' });
  }
});

// POST /users - Add a new user
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

  const result = await usersCollection.insertOne({ name, email });
  res.status(201).json({ _id: result.insertedId, name, email });
});

// PUT /users/:id - Update a user
app.put('/users/:id', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

  try {
    const result = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: { name, email } },
      { returnDocument: 'after' }
    );

    if (!result.value) return res.status(404).json({ error: 'User not found' });
    res.json(result.value);
  } catch {
    res.status(400).json({ error: 'Invalid ID format' });
  }
});

// DELETE /users/:id - Delete a user
app.delete('/users/:id', async (req, res) => {
  try {
    const result = await usersCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'User not found' });
    res.status(204).send();
  } catch {
    res.status(400).json({ error: 'Invalid ID format' });
  }
});
