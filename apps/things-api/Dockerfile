FROM node:18.17-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system api && \
          adduser --system -G api api

COPY . /app
RUN chown -R api:api .

RUN npx pnpm install

EXPOSE 8080

CMD [ "node", "main.js" ]
