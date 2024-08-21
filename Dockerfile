FROM node:20-alpine

# Install jq for JSON processing
RUN apk update && apk add jq curl

WORKDIR /app
COPY . /app


# Copy the bash script to the container
RUN npm i
RUN npm i -g pm2

EXPOSE 3000

CMD sh -c "npm run build && pm2-runtime start npm --name 'next-app' -- start"
