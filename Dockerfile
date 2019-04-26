FROM node:alpine as builder
RUN apk update && apk add --no-cache make git

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN cd /app && npm set progress=false && npm install

COPY .  /app
RUN cd /app && npm run build --build-optimizer

FROM nginx:1.13-alpine

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/ui /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
