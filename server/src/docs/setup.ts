

import { OpenApiGeneratorV3, 
    OpenAPIRegistry }           from '@asteasolutions/zod-to-openapi';
import { Express }              from 'express';
import swaggerUi                from 'swagger-ui-express';
    
// Shared OpenAPI Registry

export const registry = new OpenAPIRegistry();

import './all.docs';

export const setupSwagger = (app: Express) => {
    const generator = new OpenApiGeneratorV3(registry.definitions); 
    const doc = generator.generateDocument({
        openapi: '3.0.0',
        info: {
            title: 'GYM API',
            version: '1.0.0',
        },
    });
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(doc));
};
