# Money Manager - Quick Setup Guide

This guide will help you get the Money Manager application running in under 10 minutes.

## 📦 What You Have

You have received a complete full-stack application with:
- ✅ Backend API (Node.js + Express + MongoDB)
- ✅ Frontend Web App (React + Vite + Tailwind CSS)
- ✅ Complete documentation
- ✅ Deployment guides

## 🚀 Quick Start (Local Development)

### Step 1: Prerequisites

Make sure you have installed:
- **Node.js** (v14+) - Download from https://nodejs.org
- **Git** - Download from https://git-scm.com

### Step 2: MongoDB Atlas Setup (5 minutes)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new cluster (select FREE tier M0)
4. Create a database user:
   - Username: `admin`
   - Password: (choose a strong password)
5. Add IP address: Click "Network Access" → "Add IP Address" → "Allow Access from Anywhere" → Confirm
6. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Replace `<dbname>` with `moneymanager`

Your connection string should look like:
```
mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/moneymanager?retryWrites=true&w=majority
```

### Step 3: Setup Backend (2 minutes)

```bash
# Navigate to backend folder
cd money-manager-project/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit the `.env` file and add your MongoDB connection string:
```
PORT=5000
MONGODB_URI=mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/moneymanager?retryWrites=true&w=majority
NODE_ENV=development
```

Start the backend:
```bash
npm run dev
```

You should see: "MongoDB Connected" and "Server running on port 5000"

### Step 4: Setup Frontend (2 minutes)

Open a NEW terminal window:

```bash
# Navigate to frontend folder
cd money-manager-project/frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

The `.env` file should contain:
```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

Browser should automatically open to http://localhost:3000

### Step 5: Test the Application

1. Click the **+ button** (floating action button) in the bottom-right
2. Add a test expense:
   - Amount: 500
   - Category: Food
   - Division: Personal
   - Description: Test lunch
   - Click "Add Expense"
3. You should see the transaction appear in the list
4. Check the dashboard cards update with the new data

🎉 **Congratulations!** Your Money Manager is now running!

---

## 📤 Deploying to Production

Follow the comprehensive [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for:
- Backend deployment (Railway/Render/Heroku)
- Frontend deployment (Vercel/Netlify)
- Complete configuration steps

### Quick Deploy Summary

**Backend (Railway - Recommended):**
1. Push code to GitHub
2. Sign up at railway.app
3. Connect GitHub repository
4. Add environment variable: `MONGODB_URI`
5. Deploy

**Frontend (Vercel - Recommended):**
1. Push code to GitHub
2. Sign up at vercel.com
3. Import repository
4. Add environment variable: `VITE_API_URL` (your backend URL)
5. Deploy

---

## 🗂️ Project Structure

```
money-manager-project/
├── backend/               # Node.js Backend API
│   ├── config/           # Database configuration
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── server.js         # Express server
│
├── frontend/             # React Frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── context/      # State management
│   │   ├── services/     # API services
│   │   └── utils/        # Helper functions
│   └── public/           # Static assets
│
├── README.md             # Project overview
├── DEPLOYMENT_GUIDE.md   # Deployment instructions
└── API_DOCUMENTATION.md  # API reference
```

---

## 🔧 Common Issues & Solutions

### Backend won't start

**Error:** "Cannot connect to MongoDB"
- **Solution:** Check your MongoDB connection string in `.env`
- Make sure IP whitelist is set to 0.0.0.0/0 in MongoDB Atlas
- Verify your database password is correct

**Error:** "Port 5000 already in use"
- **Solution:** Change PORT in `.env` to 5001 or kill the process using port 5000

### Frontend won't connect to backend

**Error:** "Network Error" or "Failed to fetch"
- **Solution:** Make sure backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env` file
- Try accessing http://localhost:5000/api/health in your browser

### Dependencies installation fails

**Error:** npm install errors
- **Solution:** 
  ```bash
  # Clear npm cache
  npm cache clean --force
  
  # Delete node_modules and package-lock.json
  rm -rf node_modules package-lock.json
  
  # Reinstall
  npm install
  ```

---

## 📱 Features Overview

### ✅ Implemented Features

- [x] Add, edit, delete transactions
- [x] Income and expense tracking
- [x] 10 predefined categories
- [x] Office vs Personal division
- [x] Date and time tracking
- [x] 12-hour edit restriction
- [x] Filter by type, division, category, date range
- [x] Weekly/Monthly/Yearly summaries
- [x] Category breakdown charts
- [x] Account management
- [x] Account transfers
- [x] Responsive design
- [x] Real-time updates

### 🎯 Key Specifications Met

- ✅ Dashboard with period-based views
- ✅ Transaction history
- ✅ Add button with modal popup
- ✅ Income and Expense tabs
- ✅ Category and division tracking
- ✅ Date range filtering
- ✅ 12-hour edit restriction
- ✅ Category summary
- ✅ Account transfers

---

## 🎨 Customization

### Adding New Categories

Edit `frontend/src/utils/constants.js`:
```javascript
export const CATEGORIES = [
  { value: 'rent', label: 'Rent', icon: '🏠' },
  // Add more...
];
```

### Changing Colors

Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#your-color',
    // ...
  }
}
```

---

## 📚 Documentation

- **[README.md](./README.md)** - Project overview and features
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Step-by-step deployment
- **Backend README** - Backend-specific details
- **Frontend README** - Frontend-specific details

---

## 🆘 Getting Help

If you encounter issues:

1. Check the troubleshooting section above
2. Review the error message carefully
3. Check browser console (F12) for frontend errors
4. Check terminal logs for backend errors
5. Verify all environment variables are set correctly

---

## ✅ Checklist for Submission

- [ ] Both repositories pushed to GitHub
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables configured
- [ ] Application tested end-to-end
- [ ] SUBMISSION.txt file created with:
  - [ ] Frontend GitHub URL
  - [ ] Frontend deployed URL
  - [ ] Frontend last commit hash
  - [ ] Backend GitHub URL
  - [ ] Backend deployed URL
  - [ ] Backend last commit hash

### Getting Commit Hash

```bash
# In backend folder
cd money-manager-project/backend
git log -1 --format="%H"

# In frontend folder
cd money-manager-project/frontend
git log -1 --format="%H"
```

---

## 🎉 Success!

You now have a fully functional Money Manager application!

**Next Steps:**
1. Test all features thoroughly
2. Add some sample transactions
3. Explore the dashboard and filters
4. Deploy to production
5. Share with users

**Happy Money Managing! 💰**
