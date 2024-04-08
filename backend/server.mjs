import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cors from 'cors'; // Import cors package
import User from './models/User.js';

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors()); // Use CORS middleware

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/petshare', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Registration route
app.post('/register', async (req, res) => {
  console.log("POSTED");
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      username,
      password: hashedPassword,
    });
    
    await newUser.save();
    console.log("success");
    res.status(201).send('User created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating the user');
  }
});

// Login route
app.post('/login', async (req, res) => {
  console.log("trying to login");
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      // Authentication successful
      console.log("success");
      res.status(200).send('Login successful');

    } else {
      // Authentication failed
      res.status(400).send('Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in');
  }
});

// Start server
app.listen(PORT, 'localhost', () => console.log(`Server running on port ${PORT}`));
