
import 'dotenv/config';

import { Config } from '../types';
import { AppError } from '../utils/appError';

export const config : Config = {
    port            : Number(process.env.PORT) || 3000,
    databaseUrl     : process.env.DATABASE_URL || '',
    nodeEnv         : process.env.NODE_ENV as Config['nodeEnv'] || 'development',
    jwt_secret      : process.env.JWT_SECRET || '',
};

export const checkConfig =  ( ) => {
    try {
        if ( !config.databaseUrl )            
            throw new Error('DATABASE_URL environment variable is missing. Please define it in your .env file.');
        if ( !config.jwt_secret ) {
            throw new AppError( 'JWT_SECRET environment variable is missing', 500 );
        }
    }
    catch ( error ) {
        if ( error instanceof Error ) {
            console.error( error.message );
            process.exit( 1 );
        }
    }
};