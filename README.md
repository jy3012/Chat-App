<<<<<<< HEAD
# Real-Time Chat Application

A modern real-time chat application built with React.js, Node.js, Socket.IO, and MongoDB.

## Features

- Real-time messaging
- User authentication (Register/Login)
- Custom avatar selection
- Online/Offline status
- Responsive design
- Message history
- User profile management

## Tech Stack
=======
# 💬 Real-Time Chat Application

A modern, full-stack **real-time chat application** built with **React.js**, **Node.js**, **Socket.IO**, and **MongoDB**, supporting instant messaging, custom avatars, user presence, and full authentication.

![Chat App Preview](https://user-images.githubusercontent.com/your-gif-or-screenshot.gif) <!-- optional: replace or remove -->

---

## ✨ Features

- 🔒 User authentication (Register/Login)
- 💬 Real-time messaging via WebSockets
- 👤 Avatar selection & user profiles
- 🟢 Online/offline status indicators
- 🕓 Persistent message history
- 📱 Responsive design for all screens
- ⚙️ Clean folder structure and modular code

---

## 🛠️ Tech Stack
>>>>>>> 1009daf2cd7deb1d96d4019be7259c3215be156a

### Frontend
- React.js
- Styled Components
- Axios
- Socket.IO Client
- React Router DOM
- React Toastify

### Backend
- Node.js
- Express.js
<<<<<<< HEAD
- MongoDB
- Socket.IO
- Bcrypt
- Mongoose

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v14+ recommended)
- MongoDB
- Git

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd chat-app
```

### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file and add your MongoDB URI
echo "MONGODB_URI=your_mongodb_uri" > .env
echo "PORT=5000" >> .env

# Start the server
npm start
```

### 3. Frontend Setup
```bash
# Navigate to public directory
cd ../public

# Install dependencies
npm install

# Start the React application
npm start
```

## Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_uri
PORT=5000
```

## Project Structure

```
chat-app/
├── public/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   ├── utils/        # Utility functions
│   │   └── assets/       # Static assets
│   └── package.json
│
└── server/                # Backend Node.js application
    ├── controllers/      # Route controllers
    ├── models/          # Database models
    ├── routes/         # API routes
    ├── index.js       # Server entry point
    └── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/setAvatar/:id` - Set user avatar

### Users
- `GET /api/auth/allusers/:id` - Get all users except current user

### Messages
- `POST /api/messages/addmsg` - Send message
- `POST /api/messages/getmsg` - Get messages history

## Running the Application

1. Start MongoDB service
2. Start the backend server:
   ```bash
   cd server
   npm start
   ```
3. Start the frontend application:
   ```bash
   cd public
   npm start
   ```
4. Access the application at `http://localhost:3000`

## Common Issues and Solutions

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MongoDB URI in .env file
   - Verify network connectivity

2. **Avatar Setting Error**
   - Check if the server is running
   - Verify user authentication
   - Check network requests in browser console

3. **Socket Connection Issues**
   - Verify both server and client are running
   - Check for correct Socket.IO endpoint
   - Ensure proper CORS configuration

## Development

To run the application in development mode:

1. Backend:
```bash
cd server
npm run dev  # Uses nodemon for hot reload
```

2. Frontend:
```bash
cd public
npm start    # Runs in development mode
```

## Building for Production

1. Frontend Build:
```bash
cd public
npm run build
```

2. Backend Build:
```bash
cd server
npm run build
```

## Deployment

### Backend Deployment (Using Render.com)

1. Create a new Web Service on Render
   - Connect your GitHub repository
   - Select the branch to deploy
   - Set the root directory as `server`
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables (MONGODB_URI, PORT)

2. Configure Environment Variables on Render
   - Go to Dashboard → Your Web Service → Environment
   - Add your environment variables:
     ```
     MONGODB_URI=your_production_mongodb_uri
     PORT=5000
     ```

### Frontend Deployment (Using Vercel/Netlify)

### Detailed Vercel Deployment Guide

#### Prerequisites
1. GitHub account
2. Vercel account (Sign up at vercel.com using your GitHub account)
3. Node.js installed locally
4. Git installed locally

#### Step 1: Prepare Your Frontend
1. Update API Configuration
   - Create `.env` file in the `public` directory:
     ```
     REACT_APP_API_URL=your_backend_url
     REACT_APP_SOCKET_URL=your_backend_url
     ```
   - Update all API calls to use environment variables:
     ```javascript
     axios.defaults.baseURL = process.env.REACT_APP_API_URL;
     ```

2. Update Socket.IO Configuration
   - Modify socket connection to use environment variable:
     ```javascript
     const socket = io(process.env.REACT_APP_SOCKET_URL);
     ```

#### Step 2: Prepare for Deployment
1. In the `public` directory, create `vercel.json`:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "package.json",
         "use": "@vercel/static-build",
         "config": { "distDir": "build" }
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "/index.html"
       }
     ]
   }
   ```

2. Ensure your `package.json` has the correct build script:
   ```json
   {
     "scripts": {
       "build": "react-scripts build"
     }
   }
   ```

#### Step 3: Deploy to Vercel
1. Using Vercel CLI (Option 1):
   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Navigate to frontend directory
   cd public

   # Login to Vercel
   vercel login

   # Deploy
   vercel

   # For production deployment
   vercel --prod
   ```

2. Using Vercel Dashboard (Option 2):
   - Go to vercel.com and login
   - Click "New Project"
   - Import your GitHub repository
   - Select the frontend directory (`public`)
   - Configure project:
     - Framework Preset: Create React App
     - Root Directory: `public`
     - Build Command: `npm run build`
     - Output Directory: `build`
   - Add Environment Variables:
     - REACT_APP_API_URL
     - REACT_APP_SOCKET_URL
   - Click "Deploy"

#### Step 4: Configure Domain (Optional)
1. In Vercel Dashboard:
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

#### Step 5: Post-Deployment
1. Verify deployment:
   - Check build logs
   - Test all features
   - Verify API connections
   - Test Socket.IO functionality

2. Setup Continuous Deployment:
   - Vercel automatically deploys when you push to main branch
   - Configure branch deployments in Settings
   - Set up preview deployments for pull requests

#### Troubleshooting Common Issues
1. Build Failures:
   - Check build logs in Vercel dashboard
   - Verify all dependencies are in package.json
   - Check for environment variables

2. API Connection Issues:
   - Verify backend URL is correct
   - Check CORS configuration
   - Ensure environment variables are set

3. Socket Connection Issues:
   - Verify WebSocket URL
   - Check Socket.IO version compatibility
   - Ensure SSL/HTTPS configuration

4. Environment Variables:
   - Double-check variable names
   - Verify values in Vercel dashboard
   - Rebuild deployment after changing variables

### Database Deployment

1. MongoDB Atlas Setup
   - Create account on MongoDB Atlas
   - Create new cluster
   - Set up database access
   - Get connection string
   - Update MONGODB_URI in backend environment

### Important Deployment Notes

1. CORS Configuration
   - Update backend CORS settings with production frontend URL
   - Example in `server/index.js`:
     ```javascript
     app.use(cors({
       origin: ["https://your-frontend-url.com"],
       credentials: true
     }));
     ```

2. Security Considerations
   - Enable SSL/HTTPS
   - Set secure cookies
   - Use environment variables
   - Implement rate limiting
   - Add security headers

3. Performance Optimization
   - Enable gzip compression
   - Use CDN for static assets
   - Implement caching strategies
   - Optimize database queries

4. Monitoring
   - Set up error tracking (e.g., Sentry)
   - Configure performance monitoring
   - Set up uptime monitoring
   - Implement logging

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details 
=======
- MongoDB (via Mongoose)
- Socket.IO
- Bcrypt

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/chat-app.git
cd chat-app


>>>>>>> 1009daf2cd7deb1d96d4019be7259c3215be156a
