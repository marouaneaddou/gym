import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';


extendZodWithOpenApi(z);

export const requestById = z.object({
    id : z.string()
        .regex(/^\d+$/, { message: 'Id must contain only numbers' })
        .openapi({
            param : {
                in : 'path',
                name : 'id', 
            },
        }),
});

export const days = z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);

export type paramId = z.infer<typeof requestById>

