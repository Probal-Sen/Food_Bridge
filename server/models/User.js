const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profileImage: {
    type: String,
    default: null
  },
  role: {
    type: String,
    required: true,
    enum: ['restaurant', 'ngo']
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  // Verification fields
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  verificationDocument: {
    type: String,  // URL/path to the uploaded document
    default: null
  },
  verificationNumber: {
    type: String,  // FSSAI number for restaurants, Registration number for NGOs
    default: null
  },
  verificationExpiry: {
    type: Date,
    default: null
  },
  verificationRejectionReason: {
    type: String,
    default: null
  },
  // Restaurant specific fields
  restaurantType: {
    type: String,
    required: function() {
      return this.role === 'restaurant';
    }
  },
  operatingHours: {
    type: String,
    required: function() {
      return this.role === 'restaurant';
    }
  },
  // NGO specific fields
  ngoType: {
    type: String,
    required: function() {
      return this.role === 'ngo';
    }
  },
  serviceArea: {
    type: String,
    required: function() {
      return this.role === 'ngo';
    }
  },
  beneficiariesServed: {
    type: Number,
    required: function() {
      return this.role === 'ngo';
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User; 