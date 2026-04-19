FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# Since Vite dev server binds to localhost by default, we need to bind it to 0.0.0.0 to access it from outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
