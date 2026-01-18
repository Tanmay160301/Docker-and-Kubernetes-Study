FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

# We can pass environment variables to our node application from here
ENV PORT=3000

CMD ["npm", "start"]