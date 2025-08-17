import axios from 'axios';

export const API_URL = 'https://food-bridge-2-3i1m.onrender.com/api';

// Move the mockDonations array to the top of the file
const mockDonations = [
  {
    id: 1,
    restaurant: 1,
    restaurantName: "Sana Biryani",
    foodItems: "Chicken Biryani (10 portions), Egg Biryani (5 portions)",
    foodType: "Non-Vegetarian Cooked Meals",
    quantity: "15",
    quantityUnit: "meals",
    estimatedMeals: "15",
    status: "Available",
    pickupDate: "2024-01-20",
    pickupStartTime: "15:00",
    pickupEndTime: "17:00",
    ngoAssigned: null,
    dietaryInfo: "Non-vegetarian",
    allergenInfo: "Contains eggs, dairy",
    additionalInfo: "Refrigeration required"
  },
  {
    id: 2,
    restaurant: 1,
    restaurantName: "Sana Biryani",
    foodItems: "Mixed Vegetable Curry (8 portions), Dal (10 portions)",
    foodType: "Vegetarian Cooked Meals",
    quantity: "18",
    quantityUnit: "meals",
    estimatedMeals: "18",
    status: "Scheduled",
    pickupDate: "2024-01-20",
    pickupStartTime: "16:00",
    pickupEndTime: "18:00",
    ngoAssigned: "Food For All",
    dietaryInfo: "Vegetarian",
    allergenInfo: "Contains dairy",
    additionalInfo: "Includes rice and bread"
  }
];

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw error;
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw error;
    }
  }
);

// Auth services
export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Dispatch custom event for login
      window.dispatchEvent(new CustomEvent('userLogin', { detail: { user } }));
      
      return { token, user };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      console.log('Registering user with data:', userData);
      const response = await api.post('/auth/register', userData);
      console.log('Registration response:', response.data);
      
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Dispatch custom event for login
      window.dispatchEvent(new CustomEvent('userLogin', { detail: { user } }));
      
      return { token, user };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

// Donation services
export const donationService = {
  getAllDonations: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockDonations);
      }, 1000);
    });
  },

  getDonationById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const donation = mockDonations.find(d => d.id === parseInt(id));
        if (donation) {
          resolve(donation);
        } else {
          reject(new Error('Donation not found'));
        }
      }, 1000);
    });
  },

  createDonation: async (donationData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDonation = {
          id: mockDonations.length + 1,
          ...donationData,
          status: 'available'
        };
        mockDonations.push(newDonation);
        resolve(newDonation);
      }, 1000);
    });
  },

  updateDonation: async (id, updateData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockDonations.findIndex(d => d.id === parseInt(id));
        if (index !== -1) {
          mockDonations[index] = { ...mockDonations[index], ...updateData };
          resolve(mockDonations[index]);
        } else {
          reject(new Error('Donation not found'));
        }
      }, 1000);
    });
  }
};

// Profile services
export const profileService = {
  getProfile: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = authService.getCurrentUser();
        resolve(user);
      }, 1000);
    });
  },

  updateProfile: async (profileData) => {
    try {
      const response = await api.patch('/profile', profileData);
      const updatedUser = response.data;
      
      // Update localStorage with the new user data
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Dispatch profile update event
      window.dispatchEvent(new CustomEvent('profileUpdated', { 
        detail: { user: updatedUser }
      }));
      
      return updatedUser;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  }
};

// Contact services
export const contactService = {
  sendContact: async (contactData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Message sent successfully' });
      }, 1000);
    });
  }
};

// Verification services
export const verificationService = {
  submitVerification: async (formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/verification/submit`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Verification submission error:', error);
      throw error;
    }
  },

  getVerificationStatus: async () => {
    try {
      const response = await api.get('/verification/status');
      return response.data;
    } catch (error) {
      console.error('Error fetching verification status:', error);
      throw error;
    }
  }
};

export default api; 