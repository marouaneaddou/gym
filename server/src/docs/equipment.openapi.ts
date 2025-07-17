
import z                            from 'zod';

import { createNewEquipmentSchema } from '../schemas/equipment.schema';
import { statusEquipment }          from '../types/schema.type';
import { requestById } from '../utils/schema.util';
import { registry }                 from './setup';


registry.registerPath({
    method: 'post',
    path: '/api/equipments',
    description: 'create new equipment using name, type, status, brand',
    summary: 'New equipment',
    tags : ['Equipment'],
    request : {
        
        body : {
            content : {
                'application/json' : {
                    schema : createNewEquipmentSchema,
                },
            },
        },
    },
    responses: {
        201: {
            description: 'Equipment created successfully',

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
    method: 'patch',
    path: '/api/equipments/:id',
    description: 'change status of equipment',
    summary: 'Update status',
    tags : ['Equipment'],
    request : {
        params: requestById,
        body : {
            content : {
                'application/json' : {
                    schema : z.object({
                        status : statusEquipment,
                    }),
                },
            },
        },
    },
    responses: {
        201: {
            description: 'status Equipment successfully changed',

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
    path: '/api/equipments',
    description: 'Get all  equipment',
    summary: 'all equipment',
    tags : ['Equipment'],
    responses: {
        201: {
            description: 'Get all equipment successfully',
            content : {
                'application/json' : {
                    schema : z.array( z.object({
                        id              : z.number(),
                        name            : z.string(),
                        type            : z.string(),
                        status          : z.string(),
                        brand           : z.string(),
                        createdAt       : z.string(),
                    }) ),
                },
            },
        },
        401 : {
            description : 'Invalid token',
        },
    },

});

registry.registerPath({
    method: 'delete',
    path: '/api/equipments/:id',
    description: 'delete one equipment using id',
    summary: 'delete equipment',
    tags : ['Equipment'],
    request : {
        params: requestById,
    },
    responses: {
        200: {
            description: 'Delete Equipment successfully',

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

