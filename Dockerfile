# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Bundle your app source code into the Docker image
COPY . .

# Expose a port that the application will listen on
EXPOSE 8080

# Define the command to run your application
CMD [ "node", "app.js" ]
