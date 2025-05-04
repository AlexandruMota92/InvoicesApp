# Use Node.js 20.11.1 base image
FROM node:20.11.1-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .
COPY .env ./
RUN npx nest build

# Generate Prisma Client code
RUN npx prisma generate

# Expose the port the app runs on, here, I was using port 5000
EXPOSE 5000

# Command to run the app
CMD ["sh", "-c", "npm run start:migrate:prod && npm run prisma:seed && npm run start:prod"]