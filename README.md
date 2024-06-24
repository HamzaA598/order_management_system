# Order Management System with NestJS, Prisma, PostgreSQL, and Docker

This repository contains a simple Order Management System implemented using NestJS for the backend, Prisma ORM for database interactions, PostgreSQL for the database, and Docker for containerization.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 14 or higher)
- Docker
- Docker Compose

## Getting Started

1.  Clone the repository
    ```bash
    git clone https://github.com/your-username/order-management-system.git
    cd order-management-system
    ```
2.  Set up environment variables
    Create a .env file in the root directory based on the .env.example file provided. Replace placeholders with your actual database credentials and configuration.

    ```dotenv
    POSTGRES_USER=yourusername
    POSTGRES_PASSWORD=yourpassword
    POSTGRES_DB=yourdatabase
    DATABASE_URL=yourdatabaseurl
    ```

3.  Install dependencies
    Install npm dependencies using npm or yarn:

    ```bash
    npm install
    # or
    yarn install
    ```

4.  Run the application with Docker Compose

    ```bash
    docker-compose up --build
    ```

    This command will build the Docker images for the NestJS application and PostgreSQL database, start the containers, and link them together.

5.  Initialize the database schema with Prisma migrations
    Once the containers are up and running, open a new terminal window/tab and execute the following commands:

    ```bash
    docker-compose exec app npx prisma migrate deploy
    ```

    This command will apply the database migrations and set up the database schema defined in your Prisma schema (prisma/schema.prisma).

6.  Accessing the application
    The NestJS application will be running at http://localhost:3000. You can access it using any API client (e.g., Postman, curl).

7.  Stopping the application
    To stop the application and remove the containers, press Ctrl + C in the terminal where docker-compose is running. Then, run:

    ```bash
    docker-compose down
    ```

## Testing

### Running tests

To run tests for the NestJS application:

```bash
npm run test
# or
yarn test
```

### Test coverage

To generate test coverage reports:

```bash
npm run test:cov
# or
yarn test:cov
```

This will generate a coverage report in the coverage/ directory.

## Additional Information

The application logs can be viewed by running docker-compose logs -f app.
For development mode, you can run the application without Docker using npm run start:dev.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your improvements.
