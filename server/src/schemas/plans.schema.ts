
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z                        from 'zod';

extendZodWithOpenApi(z);


export const createNewPlansSchema = z.object({

    type    :   z.string().max(30).min(3),
    description : z.string().min(10).max(50),
    max_days_per_week : z.number().gte(1),
    is_vip          :   z.boolean().optional(),
    price        :  z.number().gte(1),
    duration :  z.number().gte(1).openapi({
        description : 'Number of months',
    }),

});

export type newPLans    =   z.infer<typeof createNewPlansSchema>;