const mockDonations = [
  {
    id: 1,
    restaurantName: 'Sana Biryani',
    foodItems: 'Chicken Biryani (10 portions), Egg Biryani (5 portions)',
    foodType: 'Non-Vegetarian Cooked Meals',
    quantity: '15 meals',
    distance: 2.8,
    expiryTime: 5, // hours
    pickupWindow: '15:00 – 17:00',
    address: 'G.T. Road, Parcus Road, Burdwan',
    postedTime: '1 hours ago',
    specialInstructions: 'Refrigeration required',
    isNew: true
  },
  {
    id: 2,
    restaurantName: 'Tandoor House',
    foodItems: 'Chicken Kasturi Kebab (20 skewers), Paneer Tikka (10 pieces)',
    foodType: 'Grilled / Tandoori',
    quantity: '30 servings',
    distance: 1.5,
    expiryTime: 4,
    pickupWindow: '17:30 – 19:30',
    address: '1 No. Chand Mari Road Bye Lane, Badamtala, Burdwan',
    postedTime: '3 hours ago',
    specialInstructions: 'Contains dairy, keep chilled',
    isNew: true
  },
  {
    id: 3,
    restaurantName: 'Just In Time Restaurant',
    foodItems: 'Chicken Pakoda (25 pieces), Veg Momos (20 pcs)',
    foodType: 'Fried / Steamed',
    quantity: '45 snacks',
    distance: 4,
    expiryTime: 6,
    pickupWindow: '16:00 – 18:00',
    address: 'Rly Loco Colony, Burdwan',
    postedTime: '45 minutes ago',
    specialInstructions: '',
    isNew: false
  },
  {
    id: 4,
    restaurantName: 'Royal Biriyani',
    foodItems: 'Mutton Biryani (8 portions), Tandoori Chicken (6 pieces)',
    foodType: 'Non-Vegetarian Cooked Meals',
    quantity: '14 meals',
    distance: 2.2,
    expiryTime: 5,
    pickupWindow: '18:00 – 20:00',
    address: 'Jail Khana More, Ramkrishna Road, Burdwan',
    postedTime: '3 hour ago',
    specialInstructions: 'Allergen: nuts (in marinade)',
    isNew: true
  },
  {
    id: 5,
    restaurantName: 'China 88 Restaurant',
    foodItems: 'Veg Thukpa (12 bowls), Chilli Garlic Potato (10 portions)',
    foodType: 'Vegetarian Cooked Meals',
    quantity: '22 servings',
    distance: 4.1,
    expiryTime: 4,
    pickupWindow: '14:30 – 16:30',
    address: '508 B.C. Rd, beside Kalibazar Police Station, Burdwan',
    postedTime: '2 hours ago',
    specialInstructions: '',
    isNew: false
  },
  {
    id: 6,
    restaurantName: 'Anadi Cabin & Bakery',
    foodItems: 'Cream Rolls (20 pcs), Fruit Pastries (10 pcs), Bread Loaves (8 pcs)',
    foodType: 'Bakery Items',
    quantity: '38 items',
    distance: 1.9,
    expiryTime: 8,
    pickupWindow: '15:30 – 17:30',
    address: 'Khosbagan, Near Curzon Gate, Burdwan',
    postedTime: '1.5 hours ago',
    specialInstructions: 'Contains dairy and gluten; store in a cool, dry place',
    isNew: false
  }
];

export default mockDonations; 