# Stage 1: Build Angular app
FROM node:18 AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build Angular app for production
RUN npm run build -- --configuration production

# Stage 2: Serve static files using a simple lightweight web server
FROM node:18-alpine

WORKDIR /app

# Copy the built files from the build stage
COPY --from=build /app/dist/madrasati-front/browser /app

# Install a simple static server
RUN npm install -g serve

# Expose default port
EXPOSE 3000

# Start the static server
CMD ["serve", "-s", ".", "-l", "3000"]
