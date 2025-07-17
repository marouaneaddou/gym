
import z                            from 'zod';

import { createNewPlansSchema, updatePlansSchema } from '../schemas/plans.schema';
import { requestById } from '../utils/schema.util';
import { registry }                 from './setup';


registry.registerPath({
    method: 'post',
    path: '/api/plans',
    description: 'create new plan',
    summary: 'New plan',
    tags : ['Plans'],
    request : {
        
        body : {
            content : {
                'application/json' : {
                    schema : createNewPlansSchema,
                },
            },
        },
    },
    responses: {
        201: {
            description: 'plan created successfully',

        },
        401 : {
            description : 'Invalid token',
        },
        400 : {
            description : 'Invalid data',
        },
        404 : {
            description : 'Equipment not found',
        },
    },

});

registry.registerPath({
    method: 'put',
    path: '/api/plans/:id',
    description: 'update plan using id',
    summary: 'Update plan',
    tags : ['Plans'],
    request : {
        params: requestById,
        body : {
            content : {
                'application/json' : {
                    schema : z.object({
                        status : updatePlansSchema,
                    }),
                },
            },
        },
    },
    responses: {
        201: {
            description: 'PLan successfully updated',

        },
        401 : {
            description : 'Invalid token',
        },
        400 : {
            description : 'Invalid data',
        },
        404 : {
            description : 'Equipment not found',
        },
    },

});

registry.registerPath({
    method: 'delete',
    path: '/api/plans/:id',
    description: 'Delete one plan using id',
    summary: 'delete plan',
    tags : ['Plans'],
    request : {
        params: requestById,
    },
    responses: {
        201: {
            description: 'PLan successfully deleted',
        },
        401 : {
            description : 'Invalid token',
        },
        400 : {
            description : 'Invalid data',
        },
        404 : {
            description : 'Equipment not found',
        },
    },

});

registry.registerPath({
    method: 'get',
    path: '/api/plans',
    description: 'Get all plans',
    summary: 'plans',
    tags : ['Plans'],
    responses: {
        200: {
            description: 'PLan successfully updated',
            content : {
                'application/json' : {
                    schema : z.array(z.object({
                        id: z.number(),
                        duration: z.number(),
                        price: z.number(),
                        max_days_per_week: z.number(),
                        is_vip: z.boolean(),
                        type: z.string(),
                        description: z.string(),
                    })),
                },
            },

        },
        401 : {
            description : 'Invalid token',
        },
    },

});

