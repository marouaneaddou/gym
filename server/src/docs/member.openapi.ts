
import z                            from 'zod';

import { createNewMemberBody }      from '../schemas/members.schema';
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
                    schema : createNewMemberBody,
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