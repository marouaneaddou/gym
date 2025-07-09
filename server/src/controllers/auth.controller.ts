import { Request, Response } from 'express';

export const register = async ( _req : Request, res : Response) => {
    res.send('test');
};