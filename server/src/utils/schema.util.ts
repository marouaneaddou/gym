import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';


extendZodWithOpenApi(z);

export const requestById = z.object({
    id : z.string()
        .openapi({
            param : {
                in : 'path',
                name : 'id', 
            },
        }),
});

export type paramId = z.infer<typeof requestById>

