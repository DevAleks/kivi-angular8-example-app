FROM node:12
WORKDIR /usr/src/app
COPY . .
RUN npm install
CMD node_modules/.bin/ng serve --host 0.0.0.0 --port 4200
EXPOSE 4200
