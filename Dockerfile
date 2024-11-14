FROM node:20

# Create app directory
WORKDIR /usr/src/app
# Copy app source
COPY . .
# Install app dependencies
RUN npm install

# Build the app
RUN npm run build

# Expose port
EXPOSE 5173

# Start the app
# Start both server and dev scripts concurrently
CMD ["npx", "concurrently", "npm:server", "npm:dev"]



