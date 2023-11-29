# BlogAPI Project

This project represents the backend of a blog application developed using Express and Mongoose. The application includes models for user management, Google user authentication, blog posts, views, categories, comments, and likes.

## Getting Started

To run the project locally, follow the steps below:

1. Clone the project:

   ```bash
   git clone https://github.com/username/BlogAPI.git
   ```

2. Navigate to the project directory:

   ```bash
   cd BlogAPI
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Add your MongoDB connection URL to the `.env` file:

   ```
   MONGODB=your_mongodb_connection_string
   ```

5. Start the application:

   ```bash
   npm start
   ```

The application will run by default at `http://localhost:8000`.

## Models

The project includes the following models:

- User
- GoogleUser
- Blog
- View
- Category
- Comment
- Like

Each model represents a corresponding database table and can be accessed through the relevant endpoints.

## Technologies Used

### MongoDB and Mongoose

The project uses MongoDB as the database and Mongoose as the ODM (Object Data Modeling) library for Node.js and MongoDB.

### Express

Express is used as the web application framework to build robust and scalable APIs.

### JWT (JSON Web Tokens)

JSON Web Tokens are employed for secure authentication and authorization processes.

### Logger

A logging mechanism is implemented using a logger for tracking and managing application logs effectively.

### User

Includes a specialized user model for Google login integration.

## Authentication

The project uses JSON Web Tokens (JWT) for user authentication and authorization. The user model is extended to support Google login.

## Advanced Querying

The API supports advanced querying for efficient data retrieval.

## API Documentation

The API documentation is available in various formats:

- Swagger
- ReDoc
- JSON

Explore the API documentation for a detailed understanding of available endpoints and functionalities.

Feel free to clone the repository and customize the project according to your requirements.
