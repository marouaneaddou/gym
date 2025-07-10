
import z                            from 'zod';

import { createNewEquipmentSchema } from '../schemas/equipment.schema';
import { statusEquipment }          from '../types/schema.type';
import { requestById } from '../utils/schema.util';
import { registry }                 from './setup';


registry.registerPath({
    method: 'post',
    path: '/api/equipment',
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
    },

});

registry.registerPath({
    method: 'patch',
    path: '/api/equipment/:id',
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
    },

});

