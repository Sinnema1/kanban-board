# Krazy Kanban Board

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Krazy Kanban Board is a web application designed to help teams organize and manage their workflow effectively. With features such as user authentication, ticket creation, and swimlane-based task tracking, the application offers a streamlined way to visualize and manage tasks. Users can sort and filter tickets by name, status, or assigned user, enabling enhanced project management. 

This project focuses on implementing **authentication with JSON Web Tokens (JWTs)** to provide a secure and scalable method for verifying user identities. JWTs are compact, URL-safe tokens that encode a user's authentication data, allowing servers to authenticate requests efficiently. The integration of JWTs enhances the application's security, enabling seamless authentication across various parts of the application. 

The challenge behind this project was to add authentication using JWT to an existing Kanban board application while maintaining functionality and improving overall security. The application integrates React, TypeScript, Express.js, and Sequelize, backed by a PostgreSQL database.

A direct link to the deployed application is provided in the "Questions" section below.

![Krazy Kanban Board](https://github.com/user-attachments/assets/d5ac9a82-7f4e-4ac6-bdfe-4b1a058cb98d)

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

To install this project locally, clone it from the GitHub repository linked in the "Questions" section below.

```bash
git clone https://github.com/Sinnema1/kanban-board.git
cd Develop
npm run install
```

## Usage

### Environment Variables

Create a `.env` file in the `server` directory and provide the necessary environment variables:

```plaintext
DB_NAME='kanban_db'
DB_USER='your-db-user'
DB_PASSWORD='your-db-password'
JWT_SECRET=your-jwt-secret
```

### Run the Application Locally

To run the project locally, use the following commands:

1. **Install dependencies**:

   ```bash
   cd Develop
   npm run install
   ```

2. **Seed the Database**:

   ```bash
   cd server
   npm run seed
   cd ..
   ```
   
3. **Start the Application**:

   ```bash
   npm run start:dev
   ```

4. **Access the Application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deployment on Render

This project is deployed on **Render**. The deployment process includes:

- **Create PostgreSQL Database in Render**:
  - Configure the database to match the schema defined in your project.
- **Copy Internal Database URL**:
  - This will be used as your `DB_URL` environment variable.
- **Create a New Web Service**:
  - Include all necessary environment variables:
    - `DB_URL`: Internal database URL from Render.
    - Any API keys and secrets from your `.env` file.
  - **Root Directory**: `Develop`
  - **Build Command**: `npm install && npm run client:build && npm run build`
  - **Start Command**: `cd server && npm run seed && node dist/server.js`

### Common Deployment Issues

If you encounter deployment issues such as `Database sync failed` or `Cannot GET /`, refer to the [Render Troubleshooting Guide](https://render.com/docs/troubleshooting-deploys).

## License

This application is covered under the MIT license. See the LICENSE file for more details.

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch for your changes.
3. Submit a pull request with a clear description of your updates.

## Tests

To verify the application works as expected, follow these steps:

1. **Install Dependencies**:

   ```bash
   cd Develop
   npm install
   ```

2. **Run the Development Server**:

   ```bash
   npm run start:dev
   ```

3. **Navigate to** [http://localhost:3000](http://localhost:3000) and test the application’s functionality.

## Questions

- **Deployed Application**: [Kanban Board Deployment](https://kanban-board-6zr2.onrender.com)
- **GitHub Repository**: [Sinnema1](https://github.com/Sinnema1/kanban-board)
- **Contact Information**: For questions or feedback, email me at [test@test.com](mailto:test@test.com).
