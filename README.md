# FoodBridge

A platform connecting restaurants with NGOs to reduce food waste and feed those in need.

## Description

FoodBridge is a web application that helps restaurants donate their excess food to nearby NGOs and community kitchens. The platform facilitates real-time matching between food providers and distributors, ensuring efficient food redistribution and reducing food waste.

## Features

- Real-time platform connecting restaurants with nearby NGOs
- Location-based matching for efficient food redistribution
- Instant notifications for available donations
- Verified NGO partners to ensure food reaches those in need
- Impact tracking and reporting
- User-friendly interface for both restaurants and NGOs

## Tech Stack

### Frontend
- React.js
- Bootstrap 5
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/foodbridge.git
cd foodbridge
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd server
npm install
```

4. Create a .env file in the server directory with the following variables:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

5. Start the development servers

Frontend:
```bash
npm start
```

Backend:
```bash
cd server
npm run dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

## Contact

For any queries, please reach out to info@foodbridge.org