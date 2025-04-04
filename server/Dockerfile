# Stage 1: Build the NestJS application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application
COPY . .

# Build the NestJS app (creates /app/dist)
RUN npm run build

# Stage 2: Run the compiled app
FROM node:18-alpine

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Install only production dependencies
RUN npm install --omit=dev

# Expose the port the app runs on
EXPOSE 4000

# Start the app
CMD ["node", "dist/src/main"]

