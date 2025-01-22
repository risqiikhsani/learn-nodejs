const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data to simulate a "database"
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
];

// Home route (GET)
app.get('/', (req, res) => {
  res.send('Welcome to the Express REST API!');
});

// Get all users (GET)
app.get('/users', (req, res) => {
  res.json(users);
});

// Get a single user by ID (GET)
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

// Create a new user (POST)
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update an existing user (PUT)
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  res.json(user);
});

// Delete a user (DELETE)
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send('User not found');

  users.splice(userIndex, 1);
  res.status(204).send(); // No content
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
