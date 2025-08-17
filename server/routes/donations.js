const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const auth = require('../middleware/auth');

// Get all donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find({ status: 'available' })
      .populate('donor', 'name email')
      .sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a donation
router.post('/', auth, async (req, res) => {
  // Validate required fields
  const requiredFields = ['foodType', 'quantity', 'expiryDate', 'location'];
  const missingFields = requiredFields.filter(field => !req.body[field]);
  
  if (missingFields.length > 0) {
    return res.status(400).json({ 
      message: `Missing required fields: ${missingFields.join(', ')}` 
    });
  }

  // Validate quantity
  if (req.body.quantity <= 0) {
    return res.status(400).json({ 
      message: 'Quantity must be greater than 0' 
    });
  }

  // Validate expiry date
  const expiryDate = new Date(req.body.expiryDate);
  if (expiryDate <= new Date()) {
    return res.status(400).json({ 
      message: 'Expiry date must be in the future' 
    });
  }

  const donation = new Donation({
    donor: req.user.userId,
    foodType: req.body.foodType,
    quantity: req.body.quantity,
    expiryDate: req.body.expiryDate,
    location: req.body.location,
    description: req.body.description
  });

  try {
    const newDonation = await donation.save();
    res.status(201).json(newDonation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update donation status
router.patch('/:id', auth, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.donor.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (req.body.status) {
      donation.status = req.body.status;
    }
    if (req.body.description) {
      donation.description = req.body.description;
    }

    const updatedDonation = await donation.save();
    res.json(updatedDonation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a donation
router.delete('/:id', auth, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.donor.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Donation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Donation deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 