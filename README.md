# 💰 Money Manager - Full Stack Application

A comprehensive personal finance management application to track income, expenses, and manage your financial life with ease.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)

## ✨ Features

### Core Functionality
- ✅ Add, edit, and delete income and expense transactions
- ✅ 12-hour edit restriction on transactions
- ✅ Category-based tracking (Fuel, Food, Movie, Medical, etc.)
- ✅ Division-based organization (Office vs Personal)
- ✅ Date and time tracking for all transactions
- ✅ Account management and transfers between accounts

### Dashboard & Analytics
- 📊 Period-based summaries (Weekly, Monthly, Yearly)
- 📈 Interactive category breakdown charts
- 💹 Real-time income, expense, and balance calculations
- 📅 Transaction history with filters
- 🔍 Advanced filtering by type, division, category, and date range

### User Experience
- 🎨 Modern, clean UI with Tailwind CSS
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎯 Floating action button for quick access
- 🔔 Toast notifications for user feedback
- ⚡ Fast and smooth interactions
- 🌈 Color-coded transactions (green for income, red for expenses)

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Chart library for data visualization
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **React Hot Toast** - Notification system
- **date-fns** - Modern date utility library
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - Runtime environment
- **Express** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Express Validator** - Input validation
- **CORS** - Cross-origin resource sharing

### Database
- **MongoDB Atlas** - Cloud-hosted MongoDB

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Backend Setup

1. Clone and navigate to backend:
```bash
git clone <your-repo-url>
cd money-manager-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI:
```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
NODE_ENV=development
```

5. Start the server:
```bash
npm run dev
```

Backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend:
```bash
cd money-manager-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

Frontend will run on http://localhost:3000

## 📁 Project Structure

```
money-manager-project/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── models/
│   │   ├── Transaction.js        # Transaction model
│   │   ├── Account.js            # Account model
│   │   └── Transfer.js           # Transfer model
│   ├── routes/
│   │   ├── transactions.js       # Transaction routes
│   │   ├── accounts.js           # Account routes
│   │   └── transfers.js          # Transfer routes
│   ├── server.js                 # Express server
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── SummaryCards.jsx
│   │   │   ├── FilterPanel.jsx
│   │   │   ├── TransactionList.jsx
│   │   │   ├── TransactionModal.jsx
│   │   │   ├── CategoryChart.jsx
│   │   │   └── FloatingActionButton.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── context/
│   │   │   └── TransactionContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── config/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── README.md
│
└── DEPLOYMENT_GUIDE.md          # Comprehensive deployment instructions
```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Transactions

**Get all transactions**
```http
GET /transactions?type=income&division=personal&category=fuel&startDate=2024-01-01&endDate=2024-12-31
```

**Get single transaction**
```http
GET /transactions/:id
```

**Create transaction**
```http
POST /transactions
Content-Type: application/json

{
  "type": "expense",
  "amount": 500,
  "category": "food",
  "division": "personal",
  "description": "Lunch at restaurant",
  "date": "2024-02-05T12:30:00"
}
```

**Update transaction**
```http
PUT /transactions/:id
Content-Type: application/json

{
  "amount": 600,
  "description": "Updated description"
}
```

**Delete transaction**
```http
DELETE /transactions/:id
```

**Get period summary**
```http
GET /transactions/summary/period?period=monthly&year=2024&month=2
```

**Get category summary**
```http
GET /transactions/summary/categories?startDate=2024-01-01&endDate=2024-12-31
```

#### Accounts

**Get all accounts**
```http
GET /accounts
```

**Create account**
```http
POST /accounts
Content-Type: application/json

{
  "name": "Personal Cash",
  "type": "cash",
  "balance": 5000
}
```

#### Transfers

**Get all transfers**
```http
GET /transfers
```

**Create transfer**
```http
POST /transfers
Content-Type: application/json

{
  "fromAccount": "account_id_1",
  "toAccount": "account_id_2",
  "amount": 1000,
  "description": "Transfer for bills"
}
```

## 🎨 Categories & Icons

Available transaction categories:
- ⛽ Fuel
- 🎬 Movie
- 🍔 Food
- 💰 Loan
- 🏥 Medical
- 💵 Salary
- 💼 Business
- 📈 Investment
- 🎁 Gift
- 📝 Other

## 🔒 Security Features

- Input validation on all endpoints
- 12-hour edit restriction on transactions
- CORS configuration
- Environment variable protection
- MongoDB connection security

## 🌐 Deployment

Comprehensive deployment instructions are available in [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

### Quick Deploy

**Backend:** Railway, Render, or Heroku
**Frontend:** Vercel or Netlify
**Database:** MongoDB Atlas (Free Tier)

See the deployment guide for step-by-step instructions.

## 🧪 Testing

### Test Backend
```bash
cd backend
npm test
```

### Test Frontend
```bash
cd frontend
npm test
```

### Manual Testing
1. Start both frontend and backend
2. Visit http://localhost:3000
3. Try adding transactions
4. Test filters and period summaries
5. Verify 12-hour edit restriction

## 📝 Development Guidelines

### Code Style
- Use ES6+ features
- Follow React best practices
- Use functional components with hooks
- Keep components small and focused
- Write meaningful commit messages

### Branch Strategy
- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - New features
- `bugfix/*` - Bug fixes

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Ashwani Kumar Singh - Initial work

## 🙏 Acknowledgments

- Anthropic Claude for assistance
- React community
- Tailwind CSS team
- MongoDB team

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Multi-currency support
- [ ] Budget planning and alerts
- [ ] Recurring transactions
- [ ] Data export (CSV, PDF)
- [ ] Mobile app (React Native)
- [ ] Dark mode
- [ ] Email notifications
- [ ] Bank account integration
- [ ] Receipt upload and OCR

## 📊 Project Status

✅ **Version 1.0.0** - Fully functional with all core features

---

Made with ❤️ for managing finances better!
