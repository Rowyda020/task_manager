# Use Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend code
COPY . .

# Expose dev server port (Vite default)
EXPOSE 5173

# Start frontend
CMD ["npm", "run", "dev", "--", "--host"]
