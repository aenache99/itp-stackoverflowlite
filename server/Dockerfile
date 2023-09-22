# Use an official Node runtime as the parent image
FROM node:16

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Make port 5000 available to the outside of the container (assuming your backend runs on port 5000)
EXPOSE 5000

# Run the app
CMD ["npm", "start"]
