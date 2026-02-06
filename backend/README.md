# Money Manager Backend

RESTful API for Money Manager application built with Node.js, Express, and MongoDB.

## Features

- Transaction management (income/expense)
- Account management
- Transfer between accounts
- Category-wise summaries
- Period-based reports (monthly, weekly, yearly)
- 12-hour edit restriction on transactions
- Filtering and pagination

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd money-manager-backend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI
```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
NODE_ENV=development
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Transactions
- `GET /api/transactions` - Get all transactions (with filters)
- `GET /api/transactions/:id` - Get single transaction
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction (12-hour restriction)
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/transactions/summary/period` - Get period summary
- `GET /api/transactions/summary/categories` - Get category summary

### Accounts
- `GET /api/accounts` - Get all accounts
- `GET /api/accounts/:id` - Get single account
- `POST /api/accounts` - Create new account
- `PUT /api/accounts/:id` - Update account
- `DELETE /api/accounts/:id` - Delete account

### Transfers
- `GET /api/transfers` - Get all transfers
- `POST /api/transfers` - Create new transfer

### Health Check
- `GET /api/health` - Check API status

## Query Parameters

### Transactions Filter
```
?type=income|expense
&division=office|personal
&category=fuel|movie|food|loan|medical|salary|business|investment|gift|other
&startDate=2024-01-01
&endDate=2024-12-31
&page=1
&limit=50
```

## Deployment

### Railway
1. Create account on Railway.app
2. Create new project
3. Connect GitHub repository
4. Add environment variables
5. Deploy

### Render
1. Create account on Render.com
2. New Web Service
3. Connect GitHub repository
4. Add environment variables
5. Deploy

### Heroku
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create money-manager-api`
4. Set env vars: `heroku config:set MONGODB_URI=your_uri`
5. Deploy: `git push heroku main`

## License

MIT
