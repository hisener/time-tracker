FROM node:8
ARG REACT_APP_API_URL

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
ENV REACT_APP_API_URL "$REACT_APP_API_URL"
RUN npm run build

EXPOSE 8080
CMD npm run serve
