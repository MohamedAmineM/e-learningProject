 # Step 1: Build the Angular app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the source code
COPY package*.json ./
COPY src/ ./src/
COPY angular.json .
COPY tsconfig*.json ./

# Build the Angular app for production
RUN npm run build --configuration=production

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular files
COPY --from=build /app/dist/madrasati-front/browser /usr/share/nginx/html/

# Copy custom nginx config
COPY default.conf /etc/nginx/conf.d/default.conf

# Fix permissions and drop privileges
RUN chown -R nginx:nginx /usr/share/nginx/html
USER nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 
