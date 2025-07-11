
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z                        from 'zod';

extendZodWithOpenApi(z);


export const createNewPlansSchema = z.object({

    type    :   z.string().max(30).min(3).openapi({
        description : 'Header of plan',
    }),
    description : z.string().min(10).max(50),
    max_days_per_week : z.number().min(1).max(7),
    is_vip          :   z.boolean().optional(),
    price        :  z.number().gte(1),
    duration :  z.number().min(1).max(12).openapi({
        description : 'Number of months',
    }),

}).strict();

export const updatePlansSchema = z.object({

    type    :   z.string().max(30).min(3).openapi({
        description : 'Header of plan',
    }),
    description : z.string().min(10).max(50).optional(),
    max_days_per_week : z.number().min(1).max(7).optional(),
    price        :  z.number().gte(1).optional(),
    duration :  z.number().min(1).max(12).openapi({
        description : 'Number of months',
    }),

}).strict();

export type newPLans    =   z.infer<typeof createNewPlansSchema>;
export type updatePLans    =   z.infer<typeof updatePlansSchema>;