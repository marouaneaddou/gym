

import { NextFunction, 
    Request, 
    Response }          from 'express';
import jwt              from 'jsonwebtoken';

import { config }       from '../config';
import { AppError }     from '../utils/appError';

export const verfyToken =  ( req : Request, res: Response, next : NextFunction ) => {

    const  authorization  = req.header('authorization');

    if (!authorization ) {
        throw new AppError( 'Authorization header missing', 401 );
    }
    const [ Bearer, token ] = authorization.split(' ');

    if ( !Bearer || !token) {
        throw new AppError( 'Invalid JWT token', 401 );
    }
    const  verified = jwt.verify( token, config.jwt_secret );
    if ( !verified ) {
        throw new AppError( 'Invalid JWT token', 401 );
    }
    next(); 
};