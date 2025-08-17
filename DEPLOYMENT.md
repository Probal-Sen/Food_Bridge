# FoodBridge Deployment Information

## Live URLs

### Frontend (Vercel)
- **URL**: https://food-bridge-new.vercel.app/
- **Platform**: Vercel
- **Framework**: React.js

### Backend (Render)
- **URL**: https://food-bridge-2-3i1m.onrender.com
- **Platform**: Render
- **Framework**: Node.js/Express.js

## Environment Configuration

### Frontend Environment Variables
The frontend automatically switches between development and production API URLs:
- **Development**: `http://localhost:5000/api`
- **Production**: `https://food-bridge-2-3i1m.onrender.com/api`

### Backend Environment Variables
Set these environment variables in your Render deployment:

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=f8a4c9e0b37f4e6d8c1a9f527b6e3d94a2f58b7e6f913d8c4e5b7f6a8c2d9e1f
FRONTEND_URL=https://food-bridge-new.vercel.app
```

## CORS Configuration
The backend is configured to allow requests from:
- https://food-bridge-new.vercel.app (production frontend)
- http://localhost:3000 (development frontend)

## API Endpoints
All API endpoints are available at: `https://food-bridge-2-3i1m.onrender.com/api`

### Available Endpoints:
- `/api/auth` - Authentication (login, register)
- `/api/donations` - Donation management
- `/api/contact` - Contact form submissions
- `/api/profile` - User profile management
- `/api/verification` - Document verification

## Deployment Notes

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `build`
4. Environment variables are automatically handled by the code

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set build command: `cd server && npm install`
3. Set start command: `cd server && npm start`
4. Configure environment variables in Render dashboard

## Testing
- **Backend Tests**: Run `cd server && npm test` to execute the test suite
- **Frontend**: Use the production URLs for testing the live application

## Security Notes
- JWT secret is configured for production
- CORS is properly configured for the production domains
- Environment variables are properly secured
- `.env` files are excluded from Git commits
