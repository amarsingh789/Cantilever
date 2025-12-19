# Users — Register Endpoint

**Endpoint:** `POST /users/register`

**Description:**
Registers a new user. Validates input, hashes the password, creates the user record, and returns an auth token and the created user (password excluded).

**Headers:**
- `Content-Type: application/json`

**Request Body:**
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "user@example.com",
  "password": "string"
}
```

**Validation Rules:**
- `fullname.firstname`: required, string, minimum 3 characters.
- `fullname.lastname`: optional, string, minimum 3 characters if provided.
- `email`: required, must be a valid email address.
- `password`: required, minimum 6 characters.

**Successful Response (201 Created):**
- Description: User created, returns JWT token and user object (without password).
- Body example:
```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<userId>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

**Example — Raw HTTP Response (201 Created):**
```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJf...",
  "user": {
    "_id": "64a1f2e5b7c8d9e0f1234567",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john@example.com"
  }
}
```

**Validation Error (400 Bad Request):**
- Returned when required fields are missing or fail validation.
- Body example:
```json
{
  "errors": [
    { "msg": "Invalid Email", "param": "email", "location": "body" },
    { "msg": "First name must be at least 3 characters long", "param": "fullname.firstname", "location": "body" }
  ]
}
```

**Conflict Error (409 Conflict):**
- Returned when the email already exists in the database (unique constraint).
- Body example:
```json
{ "error": "Email already registered" }
```

**Server Error (500 Internal Server Error):**
- Returned for unexpected failures.
- Body example:
```json
{ "error": "Internal Server Error" }
```

**Notes / Implementation details:**
- Passwords are hashed on the server (bcrypt) before saving.
- The created user is returned without the `password` field (schema uses `select: false`).
- The endpoint uses express-validator checks matching the validation rules above.
- On success, a JWT is generated using the server `JWT_SECRET` and returned to the client.

**How the data is required (summary):**
- `fullname.firstname` (string) — required, min length 3.
- `fullname.lastname` (string) — optional, min length 3 if provided.
- `email` (string) — required, must be a valid email.
- `password` (string) — required, min length 6.

Place this file at: Backend/README.md
