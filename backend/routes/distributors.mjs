import express from "express";
import db from "../db/conn.mjs";
import bcrypt from "bcrypt";
import mongoose from 'mongoose';

const distributorrouter = express.Router();

// Define the user schema (if using Mongoose)
// If not using Mongoose schemas, you can remove this section or adjust accordingly
// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     distributorName: String,
//     address: String,
//     latitude: Number,
//     longitude: Number,
//     password: String,
//     // Add other fields as needed
// });
// const User = mongoose.model('User', userSchema);

// Get a list of distributors (example endpoint)
distributorrouter.get("/", async (req, res) => {
  try {
    const collection = db.collection("ahara-distributors");
    const results = await collection.find({}).limit(50).toArray();
    console.log(results);
    res.status(200).send(results);
  } catch (error) {
    console.error('Error fetching distributors:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

distributorrouter.post('/register', async (req, res) => {
    const { name, email, distributorName, password, address, latitude, longitude } = req.body;
  
    // Basic validation
    if (!name || !email || !distributorName || !password || !address) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }
  
    // Password validation (e.g., at least 6 characters)
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }
  
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Create a new distributor object
        const newDistributor = {
            name,
            email,
            distributorName,
            address,
            latitude: latitude || null,
            longitude: longitude || null,
            password: hashedPassword,
            // Initialize other fields as needed
            orders: 0,
            creditBalance: 0,
            restaurantPartners: 0,
            monthSaved: 0,
            monthSpent: 0,
            totalProducts: 0
        };
  
        // Save the new distributor to the database
        const collection = db.collection('test-ahara-distributors');
        await collection.insertOne(newDistributor);
  
        res.status(201).json({ message: 'Distributor registered successfully!', distributor: newDistributor });
    } catch (error) {
        console.error('Error during registration:', error);
        // Check if email is already taken (duplicate key error)
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already exists.' });
        }
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
});

export default distributorrouter;
