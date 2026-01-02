# Task Management Backend API Documentation

## User Registration Endpoint

### `/users/register`

#### Description
This endpoint allows users to create a new account in the system. It validates the input data, hashes the password, creates a new user record in the database, and returns an authentication token.

#### HTTP Method
```
POST
```

#### Endpoint URL
```
POST /users/register
```

---

## Request

### Request Body
The request must be sent as JSON with the following fields:

| Field | Type | Required | Validation Rules |
|-------|------|----------|------------------|
| `email` | String | Yes | Must be a valid email format |
| `fullname.firstname` | String | Yes | Minimum 3 characters |
| `fullname.lastname` | String | No | Minimum 3 characters (if provided) |
| `password` | String | Yes | Minimum 6 characters |

### Example Request
```json
{
  "email": "user@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "securePassword123"
}
```

---

## Response

### Success Response

**Status Code:** `201 Created`

**Response Body:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "user@example.com"
  }
}
```

### Error Response - Validation Failed

**Status Code:** `400 Bad Request`

**Response Body:**
```json
{
  "errors": [
    {
      "value": "invalidemail",
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "value": "ab",
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

---

## Status Codes

| Status Code | Description |
|-------------|-------------|
| `201 Created` | User successfully registered. Token and user details returned. |
| `400 Bad Request` | Validation failed. Check the error messages in the response for details. |

---

## Validation Errors

The following validation errors may be returned:

- **Invalid Email**: The email field must be a valid email format
- **First name must be at least 3 characters long**: The firstname field must contain at least 3 characters
- **Password must be at least 6 characters long**: The password field must contain at least 6 characters

---

## User Login Endpoint

### `/users/login`

#### Description
This endpoint allows registered users to log in to their account. It validates the email and password, verifies the credentials against the database, and returns an authentication token.

#### HTTP Method
```
POST
```

#### Endpoint URL
```
POST /users/login
```

---

## Request

### Request Body
The request must be sent as JSON with the following fields:

| Field | Type | Required | Validation Rules |
|-------|------|----------|------------------|
| `email` | String | Yes | Must be a valid email format |
| `password` | String | Yes | Minimum 6 characters |

### Example Request
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

---

## Response

### Success Response

**Status Code:** `200 OK`

**Response Body:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "user@example.com"
  }
}
```

### Error Response - Invalid Credentials

**Status Code:** `401 Unauthorized`

**Response Body:**
```json
{
  "message": "Invalid email or password"
}
```

### Error Response - Validation Failed

**Status Code:** `400 Bad Request`

**Response Body:**
```json
{
  "errors": [
    {
      "value": "invalidemail",
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "value": "12345",
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

---

## Status Codes

| Status Code | Description |
|-------------|-------------|
| `200 OK` | User successfully authenticated. Token and user details returned. |
| `400 Bad Request` | Validation failed. Check the error messages in the response for details. |
| `401 Unauthorized` | Invalid email or password. User credentials do not match. |

---

## Validation Errors

The following validation errors may be returned:

- **Invalid Email**: The email field must be a valid email format
- **Password must be at least 6 characters long**: The password field must contain at least 6 characters

---

## Notes

- The password is hashed using bcrypt before being stored in the database
- The returned token can be used for authenticated requests
- User IDs are generated as MongoDB ObjectIds
- Email addresses must be unique (duplicate emails will be rejected)
- Password comparison uses bcrypt to securely verify the provided password against the stored hash
- Both email and password are required for successful login

---

## User Profile Endpoint

### `/users/profile`

#### Description
This endpoint retrieves the profile information of the currently authenticated user. It requires a valid authentication token to access.

#### HTTP Method
```
GET
```

#### Endpoint URL
```
GET /users/profile
```

#### Authentication
**Required:** Yes - Must include a valid authentication token in the request header or cookies.

---

## Request

### Headers
| Header | Value | Required |
|--------|-------|----------|
| `Authorization` | `Bearer <token>` | Yes (or via cookie) |
| `Cookie` | `token=<token>` | Yes (if not using Authorization header) |

### Example Request
```
GET /users/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Response

### Success Response

**Status Code:** `200 OK`

**Response Body:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "user@example.com"
}
```

---

## Status Codes

| Status Code | Description |
|-------------|-------------|
| `200 OK` | User profile successfully retrieved. |
| `401 Unauthorized` | Invalid or missing authentication token. |

---

## Notes

- This endpoint requires valid authentication
- The token can be obtained from the `/users/register` or `/users/login` endpoints
- User must be logged in to access their profile

---

## User Logout Endpoint

### `/users/logout`

#### Description
This endpoint logs out the currently authenticated user. It clears the authentication token from cookies and adds it to a blacklist to prevent further use.

#### HTTP Method
```
GET
```

#### Endpoint URL
```
GET /users/logout
```

#### Authentication
**Required:** Yes - Must include a valid authentication token in the request header or cookies.

---

## Request

### Headers
| Header | Value | Required |
|--------|-------|----------|
| `Authorization` | `Bearer <token>` | Yes (or via cookie) |
| `Cookie` | `token=<token>` | Yes (if not using Authorization header) |

### Example Request
```
GET /users/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Response

### Success Response

**Status Code:** `200 OK`

**Response Body:**
```json
{
  "message": "Logged out"
}
```

---

## Status Codes

| Status Code | Description |
|-------------|-------------|
| `200 OK` | User successfully logged out. Token has been blacklisted. |
| `401 Unauthorized` | Invalid or missing authentication token. |

---

## Notes

- This endpoint requires valid authentication
- The authentication token is cleared from cookies after logout
- The token is added to a blacklist to prevent reuse
- The user will need to log in again to obtain a new token
- All subsequent requests using the blacklisted token will be rejected
