
import 'dotenv/config';

import prisma from '../db/prisma';
import { Config } from '../types';
import { daysOfWeek } from '../utils';
import { AppError } from '../utils/appError';

export const config : Config = {
    port            :   Number(process.env.PORT) || 3000,
    databaseUrl     :   process.env.DATABASE_URL || '',
    nodeEnv         :   process.env.NODE_ENV as Config['nodeEnv'] || 'development',
    jwt_secret      :   process.env.JWT_SECRET || '',
    open            :   process.env.GYM_OPENING_HOUR || '06:00',
    closed          :   process.env.GYM_CLOSING_HOUR || '01:30',
    capacity_basic  :   Number(process.env.CAPACITY_BASIC) || 15,
    capacity_vip    :   Number(process.env.CAPACITY_VIP) || 5,
    slotDuration    :   Number(process.env.SLOT_DURATION ) || 90,
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

type Slot = {
  startTime: string;
  endTime: string;
};

function timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

function minutesToTime(totalMinutes: number): string {
    const minutesInDay = 1440; // minute of all day 24 * 60
    const minutes = totalMinutes % minutesInDay;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

function createSlots(openTime: string, closeTime: string, slotDuration: number): Slot[] {
    let openM = timeToMinutes(openTime);
    let closeM = timeToMinutes(closeTime);

    // If close time is after midnight
    // Check if time after midnight like 1 example . open 6 AM and closed 1 : 30 in this case uou must add 1440 minut before midnight of previous day
    if (closeM <= openM) { 
        closeM += 24 * 60;
    }

    const slots: Slot[] = [];
    let start = openM;

    while (start + slotDuration <= closeM) {
        slots.push({
            startTime: minutesToTime(start),
            endTime: minutesToTime(start + slotDuration),
        });
        start += slotDuration;
    }

    return slots;
}

export const dailySlots = createSlots(config.open, config.closed, config.slotDuration);
console.error( dailySlots );
export const createTempleteSlot = async () => {
    const count = await prisma.slotTemplate.count({

    });
    if ( count > 0 ) return;
    // const dailySlots = createSlots(config.open, config.closed, config.slotDuration);
    const templateSlots = daysOfWeek.flatMap(day => dailySlots.map(slot => ({
        dayOfWeek: day,
        startTime: slot.startTime,
        endTime: slot.endTime,
        capacityBasic : config.capacity_basic,
        capacityVip : config.capacity_vip,
    })));
    await prisma.slotTemplate.createMany({
        data : templateSlots,
    });
    console.error( templateSlots );
};