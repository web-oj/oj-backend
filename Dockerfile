# Use the official Node.js image.
FROM node:21-alpine

# Create and change to the app directory.
WORKDIR /home/node/app

COPY . .

# Install dependencies.
RUN npm install

# Expose the port the app runs on.
EXPOSE 8080

# Run the web service on container startup.
CMD ["npm", "run", "build:start"]