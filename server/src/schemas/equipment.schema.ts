
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z                        from 'zod';

extendZodWithOpenApi(z);

import { statusEquipment, 
    typeMachine }           from '../types/schema.type';

export const createNewEquipmentSchema = z.object({

    name    :   z.string().max(30).min(3),
    type    :   typeMachine,
    status  :   statusEquipment.optional(),
    brand   :   z.string().min(4).max(50),

});

export const updateEquipment = z.object({
    status : statusEquipment,
});

// export const requestById = z.object({
//     id : z.string()
//         .openapi({
//             param : {
//                 in : 'path',
//                 name : 'id', 
//             },
//         }),
// });

export type newEquipment    =   z.infer<typeof createNewEquipmentSchema>;
export type   status        =   z.infer<typeof updateEquipment>;
// export type paramId = z.infer<typeof requestById>

// .regex(/^\d+$'/, 'Id you must number') 
