# Production stage
FROM node:lts-alpine AS production

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of your code into the container
COPY . .

# Build your Next.js project for production
RUN npm run build

# Set the command to start the production server
CMD ["npm", "start"]