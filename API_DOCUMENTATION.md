# Money Manager API Documentation

Complete API documentation for the Money Manager backend.

## Base URL

```
Development: http://localhost:5000/api
Production: https://your-api-domain.com/api
```

## Table of Contents

1. [Authentication](#authentication)
2. [Transactions](#transactions)
3. [Accounts](#accounts)
4. [Transfers](#transfers)
5. [Error Handling](#error-handling)
6. [Response Format](#response-format)

---

## Authentication

Currently, the API does not require authentication. This can be added in future versions.

---

## Transactions

### Get All Transactions

Get a list of all transactions with optional filters.

**Endpoint:** `GET /transactions`

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| type | string | Filter by transaction type | `income` or `expense` |
| division | string | Filter by division | `office` or `personal` |
| category | string | Filter by category | `fuel`, `food`, `movie`, etc. |
| startDate | string (ISO 8601) | Start date for range | `2024-01-01` |
| endDate | string (ISO 8601) | End date for range | `2024-12-31` |
| page | number | Page number for pagination | `1` |
| limit | number | Items per page | `50` |

**Example Request:**
```http
GET /api/transactions?type=expense&division=personal&page=1&limit=20
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65c1234567890abcdef12345",
      "type": "expense",
      "amount": 500,
      "category": "food",
      "division": "personal",
      "description": "Lunch at restaurant",
      "date": "2024-02-05T12:30:00.000Z",
      "createdAt": "2024-02-05T12:30:00.000Z",
      "updatedAt": "2024-02-05T12:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "pages": 3
  }
}
```

---

### Get Single Transaction

Get details of a specific transaction.

**Endpoint:** `GET /transactions/:id`

**Example Request:**
```http
GET /api/transactions/65c1234567890abcdef12345
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65c1234567890abcdef12345",
    "type": "expense",
    "amount": 500,
    "category": "food",
    "division": "personal",
    "description": "Lunch at restaurant",
    "date": "2024-02-05T12:30:00.000Z",
    "createdAt": "2024-02-05T12:30:00.000Z",
    "updatedAt": "2024-02-05T12:30:00.000Z"
  }
}
```

---

### Create Transaction

Create a new income or expense transaction.

**Endpoint:** `POST /transactions`

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| type | string | Yes | `income` or `expense` |
| amount | number | Yes | Transaction amount (> 0) |
| category | string | Yes | Category from predefined list |
| division | string | Yes | `office` or `personal` |
| description | string | Yes | Description (max 200 chars) |
| date | string (ISO 8601) | No | Transaction date (defaults to now) |
| accountId | string | No | Associated account ID |

**Available Categories:**
- `fuel`, `movie`, `food`, `loan`, `medical`, `salary`, `business`, `investment`, `gift`, `other`

**Example Request:**
```http
POST /api/transactions
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

**Example Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65c1234567890abcdef12345",
    "type": "expense",
    "amount": 500,
    "category": "food",
    "division": "personal",
    "description": "Lunch at restaurant",
    "date": "2024-02-05T12:30:00.000Z",
    "createdAt": "2024-02-05T12:30:00.000Z",
    "updatedAt": "2024-02-05T12:30:00.000Z"
  }
}
```

---

### Update Transaction

Update an existing transaction (only within 12 hours of creation).

**Endpoint:** `PUT /transactions/:id`

**Request Body:** Same as Create Transaction (all fields optional)

**Example Request:**
```http
PUT /api/transactions/65c1234567890abcdef12345
Content-Type: application/json

{
  "amount": 600,
  "description": "Updated lunch expense"
}
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65c1234567890abcdef12345",
    "type": "expense",
    "amount": 600,
    "category": "food",
    "division": "personal",
    "description": "Updated lunch expense",
    "date": "2024-02-05T12:30:00.000Z",
    "createdAt": "2024-02-05T12:30:00.000Z",
    "updatedAt": "2024-02-05T15:45:00.000Z"
  }
}
```

**Error Response (after 12 hours):**
```json
{
  "success": false,
  "message": "Cannot edit transaction after 12 hours"
}
```

---

### Delete Transaction

Delete a transaction permanently.

**Endpoint:** `DELETE /transactions/:id`

**Example Request:**
```http
DELETE /api/transactions/65c1234567890abcdef12345
```

**Example Response:**
```json
{
  "success": true,
  "message": "Transaction deleted successfully"
}
```

---

### Get Period Summary

Get aggregated income and expense summary for a specific period.

**Endpoint:** `GET /transactions/summary/period`

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| period | string | Period type | `weekly`, `monthly`, or `yearly` |
| year | number | Year | `2024` |
| month | number | Month (1-12) | `2` |
| week | number | Week number | `5` |

**Example Request:**
```http
GET /api/transactions/summary/period?period=monthly&year=2024&month=2
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "period": "monthly",
    "startDate": "2024-02-01T00:00:00.000Z",
    "endDate": "2024-02-29T23:59:59.999Z",
    "income": 50000,
    "expense": 35000,
    "incomeCount": 5,
    "expenseCount": 28,
    "balance": 15000
  }
}
```

---

### Get Category Summary

Get breakdown of transactions by category.

**Endpoint:** `GET /transactions/summary/categories`

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| startDate | string | Start date for range |
| endDate | string | End date for range |
| type | string | Filter by type |
| division | string | Filter by division |

**Example Request:**
```http
GET /api/transactions/summary/categories?type=expense&startDate=2024-01-01&endDate=2024-12-31
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": {
        "category": "food",
        "division": "personal",
        "type": "expense"
      },
      "total": 15000,
      "count": 45
    },
    {
      "_id": {
        "category": "fuel",
        "division": "office",
        "type": "expense"
      },
      "total": 8000,
      "count": 12
    }
  ]
}
```

---

## Accounts

### Get All Accounts

**Endpoint:** `GET /accounts`

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65c1234567890abcdef12345",
      "name": "Personal Cash",
      "balance": 5000,
      "type": "cash",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-02-05T12:00:00.000Z"
    }
  ]
}
```

---

### Create Account

**Endpoint:** `POST /accounts`

**Request Body:**
```json
{
  "name": "Personal Cash",
  "type": "cash",
  "balance": 5000
}
```

**Account Types:**
- `cash`, `bank`, `credit_card`, `digital_wallet`

---

### Update Account

**Endpoint:** `PUT /accounts/:id`

---

### Delete Account

**Endpoint:** `DELETE /accounts/:id`

---

## Transfers

### Get All Transfers

**Endpoint:** `GET /transfers`

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65c1234567890abcdef12345",
      "fromAccount": {
        "_id": "65c1111111111111111111",
        "name": "Bank Account"
      },
      "toAccount": {
        "_id": "65c2222222222222222222",
        "name": "Personal Cash"
      },
      "amount": 1000,
      "description": "Monthly withdrawal",
      "date": "2024-02-05T10:00:00.000Z",
      "createdAt": "2024-02-05T10:00:00.000Z"
    }
  ]
}
```

---

### Create Transfer

Transfer money between two accounts.

**Endpoint:** `POST /transfers`

**Request Body:**
```json
{
  "fromAccount": "65c1111111111111111111",
  "toAccount": "65c2222222222222222222",
  "amount": 1000,
  "description": "Monthly withdrawal"
}
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65c1234567890abcdef12345",
    "fromAccount": {
      "_id": "65c1111111111111111111",
      "name": "Bank Account"
    },
    "toAccount": {
      "_id": "65c2222222222222222222",
      "name": "Personal Cash"
    },
    "amount": 1000,
    "description": "Monthly withdrawal",
    "date": "2024-02-05T10:00:00.000Z",
    "createdAt": "2024-02-05T10:00:00.000Z"
  }
}
```

---

## Error Handling

### Error Response Format

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message here",
  "errors": [
    {
      "field": "amount",
      "message": "Amount must be greater than 0"
    }
  ]
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 403 | Forbidden (e.g., edit restriction) |
| 404 | Not Found |
| 500 | Internal Server Error |

### Common Errors

**Validation Error (400):**
```json
{
  "success": false,
  "errors": [
    {
      "field": "amount",
      "message": "Amount must be greater than 0"
    }
  ]
}
```

**Not Found (404):**
```json
{
  "success": false,
  "message": "Transaction not found"
}
```

**Edit Restriction (403):**
```json
{
  "success": false,
  "message": "Cannot edit transaction after 12 hours"
}
```

---

## Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description"
}
```

### Pagination Response

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "pages": 5
  }
}
```

---

## Rate Limiting

Currently no rate limiting is implemented. This should be added for production use.

---

## Best Practices

1. **Always validate dates** before sending to API
2. **Handle 12-hour edit restriction** gracefully in UI
3. **Use pagination** for large datasets
4. **Cache summary data** when appropriate
5. **Handle errors** properly with user-friendly messages

---

## Testing with cURL

**Create Transaction:**
```bash
curl -X POST http://localhost:5000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "type": "expense",
    "amount": 500,
    "category": "food",
    "division": "personal",
    "description": "Lunch"
  }'
```

**Get Transactions:**
```bash
curl http://localhost:5000/api/transactions?type=expense
```

**Get Summary:**
```bash
curl http://localhost:5000/api/transactions/summary/period?period=monthly
```

---

For additional support or feature requests, please open an issue on GitHub.
