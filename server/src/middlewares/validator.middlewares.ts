
import {     NextFunction, 
    Request, 
    Response }          from 'express';
import { StatusCodes }  from 'http-status-codes';
import { ZodError, 
    ZodSchema }         from 'zod';

export function validatorBody( schema : ZodSchema ) {
    return ( req : Request, res : Response, next : NextFunction) => {
        try {
            console.error( req.body);
            schema.parse( req.body );
            next();
        }
        catch ( error ) {
            if (error instanceof ZodError) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success : false,
                    errors  : error.flatten(),
                    error   : 'Invalid data',
                });

            }
            else 
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });

        }
    };
}

export function validatorQuery( schema : ZodSchema ) {
    return ( req : Request, res : Response, next : NextFunction) => {
        try {
            console.error( req.query );
            schema.parse( req.query );
            next();
        }
        catch ( error ) {
            if (error instanceof ZodError) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success : false,
                    errors  : error.flatten(),
                    error   : 'Invalid data',
                });

            }
            else 
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });

        }
    };
}

export function validatorParam( schema : ZodSchema ) {
    return ( req : Request, res : Response, next : NextFunction) => {
        try {
            console.error( req.params );
            schema.parse( req.params );
            next();
        }
        catch ( error ) {
            if (error instanceof ZodError) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    success : false,
                    errors  : error.flatten(),
                    error   : 'Invalid data',
                });

            }
            else 
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });

        }
    };
}
