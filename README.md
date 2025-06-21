# SalesCRM - A MERN Stack CRM Application

SalesCRM is a full-stack Customer Relationship Management (CRM) application built with the MERN stack (MongoDB, Express, React, Node.js). It provides a feature-rich platform for managing leads, tracking sales, and organizing employee data.

## Features

*   **Dashboard:** An analytics dashboard with data visualizations for sales, revenue, and new customers.
*   **Lead Management:** A complete system for adding, viewing, and managing customer leads, including a CSV upload feature.
*   **Employee Management:** A detailed employee directory with pagination, status indicators, and actions for editing and deleting records.
*   **User Settings:** A dedicated page for users to manage their profile information.
*   **RESTful API:** A backend built with Express.js and Mongoose to handle all data operations.

## Project Structure

The project is organized into two main directories:

*   `/client`: Contains the React frontend application.
*   `/server`: Contains the Node.js, Express, and MongoDB backend application.

Each directory is a separate Node.js project with its own dependencies and scripts.

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

*   Node.js (`^14.x` or newer)
*   npm (usually comes with Node.js)
*   MongoDB (you'll need a running instance or a connection string from a service like MongoDB Atlas)

### Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/mayurcoding/SalesCRM.git
    cd SalesCRM
    ```

2.  **Set up the Server:**
    *   Navigate to the `server` directory.
        ```sh
        cd server
        ```
    *   Install the dependencies.
        ```sh
        npm install
        ```
    *   Create a `.env` file in the `server` directory and add your MongoDB connection string:
        ```
        MONGODB_URI=your_mongodb_connection_string
        ```
    *   Start the server.
        ```sh
        npm start
        ```
    The server will be running on `http://localhost:5000` (or the port specified in your environment).

3.  **Set up the Client:**
    *   Open a new terminal and navigate to the `client` directory.
        ```sh
        cd client
        ```
    *   Install the dependencies.
        ```sh
        npm install
        ```
    *   Start the React development server.
        ```sh
        npm start
        ```
    The client will be running on `http://localhost:3000` and will be set up to proxy requests to the backend server.

## Technologies Used

### Backend

*   **Node.js:** JavaScript runtime environment.
*   **Express:** Web framework for Node.js.
*   **MongoDB:** NoSQL database for data storage.
*   **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
*   **CORS:** Middleware for enabling Cross-Origin Resource Sharing.
*   **Dotenv:** For managing environment variables.

### Frontend

*   **React:** A JavaScript library for building user interfaces.
*   **React Router:** For client-side routing.
*   **Axios:** For making HTTP requests to the backend.
*   **Recharts:** For data visualization and charts.
*   **React Dropzone:** For file upload functionality.
*   For more details, see the `README.md` file in the `/client` directory.
