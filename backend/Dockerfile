# Use Node.js LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend code
COPY . .

# Expose port
EXPOSE 5000

# Start the server
CMD ["node", "src/app.js"]
