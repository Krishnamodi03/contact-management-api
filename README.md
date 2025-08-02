# Contact Management API

A RESTful API built with Node.js, Express, and MongoDB for managing contact information.

## Features

- ✅ **CRUD Operations**: Create, Read, Update, Delete contacts
- ✅ **Data Validation**: Email format, phone number format, name length validation
- ✅ **Unique Constraints**: Email and phone number uniqueness
- ✅ **Error Handling**: Standardized error responses for frontend integration
- ✅ **CORS Support**: Configured for cross-origin requests
- ✅ **MongoDB Integration**: Persistent data storage with MongoDB

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Mongoose schema validation
- **CORS**: Cross-Origin Resource Sharing enabled

## API Endpoints

### Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/contact` | Get all contacts |
| GET | `/contact/:id` | Get contact by ID |
| POST | `/contact` | Create new contact |
| PUT | `/contact/:id` | Update contact by ID |
| DELETE | `/contact/:id` | Delete contact by ID |

## Request/Response Format

### Create Contact (POST /contact)

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "1234567890",
  "message": "Optional message"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Contact data saved successfully",
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "1234567890",
    "message": "Optional message",
    "createdAt": "2023-09-06T10:30:00.000Z",
    "updatedAt": "2023-09-06T10:30:00.000Z"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email address",
      "value": "invalid-email"
    }
  ]
}
```

## Validation Rules

- **Name**: Required, minimum 3 characters
- **Email**: Required, valid email format, unique
- **Phone Number**: Required, exactly 10 digits, unique
- **Message**: Optional

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd first-nodejs-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/node-js
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

## Project Structure

```
first-nodejs-project/
├── Controller/
│   └── contact.js          # Contact controller with CRUD operations
├── Model/
│   └── contactData.js      # Mongoose schema and model
├── Routes/
│   └── contact.js          # Express routes
├── index.js                # Main server file
├── package.json            # Dependencies and scripts
├── .env                    # Environment variables (not tracked)
├── .gitignore             # Git ignore rules
└── README.md              # Project documentation
```

## Error Handling

The API provides consistent error responses with the following structure:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "field_name",
      "message": "Specific error message",
      "value": "invalid_value"
    }
  ]
}
```

## Database Configuration

- **Database**: `node-js`
- **Collection**: `contact-details`
- **Indexes**: 
  - `_id` (default MongoDB index)
  - `email_1` (unique index)
  - `phoneNumber_1` (unique index)

## Development

The project uses `nodemon` for development with automatic server restart on file changes.

```bash
npm start  # Starts the development server
```

## License

This project is open source and available under the [MIT License](LICENSE). 