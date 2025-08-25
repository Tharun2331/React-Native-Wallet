# 🚀 React Native Wallet - Backend API

Express.js REST API server for the React Native Wallet application, providing transaction management and user data services.

## 📋 Overview

This backend provides a RESTful API for managing financial transactions with features including:
- Transaction CRUD operations
- User-based transaction filtering
- Financial summary calculations
- Rate limiting for API protection
- PostgreSQL database integration

## 🛠️ Tech Stack

- **Framework**: Express.js
- **Database**: Neon PostgreSQL
- **Rate Limiting**: Upstash Redis
- **Environment**: Node.js (ES Modules)
- **Deployment**: Render Platform

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js              # PostgreSQL database configuration
│   │   ├── upstash.js         # Redis rate limiting setup
│   │   └── cron.js            # Scheduled tasks configuration
│   ├── controllers/
│   │   └── transactionsController.js  # Business logic for transactions
│   ├── middleware/
│   │   └── rateLimiter.js     # Rate limiting middleware
│   ├── routes/
│   │   └── transactionsRoute.js       # API route definitions
│   └── server.js              # Express server entry point
├── .env                       # Environment variables
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- Neon PostgreSQL database
- Upstash Redis account

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   Create `.env` file:
   ```env
   # Database
   DATABASE_URL=your_neon_postgresql_connection_string
   
   # Upstash Redis
   UPSTASH_REDIS_REST_URL=your_upstash_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
   
   # Server
   PORT=5001
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Start production server**
   ```bash
   npm start
   ```

## 📡 API Endpoints

### Base URL
- **Development**: `http://localhost:5001/api`
- **Production**: `https://react-native-wallet-api-alqq.onrender.com/api`

### Endpoints Overview

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `GET` | `/transaction/:userId` | Get all transactions for a user | `userId` (string) |
| `GET` | `/transaction/summary/:userId` | Get financial summary | `userId` (string) |
| `POST` | `/transaction` | Create new transaction | Request body |
| `DELETE` | `/transaction/:id` | Delete transaction | `id` (number) |

### Detailed API Documentation

#### 1. Get User Transactions
```http
GET /transaction/:userId
```

**Response:**
```json
[
  {
    "id": 1,
    "user_id": "user_123",
    "title": "Coffee",
    "amount": "-4.50",
    "category": "Food & Drinks",
    "created_at": "2025-08-23T10:00:00Z"
  }
]
```

#### 2. Get Financial Summary
```http
GET /transaction/summary/:userId
```

**Response:**
```json
{
  "balance": "1245.50",
  "income": "2000.00",
  "expenses": "-754.50"
}
```

#### 3. Create Transaction
```http
POST /transaction
Content-Type: application/json

{
  "user_id": "user_123",
  "title": "Salary",
  "amount": 3000.00,
  "category": "Income"
}
```

**Response:**
```json
{
  "id": 2,
  "user_id": "user_123",
  "title": "Salary",
  "amount": "3000.00",
  "category": "Income",
  "created_at": "2025-08-23T10:00:00Z"
}
```

#### 4. Delete Transaction
```http
DELETE /transaction/:id
```

**Response:**
```json
{
  "message": "Transaction deleted Successfully!"
}
```

## 🛡️ Security & Rate Limiting

### Rate Limiting Configuration
- **Limit**: 1000 requests per minute per IP
- **Backend**: Upstash Redis
- **Middleware**: `rateLimiter.js`

### Development vs Production
```javascript
// Development - rate limiter disabled
// app.use(ratelimiter); // Commented out

// Production - rate limiter enabled
app.use(ratelimiter); // Uncommented
```

## 🗄️ Database Schema

### Transactions Table
```sql
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## ⚙️ Configuration Files

### `src/config/db.js`
PostgreSQL connection using Neon serverless driver:
```javascript
import { neon } from '@neondatabase/serverless';
export const sql = neon(process.env.DATABASE_URL);
```

### `src/config/upstash.js`
Redis rate limiting configuration:
```javascript
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1000, "60 s"), // 1000 requests per minute
});
```

## 🔧 Development

### Available Scripts
```json
{
  "dev": "nodemon src/server.js",    // Development with hot reload
  "start": "node src/server.js",      // Production server
  "test": "echo \"No tests specified\""
}
```

### Environment Setup
1. **Local Development**: Disable rate limiter
2. **Production**: Enable all security features
3. **Database**: Use environment variables for connection

## 🚀 Deployment (Render)

### Deployment Steps
1. Connect GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy with automatic builds on push

### Environment Variables Required
- `DATABASE_URL`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `PORT` (optional, defaults to 5001)

### Production Checklist
- ✅ Rate limiter enabled
- ✅ Environment variables configured
- ✅ Database connection tested
- ✅ CORS configured for mobile apps

## 🐛 Troubleshooting

### Common Issues

#### 1. Database Connection Errors
```bash
Error: Invalid connection string
```
**Solution**: Verify `DATABASE_URL` in environment variables

#### 2. Rate Limiting Issues
```bash
Too many requests, please try again later
```
**Solution**: 
- Development: Disable rate limiter
- Production: Check Upstash Redis configuration

#### 3. CORS Errors
```bash
Access-Control-Allow-Origin error
```
**Solution**: Ensure CORS middleware is properly configured

### Debugging Tips
1. Check server logs for detailed error messages
2. Verify environment variables are loaded
3. Test database connectivity separately
4. Monitor Upstash Redis usage

## 📈 Performance Considerations

- **Connection Pooling**: Neon handles connection pooling automatically
- **Rate Limiting**: Prevents API abuse and ensures fair usage
- **Error Handling**: Comprehensive error responses for debugging

## 🤝 Contributing

1. Follow the existing code structure
2. Add proper error handling for new endpoints
3. Update this README for new features
4. Test locally before deploying

---

Built with Express.js and deployed on Render 🚀
