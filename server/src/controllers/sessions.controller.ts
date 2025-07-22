
import { Request, 
    Response }                  from 'express';
import { StatusCodes } from 'http-status-codes';

import { checkConflictSession, 
    getAllSession, 
    newSession }                from '../services/sessions.service';
import { AppError }             from '../utils/appError';

function timeToMinutes(time: string): number {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute; 
}

export const createNewSession = async ( req : Request, res : Response ) => {
    const body = req.body;
    const startTime = timeToMinutes( body.startTime);
    let endTime = timeToMinutes( body.endTime);
    if (endTime < startTime) {
        throw new AppError( 'Not can create this session becouse confgion between start, end time', 400 );
    }
    const count = await checkConflictSession( { startTime, endTime, day : body.day } );
    // console.error( count )
    if ( count.length > 0 ) {
        throw new AppError( 'Conflict in session', 400 );
    }
    await newSession( { startTime, endTime, day : body.day } );
    res.status(201).json({
        'status' : 'success',
        message : 'New session created successfully',
    });
}; 

export const allSession = async ( req : Request, res : Response ) => {
    res.status( StatusCodes.OK).json( await getAllSession() );
};