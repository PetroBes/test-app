# Use Node.js 18 LTS as base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 (assuming your NestJS app listens on this port)
EXPOSE 3000

# Command to run your NestJS app
CMD ["npm", "run", "start:dev"]