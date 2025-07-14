import { config, dailySlots } from '../config';
import prisma from '../db/prisma';


export const slotUsingDay = async ( day : string, is_vip : boolean ) => {
   
    const counts = await Promise.all(
        dailySlots.map( async ( slot : {startTime : string, endTime : string}) => {
            let count = await prisma.userSlot.count({
                where : {
                    slotTemplate : {
                        dayOfWeek : day,
                        startTime : slot.startTime,
                        endTime   : slot.endTime,   
                    },
                    isVip : is_vip,
                },
            });

            return {
                startTime: slot.startTime,
                endTime: slot.endTime,
                count,
                isFull: count >= (is_vip ? config.capacity_vip : config.capacity_basic),
            };
        },
        ), 
    );
    return counts;
};