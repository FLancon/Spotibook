FROM node:18-alpine

#
ADD . /dist/
WORKDIR /dist

#
RUN touch .env

#
RUN ls -a

#
RUN npm install

#
RUN npm run build

#
EXPOSE 5009

#
CMD [ "npm","run","start"]