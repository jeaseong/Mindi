FROM node:16-alpine
WORKDIR /app
RUN apk --no-cache add --virtual builds-deps build-base python3
COPY package*.json ./
RUN npm install --location=global typescript
RUN npm ci
COPY . .
EXPOSE 5001
RUN npm run build
RUN cp .env_production ./dist
ENV NODE_ENV=production
CMD ["node", "./dist/src/app.js"]