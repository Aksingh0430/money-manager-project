# Money Manager - Complete Deployment Guide

This guide covers deploying both backend and frontend of the Money Manager application.

## Prerequisites

- GitHub account
- MongoDB Atlas account
- Accounts on deployment platforms (Vercel/Netlify for frontend, Railway/Render for backend)

## Part 1: Backend Deployment

### Option A: Railway (Recommended)

1. **Sign up at Railway.app**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your `money-manager-backend` repository

3. **Configure Environment Variables**
   - Go to your project settings
   - Add variables:
     ```
     MONGODB_URI=your_mongodb_atlas_connection_string
     PORT=5000
     NODE_ENV=production
     ```

4. **Deploy**
   - Railway will automatically deploy
   - Note your deployment URL (e.g., `https://your-app.railway.app`)

### Option B: Render

1. **Sign up at Render.com**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Name: money-manager-backend
     - Environment: Node
     - Build Command: `npm install`
     - Start Command: `npm start`

3. **Add Environment Variables**
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   NODE_ENV=production
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment
   - Note your URL (e.g., `https://money-manager-backend.onrender.com`)

### Option C: Heroku

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login and Create App**
```bash
heroku login
cd money-manager-backend
heroku create money-manager-api
```

3. **Set Environment Variables**
```bash
heroku config:set MONGODB_URI=your_mongodb_atlas_connection_string
heroku config:set NODE_ENV=production
```

4. **Deploy**
```bash
git push heroku main
```

## Part 2: MongoDB Atlas Setup

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free tier

2. **Create Cluster**
   - Click "Create a New Cluster"
   - Choose free tier (M0)
   - Select region closest to your users
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Add new database user
   - Choose password authentication
   - Save username and password

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

5. **Get Connection String**
   - Go to "Clusters"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `moneymanager`

## Part 3: Frontend Deployment

### Option A: Vercel (Recommended)

1. **Sign up at Vercel.com**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your `money-manager-frontend` repository

3. **Configure Build Settings**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```
   Replace with your actual backend URL from Part 1

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment
   - Note your frontend URL (e.g., `https://money-manager.vercel.app`)

### Option B: Netlify

1. **Sign up at Netlify.com**
   - Go to https://netlify.com
   - Sign up with GitHub

2. **Create New Site**
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select `money-manager-frontend` repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Add Environment Variables**
   - Go to Site settings → Environment variables
   - Add:
     ```
     VITE_API_URL=https://your-backend-url.com/api
     ```

5. **Deploy**
   - Click "Deploy site"
   - Wait for deployment
   - Note your URL (e.g., `https://money-manager.netlify.app`)

## Part 4: Update Backend CORS

After deploying frontend, update your backend to allow requests from your frontend domain.

1. **Update `server.js`**
```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://your-frontend-url.vercel.app', // Add your actual frontend URL
    'https://your-frontend-url.netlify.app'
  ],
  credentials: true
};

app.use(cors(corsOptions));
```

2. **Commit and Push Changes**
```bash
git add .
git commit -m "Update CORS settings"
git push
```

3. **Redeploy Backend**
   - Railway/Render will auto-deploy
   - For Heroku: `git push heroku main`

## Part 5: Testing Deployment

1. **Test Backend**
   - Visit: `https://your-backend-url.com/api/health`
   - Should return: `{"success": true, "message": "Money Manager API is running"}`

2. **Test Frontend**
   - Visit your frontend URL
   - Try adding a transaction
   - Check if data persists after refresh

## Part 6: Create Submission File

Create a text file named `SUBMISSION.txt`:

```
Money Manager Application - Deployment Details
=============================================

FRONTEND
--------
GitHub Repository: https://github.com/yourusername/money-manager-frontend
Last Commit Hash: [Get from: git log -1 --format="%H"]
Deployed URL: https://your-frontend-url.vercel.app

BACKEND
-------
GitHub Repository: https://github.com/yourusername/money-manager-backend
Last Commit Hash: [Get from: git log -1 --format="%H"]
Deployed URL: https://your-backend-url.railway.app

DATABASE
--------
MongoDB Atlas Cluster: [Your cluster name]

DEMO CREDENTIALS (if applicable)
---------------------------------
Email: demo@example.com
Password: demo123

NOTES
-----
- All features implemented as per requirements
- Application is fully functional
- Mobile responsive design included
```

## Getting Last Commit Hash

```bash
# For backend
cd money-manager-backend
git log -1 --format="%H"

# For frontend
cd money-manager-frontend
git log -1 --format="%H"
```

## Troubleshooting

### Backend Issues

**Problem:** Database connection failed
- Solution: Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0)
- Verify connection string has correct password
- Check database user permissions

**Problem:** API returns 500 errors
- Solution: Check backend logs on deployment platform
- Verify all environment variables are set
- Check MongoDB connection string

### Frontend Issues

**Problem:** API calls failing
- Solution: Check CORS settings on backend
- Verify VITE_API_URL is correct
- Check browser console for errors

**Problem:** Build fails
- Solution: Ensure all dependencies are in package.json
- Check for syntax errors
- Try `npm install` and rebuild locally

### CORS Issues

If you see CORS errors:
1. Update backend CORS settings
2. Add your frontend URL to allowed origins
3. Redeploy backend
4. Clear browser cache

## Maintenance

### Updating Code

1. Make changes locally
2. Test thoroughly
3. Commit and push to GitHub
4. Deployment platforms will auto-deploy

### Monitoring

- Check logs on deployment platforms
- Monitor MongoDB Atlas metrics
- Set up alerts for errors

### Backup

- MongoDB Atlas provides automatic backups
- Export important data regularly
- Keep local development copies

## Security Checklist

- [ ] MongoDB Atlas IP whitelist configured
- [ ] Strong database user password
- [ ] Environment variables set (not in code)
- [ ] CORS properly configured
- [ ] HTTPS enabled (automatic on most platforms)
- [ ] API rate limiting considered
- [ ] Input validation implemented

## Cost Considerations

**Free Tier Limits:**
- MongoDB Atlas: 512MB storage
- Vercel: 100GB bandwidth/month
- Netlify: 100GB bandwidth/month
- Railway: $5 free credit/month
- Render: 750 hours/month free

These limits are sufficient for development and moderate usage.

## Support

For deployment issues:
- Railway: https://docs.railway.app
- Render: https://render.com/docs
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com
- MongoDB Atlas: https://docs.atlas.mongodb.com

Good luck with your deployment! 🚀
