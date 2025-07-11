

import prisma from '../db/prisma';
import { AppError } from '../utils/appError';

export const info = async ( email : string ) => {
    try {
        console.error( email );
        const info = await prisma.admin.findUnique({
            where : {
                email : email,
            },
        });
        return info;
    }
    catch {
        console.error( 'test test ');
        throw new AppError( 'Invalid email or password', 401);
    }
};