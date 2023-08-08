import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import {Express} from "express";
import { resolve } from 'path';


export const options: swaggerJSDoc.Options ={
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Things REST API",
      version: 'v1'
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [resolve(__dirname, "./main.js")]
}

console.log(resolve(__dirname, "./main.js"))

const swaggerSpec = swaggerJSDoc(options);

export function swaggerDocs(app: Express, port: number | string) {
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  })
  console.log("Docs available at http://localhost:" + port + "/docs")
}
