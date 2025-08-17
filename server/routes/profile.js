const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Donation = require('../models/Donation');
const auth = require('../middleware/auth');

// Get user profile
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ message: err.message });
  }
});

// Update user profile
router.patch('/', auth, async (req, res) => {
  try {
    console.log('Profile update request received:', req.body);
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update basic fields
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.phone) user.phone = req.body.phone;
    if (req.body.address) user.address = req.body.address;
    if (req.body.city) user.city = req.body.city;
    if (req.body.zipCode) user.zipCode = req.body.zipCode;
    if (req.body.profileImage !== undefined) {
      console.log('Updating profileImage to:', req.body.profileImage);
      user.profileImage = req.body.profileImage;
    }

    // Update role-specific fields
    if (user.role === 'restaurant') {
      if (req.body.restaurantType) user.restaurantType = req.body.restaurantType;
      if (req.body.operatingHours) user.operatingHours = req.body.operatingHours;
    } else if (user.role === 'ngo') {
      if (req.body.ngoType) user.ngoType = req.body.ngoType;
      if (req.body.serviceArea) user.serviceArea = req.body.serviceArea;
      if (req.body.beneficiariesServed) user.beneficiariesServed = req.body.beneficiariesServed;
    }

    const updatedUser = await user.save();
    
    // Return user data without password
    const userResponse = updatedUser.toObject();
    delete userResponse.password;
    
    res.json(userResponse);
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(400).json({ message: err.message });
  }
});

// Get user's donations
router.get('/donations', auth, async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user.userId })
      .sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 