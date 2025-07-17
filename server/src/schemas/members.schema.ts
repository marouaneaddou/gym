

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z                        from 'zod';

extendZodWithOpenApi(z);

export const days = z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);

export const createNewMemberBody = z.object({
    firstName : z.string().max(50).min(2),
    lastName : z.string().max(50).min(2),
    email       :   z.string().email().max(255),
    phone     : z.string().
        regex(/^\+?\d{7,15}$/, 'Invalid phone number format. Must be digits only, optional leading +, length 10-15.'),
    nationalId : z.string().regex(/^[A-Z]+\d+$/,
        'Invalid CIN format'),
    gender   : z.enum(['male', 'female']),
    slot     :  z.array(z.object({
        day : days,
        seance : z.array(z.string().min(5).max(5)).openapi({
            description : 'Array of start date seance',
        }),
    })),
    startDate  : z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be in YYYY-MM-DD format' } )
        .refine((val) => {
            const date = new Date(val);
            return !isNaN(date.getTime());
        }, { message: 'Invalid date' }),
    
    planId     : z.number().gte(1),
    pricePaide : z.number().gte(1),
}).strict();

export type bodyMember = z.infer<typeof createNewMemberBody>