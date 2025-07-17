import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const loginSchema = z.object({
    password : z.string().min(8).max(32),
    email    : z.string().email().max(255),
}).strict();

export const passwordShemas = z.string()
    .min(8, { message : 'password must contain 8 characters' })
    .max(32, { message : 'The maximum number of characters allowed in the password is 32' })
    .superRefine((password, ctx) => {
        if (!/[A-Z]/.test(password)) {
            ctx.addIssue({
                message :	'Password must contain at least one uppercase letter',
                code	:	z.ZodIssueCode.custom,
            });
        }
        if (!/[a-z]/.test(password)) {
            ctx.addIssue({
                message :	'Password must contain at least one lower letter',
                code	:	z.ZodIssueCode.custom,
            });
        }
        if (!/[0-9]/.test(password)) {
            ctx.addIssue({
                message :	'Password must contain at least one number',
                code	:	z.ZodIssueCode.custom,
            });
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            ctx.addIssue({
                message :	'Password must contain at least one special character',
                code	:	z.ZodIssueCode.custom,
            });
        }
    });

export const registerSchema = z.object({
    firstName : z.string().min(3).max(20),
    lastName  : z.string().min(3).max(20),
    phone     : z.string().
        regex(/^\+?\d{7,15}$/, 'Invalid phone number format. Must be digits only, optional leading +, length 10-15.'),
    cin : z.string().regex(/^[A-Z] [A-Za-z0-9]{7}$/,
        'Invalid CIN format. Must be one uppercase letter, one space, then 7 letters or digits.'),
    email : z.string().email(),
    password : passwordShemas,
    confirmPassword : passwordShemas,
}).strict();


export const account = z.object({
    name            : z.string().min(3).max(50),
    phone          : z.string().min(10).max(15).
        regex(/^\+?\d{7,15}$/, 'Invalid phone number format. Must be digits only, optional leading +, length 10-15.'),
    email           : z.string().email(),
    password        : passwordShemas,
    confirmPassword : passwordShemas,
}).strict().superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password is not the same as confirm password',
            path: ['confirmPassword'],
        });
    }
});

export type   aneAccount      =    z.infer<typeof account>; 
export type   login        =   z.infer<typeof loginSchema>; 
