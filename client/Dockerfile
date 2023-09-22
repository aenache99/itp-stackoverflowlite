# Use an official Node runtime as the parent image
FROM node:20-alpine3.17

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Make port 3000 available to the outside of the container
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
