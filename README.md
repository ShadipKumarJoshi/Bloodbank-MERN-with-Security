# ONline Bloodbank Website using Mern Stack (Biding Website)


This project is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack.



## Prerequisites

Before running this project, make sure you have the following installed on your machine:

- Node.js (https://nodejs.org)
- MongoDB (https://www.mongodb.com)

## Getting Started

1. Clone the repository to your local machine:

    ```shell
    git clone [repository URL]
    ```

2. Navigate to the project directory:

    ```shell
    open folder directory

    ```

3. Install the dependencies for frontend:

    ```shell
    cd frontend
    npm install
    
    ```
4. Install the dependencies for backend:

    ```shell
    cd backend
    npm install
    
    ```

5. Start the frontend server:

    ```shell
    npm start
    ```
5. Start the backend server:

    ```shell
    npm start
    `
5. Open your browser and visit `https://localhost:3000` to see the application running.

## Configuration

Create a `.env` file in the backend directory of the project and add the following environment variables:

- PORT=5000
- DB_URL='your mongodb cloud uri'

- JWT_TOKEN_SECRET="your_jwt_token_secret"
- CLOUD_NAME='your cloudinary cloud name'
- API_SECRET='your cloudinary api secret' 
- API_KEY='your cloudinary api key'

- RECAPTCHA_SITE_KEY=6Lfe3iAqAAAAAF5fpWAIXG6fWPmlJWlNh4R1djnG
- RECAPTCHA_SECRET_KEY= 6Lfe3iAqAAAAAODFpzwdXNwA6kD6uaKzyv6xoz4I

- DOMAIN=localhost
# session secret
- SESSION_SECRET = your_session_secret

# cookie expires in milliseconds
- COOKIE_EXPIRESIN = 2400000
- CSRF_TOKEN_COOKIE_EXPIRESIN = 2400000

- SMTP_HOST= smtp.gmail.com 
- SMTP_PORT = 587
- SMTP_MAIL = your email
- SMTP_PASSWORD = your password like qqqqq wwww eeee rrrr

- CORS_ALLOWED_ORIGINS= https://localhost:3000
- SSL_CRT_FILE=cert.crt
- SSL_KEY_FILE=cert.key


