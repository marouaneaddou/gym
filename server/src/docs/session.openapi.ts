import z                    from 'zod';

import { sessionSchema }    from '../schemas/session.schema';
import { registry }         from './setup';


registry.registerPath({
    method: 'post',
    path: '/api/sessions',
    description: 'create new session',
    summary: 'New session',
    tags : ['Sessions'],

    request : {
        body : {
            content : {
                'application/json' : {
                    schema : sessionSchema,
                },
            },
        },
    },
    responses: {
        201: {
            description: 'plan created successfully',
            content : {
                'application/json' : {
                    schema : z.object({
                        status  : z.string(),
                        message : z.string(),
                    }),
                },
            },
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
    path: '/api/sessions',
    description: 'Get all sessions',
    summary: 'Session ',
    tags : ['Sessions'],
    responses: {
        200: {
            description: 'Get all session successfully',
            content : {
                'application/json' : {
                    schema : z.array(
                        z.object({
                            id          : z.number(),
                            startTime   : z.number(),
                            endTime     : z.number(),
                            day         : z.string(),
                            createdAt   : z.string(),
                            updatedAt   : z.string(),
                            user: z.array(
                                z.object({
                                    trainerId : z.number(),
                                }),
                            ),
                            status_basic : z.string().openapi({
                                example: 'available | over_capacity',
                            }),
                            status_vip : z.string().openapi({
                                example: 'available | over_capacity',
                            }),
                        }),
                    ),
                },
            },
        },
        401 : {
            description : 'Invalid token',
        },
    },

});