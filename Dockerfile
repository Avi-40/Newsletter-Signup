FROM node:18.16.0-alpine

RUN apk add -U subversion

#Set working directory to /app
WORKDIR /app


#Set PATH /app/node_modules/.bin
ENV PATH /app/node_modules/.bin:$PATH


#Copy package.json in the image
COPY package.json ./

#Dependencies used for app
RUN npm install express --save
RUN npm install @mailchimp/mailchimp_marketing
RUN npm install mailchimp
RUN npm install body-parser
RUN npm install request

#Copy the app
COPY . ./

#hosted on port
EXPOSE 3000

#Start the app
CMD ["node", "app.js"]
