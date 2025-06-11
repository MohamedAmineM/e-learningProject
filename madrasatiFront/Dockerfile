# Step 1: Build the Angular app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the source code
COPY . .

# Build the Angular app for production
RUN npm run build 

# Step 2: Serve the built app using Nginx
FROM nginx:alpine

# Copy the build output to the Nginx folder
COPY --from=build /app/dist/madrasati-front/browser /usr/share/nginx/html

# Expose the port that Nginx will use
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]