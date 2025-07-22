
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z                        from 'zod';

import { days }                 from '../utils/schema.util';


extendZodWithOpenApi(z);

export const sessionSchema = z.object({
    startTime : z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format. Expected HH:mm'),
    endTime : z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format. Expected HH:mm'),

    day : days,
});

export type session = z.infer<typeof sessionSchema>