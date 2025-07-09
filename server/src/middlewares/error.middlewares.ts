

import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../types';

export const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    _next: NextFunction ): void => {

    console.error(err);

    const statusCode = err.statusCode ?? 500;
    const status = err.status ?? 'error';
    res.status(statusCode).json({
        status,
        message: err.message || 'Internal Server Error',
    });
};
