FROM node:14.17.4

WORKDIR /server

COPY ./package.json ./

RUN npm install

#COPY entrypoint.sh .
COPY app.js .

#RUN chmod +x /app/entrypoint.sh
RUN chmod +x /server/app.js

COPY  . .

EXPOSE 6001

#ENTRYPOINT [ "sh", "/app/entrypoint.sh" ]
ENTRYPOINT [ "node", "app.js" ]