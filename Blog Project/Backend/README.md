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

---

**Login Endpoint**

**Endpoint:** `POST /users/login`

**Description:**
Authenticates an existing user. Validates credentials, compares the provided password with the stored hashed password, and returns a JWT token and the user object (password excluded) when successful.

**Headers:**
- `Content-Type: application/json`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "string"
}
```

**Validation Rules:**
- `email`: required, must be a valid email address.
- `password`: required, minimum 6 characters.

**Successful Response (200 OK):**
- Description: Credentials are valid, returns JWT token and user object (without password).
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

**Example — Raw HTTP Response (200 OK):**
```http
HTTP/1.1 200 OK
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
    { "msg": "Password must be at least 6 characters long", "param": "password", "location": "body" }
  ]
}
```

**Unauthorized (401 Unauthorized):**
- Returned when the email is not found or the password does not match.
- Body example:
```json
{ "message": "Invalid email or password" }
```

**Server Error (500 Internal Server Error):**
- Returned for unexpected failures.
- Body example:
```json
{ "error": "Internal Server Error" }
```

**Notes / Implementation details:**
- The server looks up the user and selects the stored hashed password using `.select('+password')` before calling `comparePassword`.
- On success, a JWT is generated using the server `JWT_SECRET` and returned to the client.

**How the data is required (summary):**
- `email` (string) — required, must be a valid email.
- `password` (string) — required, min length 6.

---

**Profile Endpoint**

**Endpoint:** `GET /users/profile`

**Description:**
Retrieves the authenticated user's profile information. Requires a valid JWT token passed via cookie or Authorization header.

**Headers:**
- `Authorization: Bearer <token>` (or token in cookie)

**Request Body:**
None

**Successful Response (200 OK):**
- Description: Returns the authenticated user's profile object (without password).
- Body example:
```json
{
  "_id": "64a1f2e5b7c8d9e0f1234567",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com"
}
```

**Example — Raw HTTP Response (200 OK):**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "_id": "64a1f2e5b7c8d9e0f1234567",
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john@example.com"
}
```

**Unauthorized (401 Unauthorized):**
- Returned when token is missing, invalid, or expired.
- Body example:
```json
{ "message": "Unauthorized" }
```

**Server Error (500 Internal Server Error):**
- Returned for unexpected failures.
- Body example:
```json
{ "error": "Internal Server Error" }
```

**Notes / Implementation details:**
- Requires valid JWT token (passed via `Authorization` header or cookie).
- The `authMiddleware.authUser` middleware validates the token and attaches the user to `req.user`.
- Password is not returned in the response (schema uses `select: false`).

---

**Logout Endpoint**

**Endpoint:** `GET /users/logout`

**Description:**
Logs out the authenticated user by clearing the session token, blacklisting it, and preventing further use. Requires a valid JWT token.

**Headers:**
- `Authorization: Bearer <token>` (or token in cookie)

**Request Body:**
None

**Successful Response (200 OK):**
- Description: User successfully logged out.
- Body example:
```json
{ "message": "logged out" }
```

**Example — Raw HTTP Response (200 OK):**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{ "message": "logged out" }
```

**Unauthorized (401 Unauthorized):**
- Returned when token is missing, invalid, or expired.
- Body example:
```json
{ "message": "Unauthorized" }
```

**Server Error (500 Internal Server Error):**
- Returned for unexpected failures.
- Body example:
```json
{ "error": "Internal Server Error" }
```

**Notes / Implementation details:**
- Requires valid JWT token (passed via `Authorization` header or cookie).
- The `authMiddleware.authUser` middleware validates the token before logout.
- Token is blacklisted in the database to prevent reuse.
- Cookie (if used) is cleared from the client.
