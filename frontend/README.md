# Money Manager Frontend

Modern, responsive Money Manager web application built with React, Vite, and Tailwind CSS.

## Features

✨ **Core Features**
- Dashboard with financial overview
- Add/Edit/Delete income and expenses
- 12-hour edit restriction on transactions
- Category-wise expense tracking
- Office vs Personal division
- Filter transactions by type, division, category, and date range
- Period-based summaries (Weekly, Monthly, Yearly)
- Interactive charts and visualizations
- Real-time updates

🎨 **UI/UX**
- Clean, modern interface with Tailwind CSS
- Responsive design (mobile, tablet, desktop)
- Floating action button for quick access
- Toast notifications
- Loading states and animations
- Color-coded income (green) and expenses (red)

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **React Router** - Routing
- **React Hot Toast** - Notifications
- **date-fns** - Date utilities
- **Lucide React** - Icons

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Running backend API

## Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd money-manager-frontend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```bash
cp .env.example .env
```

4. Update `.env` with your API URL
```
VITE_API_URL=http://localhost:5000/api
```

Or for production:
```
VITE_API_URL=https://your-api-domain.com/api
```

## Running the Application

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.jsx
│   ├── SummaryCards.jsx
│   ├── FilterPanel.jsx
│   ├── TransactionList.jsx
│   ├── TransactionModal.jsx
│   ├── CategoryChart.jsx
│   └── FloatingActionButton.jsx
├── pages/              # Page components
│   └── Dashboard.jsx
├── context/            # React Context
│   └── TransactionContext.jsx
├── services/           # API services
│   └── api.js
├── config/             # Configuration
│   └── api.js
├── utils/              # Utility functions
│   ├── constants.js
│   └── helpers.js
├── App.jsx            # Main app component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## Key Features Implementation

### Transaction Management
- Add income/expense with modal interface
- Edit transactions within 12 hours
- Delete transactions with confirmation
- Real-time updates

### Filtering System
- Filter by type (income/expense)
- Filter by division (office/personal)
- Filter by category
- Date range filtering
- Clear all filters option

### Dashboard Analytics
- Summary cards showing income, expense, and balance
- Period selector (weekly/monthly/yearly)
- Category breakdown pie chart
- Transaction history list

### UI Components
- Responsive design with Tailwind CSS
- Custom color scheme
- Loading states
- Empty states
- Error handling with toast notifications

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI
```bash
npm i -g vercel
```

2. Login and deploy
```bash
vercel login
vercel
```

3. Set environment variables in Vercel dashboard
```
VITE_API_URL=your_production_api_url
```

### Netlify

1. Build the project
```bash
npm run build
```

2. Install Netlify CLI
```bash
npm i -g netlify-cli
```

3. Deploy
```bash
netlify deploy --prod
```

4. Set environment variables in Netlify dashboard

### GitHub Pages

1. Update `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/money-manager-frontend/'
})
```

2. Install gh-pages
```bash
npm install --save-dev gh-pages
```

3. Add to package.json:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

4. Deploy
```bash
npm run deploy
```

## Environment Variables

- `VITE_API_URL` - Backend API URL (required)

## Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your colors here
      }
    }
  }
}
```

### Categories
Edit `src/utils/constants.js` to add/remove categories:

```javascript
export const CATEGORIES = [
  { value: 'new_category', label: 'New Category', icon: '🎯' },
  // ...
];
```

## Troubleshooting

### CORS Issues
Make sure your backend allows requests from your frontend domain.

### API Connection Failed
- Check if backend is running
- Verify `VITE_API_URL` in `.env`
- Check network tab for error details

### Build Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear cache: `npm run build -- --force`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
