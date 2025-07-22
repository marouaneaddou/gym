

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z                        from 'zod';

import { days } from '../utils/schema.util';

extendZodWithOpenApi(z);

// export const days = z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);

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

export const queryLatestSlot = z.object({
    latestMembership : z.string().openapi({
        param : {
            in : 'query',
            name : 'latestMembership',
        },
        description : 'You must value is true',
    }).optional(),
}).strict().superRefine((val, ctx) => {
    if ( val.latestMembership && val.latestMembership != 'true' )
    {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Write true in value',
            path: ['latestMembership'],
        });
    }
});

export const memberSchemas = z.object({
    firstName : z.string().max(50).min(2),
    lastName : z.string().max(50).min(2),
    email       :   z.string().email().max(255),
    phone     : z.string().
        regex(/^\+?\d{7,15}$/, 'Invalid phone number format. Must be digits only, optional leading +, length 10-15.'),
    nationalId : z.string().regex(/^[A-Z]+\d+$/,
        'Invalid CIN format'),
    gender   : z.enum(['male', 'female']),
    startDate  : z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be in YYYY-MM-DD format' } )
        .refine((val) => {
            const date = new Date(val);
            return !isNaN(date.getTime());
        }, { message: 'Invalid date' }),
    planId     : z.number().gte(1),
    pricePaide : z.number().gte(1),
}).strict();

export const userSessions = z.array(
    z.object({
        id : z.number().gte(1).openapi({
            description : 'Session id',
        }),
        day       : days,
    }).strict(),
).refine((sessions) => {
    const daySet = new Set();

    for (const session of sessions) {
        if (daySet.has(session.day)) {
            return false; 
        }
        daySet.add(session.day); 
    }
    return true; 
}, {
    message: 'Days cannot be repeated',
});

export type SessionsUser = z.infer<typeof userSessions>
export type Member      =  z.infer<typeof memberSchemas>
export type membersheep = z.infer<typeof queryLatestSlot>
export type bodyMember  = z.infer<typeof createNewMemberBody>