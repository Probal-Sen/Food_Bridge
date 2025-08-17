const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');
const User = require('../models/User');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/verification';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only PDF and image files
  if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF and image files are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Submit verification documents
router.post('/submit', auth, upload.single('verificationDocument'), async (req, res, next) => {
  try {
    const { verificationNumber, verificationExpiry } = req.body;
    
    if (!req.file || !verificationNumber || !verificationExpiry) {
      return res.status(400).json({ 
        message: 'Please provide all required verification details' 
      });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user verification details
    user.verificationDocument = req.file.path;
    user.verificationNumber = verificationNumber;
    user.verificationExpiry = new Date(verificationExpiry);
    user.verificationStatus = 'pending';
    
    await user.save();

    res.json({ 
      message: 'Verification documents submitted successfully',
      verificationStatus: user.verificationStatus
    });
  } catch (error) {
    console.error('Error submitting verification:', error);
    res.status(500).json({ message: 'Error submitting verification documents' });
  }
});

// Error handling for multer
router.use((error, req, res, next) => {
  if (error.message && error.message.includes('Invalid file type')) {
    return res.status(400).json({ message: error.message });
  }
  next(error);
});

// Get verification status
router.get('/status', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      verificationStatus: user.verificationStatus,
      verificationDocument: user.verificationDocument,
      verificationNumber: user.verificationNumber,
      verificationExpiry: user.verificationExpiry,
      verificationRejectionReason: user.verificationRejectionReason
    });
  } catch (error) {
    console.error('Error fetching verification status:', error);
    res.status(500).json({ message: 'Error fetching verification status' });
  }
});

// Admin route to update verification status
router.patch('/update-status/:userId', auth, async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;
    
    // TODO: Add admin role check here
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.verificationStatus = status;
    user.isVerified = status === 'verified';
    if (status === 'rejected') {
      user.verificationRejectionReason = rejectionReason;
    }

    await user.save();

    res.json({ 
      message: 'Verification status updated successfully',
      verificationStatus: user.verificationStatus
    });
  } catch (error) {
    console.error('Error updating verification status:', error);
    res.status(500).json({ message: 'Error updating verification status' });
  }
});

module.exports = router; 