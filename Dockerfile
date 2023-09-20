# Use the official Node.js image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json before other files
# Utilize Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose the API port to the Docker host
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
