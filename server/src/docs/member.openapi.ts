
import z                            from 'zod';

import {  
    memberSchemas }               from '../schemas/members.schema';
import { requestById }              from '../utils/schema.util';
import { registry }                 from './setup';

registry.registerPath({
    method: 'post',
    path: '/api/members',
    description: 'create new member',
    summary: 'New member',
    tags : ['Members'],
    request : {
        body : {
            content : {
                'application/json' : {
                    schema : memberSchemas,
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
    path: '/api/members',
    description: 'get all members',
    summary: 'all members',
    tags : ['Members'],
    responses: {
        200: {
            description: 'Get all members successfully',
            content : {
                'application/json' : {
                    schema : z.array(
                        z.object({
                            id          : z.number(),
                            firstName   : z.string(),
                            lastName    : z.string(),
                            email       : z.string(),
                            phone       : z.string(),
                            gender      : z.string(),
                            nationalId  : z.string(),
                            createdAt   : z.string(),
                            updatedAt   : z.string(),
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

registry.registerPath({
    method: 'get',
    path: '/api/:id/payments',
    description: 'Get all payment of user member',
    summary: 'all payment',
    tags : ['Members'],
    request : {
        params : requestById,
    },
    responses: {
        200: {
            description: 'Get all payment successfully',
            content : {
                'application/json' : {
                    schema : z.array(
                        z.object({
                            startDate: z.string(),
                            endDate: z.string(),
                            payment : z.array(
                                z.object({
                                    amount      : z.number(),
                                    paymentDate : z.string(),
                                }),
                            ),
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


registry.registerPath({
    method: 'get',
    path: '/api/members/:id/session',
    description: 'Get user session booked',
    summary: 'Session user',
    tags : ['Members'],
    request : {
        params : requestById,
        // query : queryLatestSlot,
    },
    responses: {
        200: {
            description: 'Get all session successfully',
            content : {
                'application/json' : {
                    schema : z.array(
                        z.object({
                            trainerId   :   z.number().gte(1),
                            sessionId   :   z.number().gte(1),
                            day         :   z.string(), 
                            is_vip      :   z.boolean(), 
                            status      :   z.string(),  
                            createdAt   :   z.number().gte(1),
                            updatedAt   :   z.string(),
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