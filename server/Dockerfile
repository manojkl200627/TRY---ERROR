FROM node:22-alpine
WORKDIR /app/back
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 5000
CMD ["npm","start"]