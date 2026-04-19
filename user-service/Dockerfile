FROM node:20-alpine

WORKDIR /app

# Install dependencies needed for node-gyp and native modules like bcrypt
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

# Build TypeScript to JavaScript
RUN npm run build || npx tsc

EXPOSE 3001

# Command to run the compiled JS (assuming it outputs to dist/)
# If the project relies on ts-node-dev for production (not recommended, but let's see how it runs)
CMD ["npm", "run", "dev"]
