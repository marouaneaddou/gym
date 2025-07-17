

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z                        from 'zod';

import { daysOfWeek } from '../utils';

extendZodWithOpenApi(z);

export const requestByDay = z.object({
    day : z.string()
        .openapi({
            param : {
                in : 'path',
                name : 'day', 
            },
            description : 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday',
        }),

}).strict().superRefine((val, ctx) => {

    if (!daysOfWeek.includes(val.day)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday',
            path: ['confirmPassword'],
        });
    }
},
);

export const is_vipSchema = z.object({
    is_vip : z.string()
        .openapi({
            param : {
                in : 'query',
                name : 'is_vip', 
            },
            description : 'true || false',
        }),
}).strict().superRefine((val, ctx) => {
    if (val.is_vip !== 'false' && val.is_vip != 'true') {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'true || false',
            path: ['confirmPassword'],
        });
    }
},
);

export type day = z.infer<typeof requestByDay>
export type vip = z.infer<typeof is_vipSchema>
