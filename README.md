Simple Nestjs/React application with the help of Typescript, Redux Toolkit and React Query
## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) >= 20.0.0 - for running the application
- [Docker](https://www.docker.com/)

### Installation

1. Clone the repository
### Backend
2. From root, navigate to /server and create a .env file with the line: DATABASE_URL="postgresql://root:root@db:5432/invoices?schema=public"
3. From root, run docker compose up
  - this will start PostgreSQL 
  - create the invoices database
  - run Prisma migrations for Invoice and User tables
  - seed it with both users and invoices
  - run the backend and enable all backend services (PORT:5000)
### Frontend
4. in a different terminal window, from root, navigate to /client and run npm install && npm start dev
  - front end will be available at http://localhost:5173 or 5174 (check the client terminal for the exact address :) )
5. you can login with email: user1@prisma.io password: 12345
