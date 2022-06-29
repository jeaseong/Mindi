FROM node:16-alpine
WORKDIR /app
RUN apk --no-cache add --virtual builds-deps build-base python3
COPY package*.json ./
RUN npm install --location=global typescript
RUN npm ci
COPY . .
EXPOSE 5001
RUN npm run build
CMD ["NODE_ENV=production", "node", "./src/app.js"]