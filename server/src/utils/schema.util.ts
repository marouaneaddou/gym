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

export type paramId = z.infer<typeof requestById>

