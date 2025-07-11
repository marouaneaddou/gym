

import { loginSchema }              from '../schemas/auth.schema';
import { registry }                 from './setup';


registry.registerPath({
    method: 'post',
    path: '/api/auth/login',
    description: '',
    summary: 'login',
    tags : ['Auth'],
    request : {
        body : {
            content : {
                'application/json' : {
                    schema : loginSchema,
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