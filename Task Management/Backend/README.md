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

---

# Task Management Endpoints

## Create Task Endpoint

### `/tasks/create`

#### Description
This endpoint allows authenticated users to create a new task. It validates the input data and creates a task associated with the authenticated user.

#### HTTP Method
```
POST
```

#### Endpoint URL
```
POST /tasks/create
```

#### Authentication
**Required:** Yes - Must include a valid authentication token in the request header or cookies.

---

## Request

### Headers
| Header | Value | Required |
|--------|-------|----------|
| `Authorization` | `Bearer <token>` | Yes (or via cookie) |
| `Content-Type` | `application/json` | Yes |

### Request Body
| Field | Type | Required | Validation Rules |
|-------|------|----------|------------------|
| `title` | String | Yes | Minimum 3 characters |
| `description` | String | No | - |
| `status` | String | No | Enum: 'todo', 'in-progress', 'completed' (default: 'todo') |
| `priority` | String | No | Enum: 'low', 'medium', 'high' (default: 'medium') |

### Example Request
```json
{
  "title": "Complete project report",
  "description": "Write and submit the quarterly project report",
  "status": "in-progress",
  "priority": "high"
}
```

---

## Response

### Success Response

**Status Code:** `201 Created`

**Response Body:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Complete project report",
  "description": "Write and submit the quarterly project report",
  "status": "in-progress",
  "priority": "high",
  "user": "507f1f77bcf86cd799439011",
  "createdAt": "2026-01-09T10:30:00.000Z",
  "updatedAt": "2026-01-09T10:30:00.000Z"
}
```

### Error Response - Validation Failed

**Status Code:** `400 Bad Request`

**Response Body:**
```json
{
  "errors": [
    {
      "value": "ab",
      "msg": "Title must be at least 3 chars",
      "param": "title",
      "location": "body"
    }
  ]
}
```

### Error Response - Unauthorized

**Status Code:** `401 Unauthorized`

**Response Body:**
```json
{
  "message": "Unauthorized"
}
```

---

## Status Codes

| Status Code | Description |
|-------------|-------------|
| `201 Created` | Task successfully created. Task details returned. |
| `400 Bad Request` | Validation failed. Check the error messages in the response for details. |
| `401 Unauthorized` | Invalid or missing authentication token. |
| `500 Internal Server Error` | Server error while creating the task. |

---

## Validation Errors

The following validation errors may be returned:

- **Title must be at least 3 chars**: The title field must contain at least 3 characters

---

## Get All Tasks Endpoint

### `/tasks/all`

#### Description
This endpoint retrieves all tasks for the currently authenticated user. Returns a list of all tasks associated with the user.

#### HTTP Method
```
GET
```

#### Endpoint URL
```
GET /tasks/all
```

#### Authentication
**Required:** Yes - Must include a valid authentication token in the request header or cookies.

---

## Request

### Headers
| Header | Value | Required |
|--------|-------|----------|
| `Authorization` | `Bearer <token>` | Yes (or via cookie) |

### Example Request
```
GET /tasks/all
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Response

### Success Response

**Status Code:** `200 OK`

**Response Body:**
```json
{
  "tasks": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Complete project report",
      "description": "Write and submit the quarterly project report",
      "status": "in-progress",
      "priority": "high",
      "user": "507f1f77bcf86cd799439011",
      "createdAt": "2026-01-09T10:30:00.000Z",
      "updatedAt": "2026-01-09T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "title": "Review code changes",
      "description": "Review pull requests from team members",
      "status": "todo",
      "priority": "medium",
      "user": "507f1f77bcf86cd799439011",
      "createdAt": "2026-01-08T14:20:00.000Z",
      "updatedAt": "2026-01-08T14:20:00.000Z"
    }
  ]
}
```

### Error Response - Unauthorized

**Status Code:** `401 Unauthorized`

**Response Body:**
```json
{
  "message": "Unauthorized"
}
```

---

## Status Codes

| Status Code | Description |
|-------------|-------------|
| `200 OK` | Tasks successfully retrieved. |
| `401 Unauthorized` | Invalid or missing authentication token. |
| `500 Internal Server Error` | Server error while retrieving tasks. |

---

## Notes

- Returns only tasks belonging to the authenticated user
- Returns empty array if user has no tasks
- Tasks are sorted by creation date (newest first)

---

## Update Task Endpoint

### `/tasks/update/:id`

#### Description
This endpoint allows authenticated users to update a specific task. Currently supports updating the task status. Only the task owner can update their tasks.

#### HTTP Method
```
PATCH
```

#### Endpoint URL
```
PATCH /tasks/update/:id
```

#### URL Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | String | Yes | The MongoDB ObjectId of the task to update |

#### Authentication
**Required:** Yes - Must include a valid authentication token in the request header or cookies.

---

## Request

### Headers
| Header | Value | Required |
|--------|-------|----------|
| `Authorization` | `Bearer <token>` | Yes (or via cookie) |
| `Content-Type` | `application/json` | Yes |

### Request Body
| Field | Type | Required | Validation Rules |
|-------|------|----------|------------------|
| `status` | String | Yes | Enum: 'todo', 'in-progress', 'completed' |

### Example Request
```
PATCH /tasks/update/507f1f77bcf86cd799439012
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "status": "completed"
}
```

---

## Response

### Success Response

**Status Code:** `200 OK`

**Response Body:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Complete project report",
  "description": "Write and submit the quarterly project report",
  "status": "completed",
  "priority": "high",
  "user": "507f1f77bcf86cd799439011",
  "createdAt": "2026-01-09T10:30:00.000Z",
  "updatedAt": "2026-01-09T11:45:00.000Z"
}
```

### Error Response - Task Not Found

**Status Code:** `404 Not Found`

**Response Body:**
```json
{
  "message": "Task not found"
}
```

### Error Response - Unauthorized

**Status Code:** `401 Unauthorized`

**Response Body:**
```json
{
  "message": "Unauthorized"
}
```

---

## Status Codes

| Status Code | Description |
|-------------|-------------|
| `200 OK` | Task successfully updated. Updated task details returned. |
| `400 Bad Request` | Invalid request data. |
| `401 Unauthorized` | Invalid or missing authentication token. |
| `404 Not Found` | Task not found or does not belong to the authenticated user. |
| `500 Internal Server Error` | Server error while updating the task. |

---

## Notes

- Only the task owner can update their tasks
- Currently only the `status` field can be updated via this endpoint
- The `updatedAt` timestamp is automatically updated

---

## Delete Task Endpoint

### `/tasks/delete/:id`

#### Description
This endpoint allows authenticated users to delete a specific task. Only the task owner can delete their tasks.

#### HTTP Method
```
DELETE
```

#### Endpoint URL
```
DELETE /tasks/delete/:id
```

#### URL Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | String | Yes | The MongoDB ObjectId of the task to delete |

#### Authentication
**Required:** Yes - Must include a valid authentication token in the request header or cookies.

---

## Request

### Headers
| Header | Value | Required |
|--------|-------|----------|
| `Authorization` | `Bearer <token>` | Yes (or via cookie) |

### Example Request
```
DELETE /tasks/delete/507f1f77bcf86cd799439012
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Response

### Success Response

**Status Code:** `200 OK`

**Response Body:**
```json
{
  "message": "Task deleted successfully"
}
```

### Error Response - Task Not Found

**Status Code:** `404 Not Found`

**Response Body:**
```json
{
  "message": "Task not found"
}
```

### Error Response - Unauthorized

**Status Code:** `401 Unauthorized`

**Response Body:**
```json
{
  "message": "Unauthorized"
}
```

---

## Status Codes

| Status Code | Description |
|-------------|-------------|
| `200 OK` | Task successfully deleted. |
| `401 Unauthorized` | Invalid or missing authentication token. |
| `404 Not Found` | Task not found or does not belong to the authenticated user. |
| `500 Internal Server Error` | Server error while deleting the task. |

---

## Notes

- Only the task owner can delete their tasks
- Deletion is permanent and cannot be undone
- The task ID must be a valid MongoDB ObjectId format

---

## Task Schema

### Task Object Structure

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Complete project report",
  "description": "Write and submit the quarterly project report",
  "status": "in-progress",
  "priority": "high",
  "user": "507f1f77bcf86cd799439011",
  "createdAt": "2026-01-09T10:30:00.000Z",
  "updatedAt": "2026-01-09T10:30:00.000Z"
}
```

### Field Descriptions

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| `_id` | ObjectId | Unique identifier for the task (auto-generated) | - |
| `title` | String | The task title (required, min 3 chars) | - |
| `description` | String | Detailed description of the task | - |
| `status` | String | Current status of the task | 'todo' |
| `priority` | String | Priority level of the task | 'medium' |
| `user` | ObjectId | Reference to the User who owns the task | - |
| `createdAt` | Date | Timestamp when the task was created (auto-generated) | - |
| `updatedAt` | Date | Timestamp when the task was last updated (auto-generated) | - |

### Valid Status Values

- `todo` - Task is pending
- `in-progress` - Task is currently being worked on
- `completed` - Task has been completed

### Valid Priority Values

- `low` - Low priority task
- `medium` - Medium priority task
- `high` - High priority task
