FROM node:9.6.1

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g @angular/cli@7.1.4

RUN npm rebuild node-sass

COPY src /usr/src/app

CMD ng serve --host 0.0.0.0 --port 4200
