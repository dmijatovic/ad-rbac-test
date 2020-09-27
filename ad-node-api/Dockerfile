FROM node:14 as build

WORKDIR /home/dv4all

# copy all files
COPY . .

RUN npm install
RUN npm run build

ENV PORT 5007
EXPOSE ${PORT}

FROM alpine:3.12

WORKDIR /home/dv4all

RUN apk add --no-cache nodejs

COPY --from=build /home/dv4all/dist .

ENV PORT 5007
EXPOSE ${PORT}

CMD ["node","index.js"]