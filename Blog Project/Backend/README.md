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

---

**Create Post Endpoint**

**Endpoint:** `POST /posts/create`

**Description:**
Creates a new blog post with title, content, category, and a cover image. Requires authentication and file upload.

**Headers:**
- `Authorization: Bearer <token>` (or token in cookie)
- `Content-Type: multipart/form-data`

**Request Body (multipart/form-data):**
```
title: string (required)
content: string (required)
category: string (required, enum: 'Technology', 'Health', 'Lifestyle', 'Education', 'Entertainment', 'Business', 'Travel', 'Food', 'Sports', 'Finance')
coverImage: file (required, image file)
```

**Validation Rules:**
- `title`: required, string.
- `content`: required, string.
- `category`: required, must be one of the predefined categories.
- `coverImage`: required, must be an image file.

**Successful Response (201 Created):**
- Description: Post created successfully with cover image uploaded.
- Body example:
```json
{
  "post": {
    "_id": "64a1f2e5b7c8d9e0f1234567",
    "title": "Getting Started with Node.js",
    "content": "Node.js is a JavaScript runtime...",
    "coverImage": "http://localhost:4000/uploads/image.jpg-1735203600000-123456789.jpg",
    "category": "Technology",
    "author": "64a1f2e5b7c8d9e0f1234560",
    "createdAt": "2025-12-26T10:00:00.000Z"
  }
}
```

**Example — Raw HTTP Response (201 Created):**
```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "post": {
    "_id": "64a1f2e5b7c8d9e0f1234567",
    "title": "Getting Started with Node.js",
    "content": "Node.js is a JavaScript runtime...",
    "coverImage": "http://localhost:4000/uploads/image.jpg-1735203600000-123456789.jpg",
    "category": "Technology",
    "author": "64a1f2e5b7c8d9e0f1234560",
    "createdAt": "2025-12-26T10:00:00.000Z"
  }
}
```

**Missing Cover Image Error (400 Bad Request):**
- Returned when cover image file is not provided.
- Body example:
```json
{ "message": "cover image is required" }
```

**Validation Error (400 Bad Request):**
- Returned when required fields are missing or category is invalid.
- Body example:
```json
{ "message": "Validation error message" }
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
- Requires valid JWT token for authentication.
- Cover image is uploaded using multer to the `./uploads` directory.
- Image filename is generated with timestamp and random suffix for uniqueness.
- The image URL is stored in the database as `http://localhost:4000/uploads/{filename}`.
- Author ID is automatically set from the authenticated user (`req.user._id`).
- The endpoint uses multipart/form-data for file upload.

**Image Upload Details:**
- **Storage location**: `./uploads/` directory on the server.
- **Filename format**: `{originalname}-{timestamp}-{randomId}.{extension}`
- **File access**: Images are served publicly at `http://localhost:4000/uploads/{filename}`
- **Size limit**: Configure multer if size restrictions are needed (currently unlimited).

---

**Get All Posts Endpoint**

**Endpoint:** `GET /posts/all`

**Description:**
Retrieves all blog posts sorted by creation date (newest first). Includes author details without requiring authentication.

**Headers:**
- `Content-Type: application/json`

**Request Body:**
None

**Query Parameters:**
None (currently)

**Successful Response (200 OK):**
- Description: Returns array of all blog posts with populated author information.
- Body example:
```json
{
  "posts": [
    {
      "_id": "64a1f2e5b7c8d9e0f1234567",
      "title": "Getting Started with Node.js",
      "content": "Node.js is a JavaScript runtime...",
      "coverImage": "http://localhost:4000/uploads/image.jpg-1735203600000-123456789.jpg",
      "category": "Technology",
      "author": {
        "_id": "64a1f2e5b7c8d9e0f1234560",
        "firstname": "John",
        "lastname": "Doe",
        "email": "john@example.com"
      },
      "createdAt": "2025-12-26T10:00:00.000Z"
    },
    {
      "_id": "64a1f2e5b7c8d9e0f1234568",
      "title": "Healthy Living Tips",
      "content": "Here are some tips for a healthier lifestyle...",
      "coverImage": "http://localhost:4000/uploads/health.jpg-1735203600001-987654321.jpg",
      "category": "Health",
      "author": {
        "_id": "64a1f2e5b7c8d9e0f1234561",
        "firstname": "Jane",
        "lastname": "Smith",
        "email": "jane@example.com"
      },
      "createdAt": "2025-12-26T09:30:00.000Z"
    }
  ]
}
```

**Example — Raw HTTP Response (200 OK):**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "posts": [
    {
      "_id": "64a1f2e5b7c8d9e0f1234567",
      "title": "Getting Started with Node.js",
      "content": "Node.js is a JavaScript runtime...",
      "coverImage": "http://localhost:4000/uploads/image.jpg-1735203600000-123456789.jpg",
      "category": "Technology",
      "author": {
        "_id": "64a1f2e5b7c8d9e0f1234560",
        "firstname": "John",
        "lastname": "Doe",
        "email": "john@example.com"
      },
      "createdAt": "2025-12-26T10:00:00.000Z"
    }
  ]
}
```

**Server Error (500 Internal Server Error):**
- Returned for unexpected failures.
- Body example:
```json
{ "message": "Internal Server Error" }
```

**Notes / Implementation details:**
- No authentication required; publicly accessible.
- Posts are populated with author details (firstname, lastname, email only).
- Posts are sorted by `createdAt` in descending order (newest first).
- Author password is never included in the response (schema uses `select: false`).

---

**Get Post by ID Endpoint**

**Endpoint:** `GET /posts/get/:id`

**Description:**
Retrieves a single blog post by its ID. Includes populated author information. No authentication required.

**Headers:**
- `Content-Type: application/json`

**URL Parameters:**
- `id` (string, required) — The MongoDB ObjectId of the post to retrieve.

**Request Body:**
None

**Successful Response (200 OK):**
- Description: Returns the requested post with author details.
- Body example:
```json
{
  "post": {
    "_id": "64a1f2e5b7c8d9e0f1234567",
    "title": "Getting Started with Node.js",
    "content": "Node.js is a JavaScript runtime...",
    "coverImage": "http://localhost:4000/uploads/image.jpg-1735203600000-123456789.jpg",
    "category": "Technology",
    "author": {
      "_id": "64a1f2e5b7c8d9e0f1234560",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john@example.com"
    },
    "createdAt": "2025-12-26T10:00:00.000Z"
  }
}
```

**Example — Raw HTTP Response (200 OK):**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "post": {
    "_id": "64a1f2e5b7c8d9e0f1234567",
    "title": "Getting Started with Node.js",
    "content": "Node.js is a JavaScript runtime...",
    "coverImage": "http://localhost:4000/uploads/image.jpg-1735203600000-123456789.jpg",
    "category": "Technology",
    "author": {
      "_id": "64a1f2e5b7c8d9e0f1234560",
      "fullname": { "firstname": "John", "lastname": "Doe" },
      "email": "john@example.com"
    },
    "createdAt": "2025-12-26T10:00:00.000Z"
  }
}
```

**Post Not Found (404 Not Found):**
- Returned when the post with the given ID does not exist.
- Body example:
```json
{ "message": "Post not found" }
```

**Server Error (500 Internal Server Error):**
- Returned for unexpected failures.
- Body example:
```json
{ "message": "Internal Server Error" }
```

**Notes / Implementation details:**
- No authentication required; publicly accessible.
- Post is populated with author details (fullname and email only).
- Author password is never included in the response (schema uses `select: false`).
- Returns 404 if post ID does not exist.

---

**Update Post Endpoint**

**Endpoint:** `PUT /posts/update/:id`

**Description:**
Updates an existing blog post. Only the post author can update their own posts. Title, content, and category can be updated. Cover image can be optionally updated with a new file. Requires authentication.

**Headers:**
- `Authorization: Bearer <token>` (or token in cookie)
- `Content-Type: multipart/form-data` (or application/json if no file)

**URL Parameters:**
- `id` (string, required) — The MongoDB ObjectId of the post to update.

**Request Body (multipart/form-data):**
```
title: string (required)
content: string (required)
category: string (required, enum: 'Technology', 'Health', 'Lifestyle', 'Education', 'Entertainment', 'Business', 'Travel', 'Food', 'Sports', 'Finance')
coverImage: file (optional, image file)
```

**Validation Rules:**
- `title`: required, string.
- `content`: required, string.
- `category`: required, must be one of the predefined categories.
- `coverImage`: optional, image file; if provided, replaces the current cover image.

**Successful Response (200 OK):**
- Description: Post updated successfully.
- Body example:
```json
{
  "message": "Post updated successfully",
  "post": {
    "_id": "64a1f2e5b7c8d9e0f1234567",
    "title": "Advanced Node.js Patterns",
    "content": "Here are some advanced patterns in Node.js...",
    "coverImage": "http://localhost:4000/uploads/newimage.jpg-1735289600000-987654321.jpg",
    "category": "Technology",
    "author": "64a1f2e5b7c8d9e0f1234560",
    "createdAt": "2025-12-26T10:00:00.000Z"
  }
}
```

**Example — Raw HTTP Response (200 OK):**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Post updated successfully",
  "post": {
    "_id": "64a1f2e5b7c8d9e0f1234567",
    "title": "Advanced Node.js Patterns",
    "content": "Here are some advanced patterns in Node.js...",
    "coverImage": "http://localhost:4000/uploads/newimage.jpg-1735289600000-987654321.jpg",
    "category": "Technology",
    "author": "64a1f2e5b7c8d9e0f1234560",
    "createdAt": "2025-12-26T10:00:00.000Z"
  }
}
```

**Post Not Found (404 Not Found):**
- Returned when the post with the given ID does not exist.
- Body example:
```json
{ "message": "Post not found" }
```

**Unauthorized / Forbidden (403 Forbidden):**
- Returned when the authenticated user is not the post author.
- Body example:
```json
{ "message": "Unauthorized action" }
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
{ "message": "Internal Server Error" }
```

**Notes / Implementation details:**
- Requires valid JWT token for authentication.
- Only the post author can update their own posts; other users receive 403 Forbidden.
- Cover image is optional; if provided, it replaces the current image.
- Image filename is generated with timestamp and random suffix for uniqueness.
- The updated post is returned with the new data.

---

**Delete Post Endpoint**

**Endpoint:** `DELETE /posts/delete/:id`

**Description:**
Deletes a blog post permanently. Only the post author can delete their own posts. Requires authentication.

**Headers:**
- `Authorization: Bearer <token>` (or token in cookie)
- `Content-Type: application/json`

**URL Parameters:**
- `id` (string, required) — The MongoDB ObjectId of the post to delete.

**Request Body:**
None

**Successful Response (200 OK):**
- Description: Post deleted successfully.
- Body example:
```json
{ "message": "Post deleted successfully" }
```

**Example — Raw HTTP Response (200 OK):**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{ "message": "Post deleted successfully" }
```

**Post Not Found (404 Not Found):**
- Returned when the post with the given ID does not exist.
- Body example:
```json
{ "message": "Post not found" }
```

**Unauthorized / Forbidden (403 Forbidden):**
- Returned when the authenticated user is not the post author.
- Body example:
```json
{ "message": "Unauthorized action" }
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
{ "message": "Internal Server Error" }
```

**Notes / Implementation details:**
- Requires valid JWT token for authentication.
- Only the post author can delete their own posts; other users receive 403 Forbidden.
- Once deleted, the post cannot be recovered.
- The cover image file remains on the server (manual cleanup may be needed).

---

**Get User's Posts Endpoint**

**Endpoint:** `GET /posts/my-posts`

**Description:**
Retrieves all blog posts created by the authenticated user, sorted by creation date (newest first). Requires authentication.

**Headers:**
- `Authorization: Bearer <token>` (or token in cookie)
- `Content-Type: application/json`

**Request Body:**
None

**Query Parameters:**
None (currently)

**Successful Response (200 OK):**
- Description: Returns array of all posts created by the authenticated user.
- Body example:
```json
{
  "posts": [
    {
      "_id": "64a1f2e5b7c8d9e0f1234567",
      "title": "Getting Started with Node.js",
      "content": "Node.js is a JavaScript runtime...",
      "coverImage": "http://localhost:4000/uploads/image.jpg-1735203600000-123456789.jpg",
      "category": "Technology",
      "author": "64a1f2e5b7c8d9e0f1234560",
      "createdAt": "2025-12-26T10:00:00.000Z"
    },
    {
      "_id": "64a1f2e5b7c8d9e0f1234568",
      "title": "Advanced Node.js Patterns",
      "content": "Here are some advanced patterns...",
      "coverImage": "http://localhost:4000/uploads/advanced.jpg-1735289600000-987654321.jpg",
      "category": "Technology",
      "author": "64a1f2e5b7c8d9e0f1234560",
      "createdAt": "2025-12-27T10:00:00.000Z"
    }
  ]
}
```

**Example — Raw HTTP Response (200 OK):**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "posts": [
    {
      "_id": "64a1f2e5b7c8d9e0f1234567",
      "title": "Getting Started with Node.js",
      "content": "Node.js is a JavaScript runtime...",
      "coverImage": "http://localhost:4000/uploads/image.jpg-1735203600000-123456789.jpg",
      "category": "Technology",
      "author": "64a1f2e5b7c8d9e0f1234560",
      "createdAt": "2025-12-26T10:00:00.000Z"
    }
  ]
}
```

**Empty Array Response (200 OK):**
- Returned when the authenticated user has not created any posts yet.
- Body example:
```json
{ "posts": [] }
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
{ "message": "Internal Server Error" }
```

**Notes / Implementation details:**
- Requires valid JWT token for authentication.
- Returns only posts where the `author` field matches the authenticated user's ID.
- Posts are sorted by `createdAt` in descending order (newest first).
- If the user has no posts, an empty array is returned with 200 OK status.
- Author details are not populated in the response (only author ID is included).
