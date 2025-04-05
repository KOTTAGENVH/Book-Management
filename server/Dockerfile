# Stage 1: Build the NestJS application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application
COPY . .

# Generate Prisma client (in builder stage)
RUN npx prisma generate

# Build the NestJS app (creates /app/dist)
RUN npm run build

# Stage 2: Run the compiled app
FROM node:18-alpine

WORKDIR /app

# Copy package files from builder
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy built app and prisma folder (schema is needed for generate)
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Run prisma generate in production stage to ensure the client exists
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 4000

# Start the app
CMD ["node", "dist/src/main"]
