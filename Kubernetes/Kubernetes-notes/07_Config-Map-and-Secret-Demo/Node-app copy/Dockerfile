FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

# Runtime stage

FROM node:22-alpine AS runtime

WORKDIR /app2

COPY --from=builder /app /app2

# We can pass environment variables to our node application from here
ENV PORT=80

EXPOSE ${PORT}

CMD ["npm", "start"]
