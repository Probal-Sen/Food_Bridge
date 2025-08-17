const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require('mongoose');

// Register route
router.post('/register', async (req, res) => {
  try {
    console.log('Received registration request:', req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Validate required fields
    const requiredFields = ['name', 'email', 'password', 'phone', 'address', 'city', 'zipCode', 'role'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }

    // Validate role-specific fields
    if (req.body.role === 'restaurant') {
      if (!req.body.restaurantType || !req.body.operatingHours) {
        return res.status(400).json({ 
          message: 'Restaurant type and operating hours are required for restaurants' 
        });
      }
    } else if (req.body.role === 'ngo') {
      if (!req.body.ngoType || !req.body.serviceArea || !req.body.beneficiariesServed) {
        return res.status(400).json({ 
          message: 'Organization type, service area, and beneficiaries served are required for NGOs' 
        });
      }
    } else {
      return res.status(400).json({ 
        message: 'Invalid role. Must be either "restaurant" or "ngo"' 
      });
    }

    // Create new user
    const user = new User(req.body);
    console.log('Creating new user:', user);
    
    await user.save();
    console.log('User saved successfully');

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'f8a4c9e0b37f4e6d8c1a9f527b6e3d94a2f58b7e6f913d8c4e5b7f6a8c2d9e1f',
      { expiresIn: '24h' }
    );

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    console.log('Sending registration response');
    res.status(201).json({ token, user: userResponse });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: Object.values(error.errors).map(err => err.message).join(', ')
      });
    }
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', email);

    // Validate required fields
    if (!email || !password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('Database not connected, using mock authentication');
      
      // Mock authentication for testing
      if (email === 'test@example.com' && password === 'password123') {
        const mockUser = {
          _id: 'mock-user-id',
          name: 'Test User',
          email: 'test@example.com',
          role: 'restaurant',
          phone: '123-456-7890',
          address: '123 Test St',
          city: 'Test City',
          zipCode: '12345',
          restaurantType: 'Italian',
          operatingHours: '9 AM - 10 PM'
        };
        
        const token = jwt.sign(
          { userId: mockUser._id },
          process.env.JWT_SECRET || 'f8a4c9e0b37f4e6d8c1a9f527b6e3d94a2f58b7e6f913d8c4e5b7f6a8c2d9e1f',
          { expiresIn: '24h' }
        );
        
        return res.json({ token, user: mockUser });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Invalid password for:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'f8a4c9e0b37f4e6d8c1a9f527b6e3d94a2f58b7e6f913d8c4e5b7f6a8c2d9e1f',
      { expiresIn: '24h' }
    );

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({ token, user: userResponse });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

module.exports = router; 