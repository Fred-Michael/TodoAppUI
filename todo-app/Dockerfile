# Use Node.js official image for building
FROM node:18 AS build-stage

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use Nginx as the production server
FROM nginx:alpine AS production-stage

# Copy built Angular app into Nginx's web directory
COPY --from=build-stage /app/dist/todo-app /usr/share/nginx/html

# Expose port 80 for serving the app
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]