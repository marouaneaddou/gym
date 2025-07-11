
import z                            from 'zod';

import { createNewPlansSchema, updatePlansSchema } from '../schemas/plans.schema';
import { statusEquipment }          from '../types/schema.type';
import { requestById } from '../utils/schema.util';
import { registry }                 from './setup';


registry.registerPath({
    method: 'post',
    path: '/api/plan',
    description: 'create new plan',
    summary: 'New plan',
    tags : ['plans'],
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
    },

});

registry.registerPath({
    method: 'put',
    path: '/api/plan/:id',
    description: 'update plan using id',
    summary: 'Update plan',
    tags : ['plans'],
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
    },

});

registry.registerPath({
    method: 'get',
    path: '/api/plan',
    description: 'Get all plans',
    summary: 'plans',
    tags : ['plans'],
    responses: {
        201: {
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

