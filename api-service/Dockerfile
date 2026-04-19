FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

# Build TypeScript
RUN npm run build || npx tsc

EXPOSE 3002

CMD ["npm", "run", "dev"]
