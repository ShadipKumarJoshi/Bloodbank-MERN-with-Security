<<<<<<< HEAD
## Kirana - Backend

## API Reference

**Cart Api**

#### Add item to cart

```http
POST /api/add_to_cart
```

#### Remove single item from cart

```http
POST /api/remove_from_cart
```

#### Remove all items from cart

```http
POST /api/remove_all_from_cart
```

**Product API**

#### Create product

```http
POST /api/products/create
```

#### Get all products

```http
GET /api/products
```

#### Get single product

```http
GET /api/products/:id
```

#### Pagination products

```http
GET /api/products/pagination
```

#### Add review

```http
PUT /api/products/:id/add_review
```

#### Delete product

```http
DELETE /api/products/:id
```

#### Get page count

```http
GET /api/products/pageCount
```

**User API**

#### Create User

```http
POST /api/users/create
```

#### Login User

```http
POST /api/users/login
```

#### Update User Details

```http
PUT /api/users/update
```

#### Delete User

```http
DELETE /api/users/delete
```

#### Get User Details

```http
GET /api/users/details
```

#### Get User Orders

```http
POST /api/users/orders
```

#### Forgot Password

```http
POST /api/users/forgot_password
```

#### Verify OTP and Set Password

```http
POST /api/users/verify_otp
```

#### Get Current User Details

```http
GET /api/users/getMe
```

## Technologies

- Node.js: Server-side runtime environment.
- Express.js: Backend framework for building web applications.
- MongoDB: NoSQL database for storing data.
- Mongoose: Object Data Modeling (ODM) library for MongoDB and Node.js.

## Tech Stack

**Node.js:** Server-side runtime environment.

**Express.js:** Backend framework for building web applications.

**MongoDB:** NoSQL database for storing data.

**Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_CLOUD`: MongoDB connection string.

`JWT_SECRET`: Secret key for JWT authentication.

`PORT`: Port on which the server will run.



- [@Jenish](https://github.com/Jemnish)



## **Security Features**

1. **Password Encryption**: Uses Bcrypt to securely hash passwords.
2. **Brute-Force Prevention**: Rate-limiting to prevent excessive requests.
3. **Session Management**: Secure session creation and expiration policies.
4. **Access Control**: Role-Based Access Control (RBAC) for Buyer/Seller roles.
5. **ReCAPTCHA Verification**: Protects against automated bots.



## **Environment Variables**

Create a `.env` file in the root of the backend directory with the following:

```plaintext
PORT=5000
MONOGODB_CLOUD=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
ENCRYPTION_KEY=your-32-character-secret-key
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
```git add README.md


1. Clone the repository:
   ```bash
=======
## Kirana - Backend

## API Reference

**Cart Api**

#### Add item to cart

```http
POST /api/add_to_cart
```

#### Remove single item from cart

```http
POST /api/remove_from_cart
```

#### Remove all items from cart

```http
POST /api/remove_all_from_cart
```

**Product API**

#### Create product

```http
POST /api/products/create
```

#### Get all products

```http
GET /api/products
```

#### Get single product

```http
GET /api/products/:id
```

#### Pagination products

```http
GET /api/products/pagination
```

#### Add review

```http
PUT /api/products/:id/add_review
```

#### Delete product

```http
DELETE /api/products/:id
```

#### Get page count

```http
GET /api/products/pageCount
```

**User API**

#### Create User

```http
POST /api/users/create
```

#### Login User

```http
POST /api/users/login
```

#### Update User Details

```http
PUT /api/users/update
```

#### Delete User

```http
DELETE /api/users/delete
```

#### Get User Details

```http
GET /api/users/details
```

#### Get User Orders

```http
POST /api/users/orders
```

#### Forgot Password

```http
POST /api/users/forgot_password
```

#### Verify OTP and Set Password

```http
POST /api/users/verify_otp
```

#### Get Current User Details

```http
GET /api/users/getMe
```

## Technologies

- Node.js: Server-side runtime environment.
- Express.js: Backend framework for building web applications.
- MongoDB: NoSQL database for storing data.
- Mongoose: Object Data Modeling (ODM) library for MongoDB and Node.js.

## Tech Stack

**Node.js:** Server-side runtime environment.

**Express.js:** Backend framework for building web applications.

**MongoDB:** NoSQL database for storing data.

**Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_CLOUD`: MongoDB connection string.

`JWT_SECRET`: Secret key for JWT authentication.

`PORT`: Port on which the server will run.



- [@Jenish](https://github.com/Jemnish)



## **Security Features**

1. **Password Encryption**: Uses Bcrypt to securely hash passwords.
2. **Brute-Force Prevention**: Rate-limiting to prevent excessive requests.
3. **Session Management**: Secure session creation and expiration policies.
4. **Access Control**: Role-Based Access Control (RBAC) for Buyer/Seller roles.
5. **ReCAPTCHA Verification**: Protects against automated bots.



## **Environment Variables**

Create a `.env` file in the root of the backend directory with the following:

```plaintext
PORT=5000
MONOGODB_CLOUD=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
ENCRYPTION_KEY=your-32-character-secret-key
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
```git add README.md


1. Clone the repository:
   ```bash
>>>>>>> 2fa730acead8214ebd3fd4a656f82804098b5102
   git clone https://github.com/jhaami/KIRANA.git