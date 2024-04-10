import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';
import User from './models/User.js';
import Pet from './models/Pet.js';

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors()); 

mongoose.connect('mongodb://localhost:27017/petshare', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

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

app.post('/login', async (req, res) => {
  console.log("trying to login");
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      console.log("success");
      res.status(200).send('Login successful');

    } else {
      res.status(400).send('Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in');
  }
});

app.post('/adopt', async (req, res) => {
  try {
    const { username, petName = '', petType = 'Bunny' } = req.body;
    console.log(req.body); 

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const newPet = new Pet({
      name: petName,
      type: petType, 
     
    });

    const savedPet = await newPet.save();

    user.pets.push(savedPet._id); 
    await user.save();

    res.status(200).send('Pet adopted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adopting the pet');
  }
});

app.get('/user-pets', async (req, res) => {
  const { username } = req.query; 

  try {
      const user = await User.findOne({ username }).populate('pets').exec();
      if (!user) {
          return res.status(404).send('User not found');
      }

      res.json(user.pets); 
  } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching user pets');
  }
});

app.patch('/rename-pet', async (req, res) => {
  try {
      const { petId, newName } = req.body;

      const pet = await Pet.findById(petId);
      if (!pet) {
          return res.status(404).send('Pet not found');
      }

      pet.name = newName;
      await pet.save();

      res.status(200).send('Pet renamed successfully');
  } catch (error) {
      console.error(error);
      res.status(500).send('Error renaming the pet');
  }
});

app.post('/share-pet', async (req, res) => {
  try {
      const { ownerUsername, recipientUsername, petId } = req.body;

      const ownerUser = await User.findOne({ username: ownerUsername }).populate('pets');
      if (!ownerUser) {
          return res.status(404).send('Owner user not found');
      }

      const pet = ownerUser.pets.find(pet => pet._id.toString() === petId);
      if (!pet) {
          return res.status(404).send('Pet not found in owner\'s inventory');
      }

      const recipientUser = await User.findOne({ username: recipientUsername });
      if (!recipientUser) {
          return res.status(404).send('Recipient user not found');
      }

      recipientUser.pets.push(petId);
      await recipientUser.save();

      res.status(200).send('Pet shared successfully');
  } catch (error) {
      console.error(error);
      res.status(500).send('Error sharing the pet');
  }
});
app.listen(PORT, 'localhost', () => console.log(`Server running on port ${PORT}`));
