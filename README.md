# Order Management System with NestJS, Prisma, PostgreSQL, and Docker

This repository contains a simple Order Management System implemented using NestJS for the backend, Prisma ORM for database interactions, PostgreSQL for the database, and Docker for containerization.

## Run using Docker

### Prerequisites

Before you begin, ensure you have the following installed:

- Docker
- Docker Compose

### Getting Started

1.  Clone the repository

    ```bash
    git clone https://github.com/your-username/order-management-system.git
    cd order-management-system
    ```

2.  Configure Environment Variables

    Ensure that the `DATABASE_URL` in the docker-compose.yml file matches your setup. The provided configuration uses default PostgreSQL credentials.

3.  Run the application with Docker Compose

    ```bash
    docker-compose up --build
    ```

    This command will build the Docker images for the NestJS application and PostgreSQL database, start the containers, and link them together.

4.  Accessing the application
    The NestJS application will be running at http://localhost:3000. You can see the documentation of the endpoints at http://localhost:3000/api. You can access the application endpoints using any API client (e.g., Postman, Thunder Client, curl).

5.  Stopping the application
    To stop the application and remove the containers, press Ctrl + C in the terminal where docker-compose is running. Then, run:

    ```bash
    docker-compose down
    ```

## Run locally without using Docker

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18): [Install Node.js](https://nodejs.org/)
- PostgreSQL (version 13 or above): [Install PostgreSQL](https://www.postgresql.org/download/)
- npm (comes with Node.js): [Install npm](https://www.npmjs.com/get-npm)

### Getting Started

1.  Clone the repository

    ```bash
    git clone https://github.com/your-username/order-management-system.git
    cd order-management-system
    ```

2.  Install Dependencies
    Install the project dependencies using npm:

    ```bash
    npm install
    ```

3.  Set Up PostgreSQL Database

    1. Start PostgreSQL: Ensure PostgreSQL is running on your machine.

    2. Create a Database:

       Connect to your PostgreSQL server and create a new database:

       ```sh
       psql -U postgres
       ```

       Inside the PostgreSQL prompt, run:

       ```sql
       CREATE DATABASE order_management_system_db;
       ```

    3. Create a .env File:

       In the project root, create a .env file and add the following environment variables:

       ```dotenv
       DATABASE_URL=postgresql://postgres:postgres@localhost:5432/order_management_system_db?schema=public
       ```

4.  Generate Prisma Client:

    Generate the Prisma client based on the schema

    ```bash
    npx prisma generate
    ```

5.  Run Database Migrations:

    Apply the database migrations to set up the database schema

    ```bash
    npx prisma migrate dev
    ```

6.  Start the Application

    Start the NestJS application:

    ```bash
    npm run start:dev
    ```

    The NestJS application will be running at http://localhost:3000. You can see the documentation of the endpoints at http://localhost:3000/api. You can access the application endpoints using any API client (e.g., Postman, Thunder Client, curl).

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your improvements.
