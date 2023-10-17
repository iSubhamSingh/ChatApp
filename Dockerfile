# Use an official Node.js runtime as the base image
FROM node:18.18.2-alpine

# Set the working directory in the container
WORKDIR app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Bundle your app source code into the Docker image
COPY . .

# Expose a port that the application will listen on
EXPOSE 4200

# Define the command to run your application
CMD [ "node", "app.js" ]
