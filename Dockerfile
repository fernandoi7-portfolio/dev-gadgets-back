# Use an official Node runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 for the app to listen on
EXPOSE 3000

# Set the command to run when the container starts
CMD [ "npm", "run", "start:dev" ]
