# Use the official Node.js image.
FROM node:14

# Create and change to the app directory.
WORKDIR /app

# Install app dependencies.
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

# Copy app files.
COPY . .

# Expose the port the app runs on.
EXPOSE 5000

# Run the app with nodemon.
CMD ["nodemon", "src/index.js"]