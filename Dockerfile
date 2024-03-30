# Use a specific version of Node.js
FROM node:18.16.1

# Set the working directory in the container
WORKDIR /app

# Copy only the package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Set environment variables for npm
ENV NPM_CONFIG_LOGLEVEL warn
ENV NPM_CONFIG_PROGRESS false
ENV NPM_CONFIG_COLOR false
ENV NPM_CONFIG_REGISTRY https://registry.npmjs.org/

# Install dependencies using npm
RUN npm install --force

# Copy the entire project files to the working directory
COPY . .

# Expose the port your app runs on (in Vite, it's typically 3000 during development)
EXPOSE 5173

# Specify the command to run your application (for local development)
CMD ["npm", "run", "dev"]