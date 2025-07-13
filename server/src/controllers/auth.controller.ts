import bcrypt               from 'bcryptjs';
import { Request, 
    Response }              from 'express';
import jwt                  from 'jsonwebtoken';

import { config }           from '../config';
import prisma               from '../db/prisma';
import { info }             from '../services/auth.service';
import { AppError }         from '../utils/appError';

export const login = async ( req : Request, res : Response ) => {
    const body = req.body;
    const checkCriedential = await info( body.email );

    if ( checkCriedential) {
        const accessTokenPayload = {
            exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60),
        };
        try { 
            await bcrypt.compare( body.password, checkCriedential.password );
        }
        catch ( error ) {
            console.error( error );
            throw new AppError( 'Invalid email or password', 401);
        }
        const token = jwt.sign(accessTokenPayload, config.jwt_secret);
    
        res.status(200).json({
            'status' : 'success',
            token : token,
        });
    }
    else {
        throw new AppError( 'Invalid email or password', 401);
    }
};

export const createAccount = async ( req : Request, res : Response ) => {
    const body = req.body;
    const count = await prisma.admin.count({
    });
    if ( count == 1 ) {
        throw new AppError( 'Not can create a new admin accounts', 400);
    }
    const passwordHash = await bcrypt.hash(body.password, 10);

    await prisma.admin.create({
        data : {
            password :  passwordHash,
            email    :  body.email,
            name     :  body.name,
            phone    :  body.phone,
        },
    });
    res.status(201).json({
        'status' : 'success',
        message  : 'Account created successfully',
    });
};