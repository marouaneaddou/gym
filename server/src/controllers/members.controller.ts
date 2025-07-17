

import { Request, 
    Response }          from 'express';
import { StatusCodes }  from 'http-status-codes';

import { checkSeancesNotFull, 
    createMembership, 
    createUser, 
    createUserSlot, 
    getPLanData, 
    newPayment, 
    userInfo, 
    validateSeance }    from '../services/member.service';
import { AppError }     from '../utils/appError';


export const newMember = async ( req : Request, res : Response ) => {
    const body = req.body;
    const userChcek = await userInfo( body.email, body.nationalId );
    if ( userChcek != null ) 
        throw new AppError( 'User already exists', 409 );
    // Check slot days
    const plan =  await getPLanData( Number(body.planId));
    // console.error( plan.max_days_per_week)
    if ( body.slot.length != plan.max_days_per_week ) {
        throw new AppError( 'Invalid day plan: slot count does not match max days per week', StatusCodes.BAD_REQUEST );
    }
    if ( body.pricePaide != plan.price ) {
        throw new AppError( `Payment mismatch: expected ${plan.price}`, StatusCodes.BAD_REQUEST);
    }
    // check seance date is exist and get ids of seance
    const idsSeanceOfDay = await validateSeance( body.slot, plan.seance );

    // check seance is not full
    await checkSeancesNotFull( idsSeanceOfDay, plan.is_vip );
    // Create new member
    const user = await createUser( {
        firstName   :   body.firstName,
        lastName    :   body.lastName,
        email       :   body.email,
        phone       :   body.phone,
        gender      :   body.gender,
        nationalId  :   body.nationalId,
    });

    // Create new membersheep
    const membership = await createMembership( {
        userId      : user.id,
        planId      : body.planId,
        startDate   : new Date( body.startDate ),
        pricePaid   : body.pricePaide,
    });

    await newPayment( {
        membershipId :  membership.id,
        amount       :  body.pricePaide,
    });
    // member slots booked 
    await createUserSlot( {
        seanceIds    :   idsSeanceOfDay,
        userId       :   user.id,
        plan         :   plan,
    });

    res.status(StatusCodes.CREATED).json({
        'status' : 'success',
        message : 'User slots have been booked successfully',
    });






























//     const result = await createNewMember({
//   "firstName": "John",
//   "lastName": "Doe",
//   "email": "john.doe@example.com",
//   "phone": "+212612345678",
//   "nationalId": "A 1BC23D4",
//   "gender": "male",
//   "slot": [
//     {
//       "day": "Monday",
//       "seance": ["06:00"]
//     },
//     {
//       "day": "Tuesday",
//       "seance": ["06:00"]
//     },
//     {
//       "day": "Friday",
//       "seance": ["06:00"]
//     },
//     {
//       "day": "Sunday",
//       "seance": ["06:00"]
//     }
//   ],
//   "startDate": "2025-07-17",
//   "planId": 2,
//   "pricePaide": 200 
// }
// )
    // await createNewMember( body );
    //   const resilt = await validateSeance( [
    //   {
    //     day: "Monday",
    //     seance: ["07:30", "07:30"]
    //   },
    //   {
    //     day: "Tuesday",
    //     seance: ["13:30"]
    //   }
    // ], 2);
    // return res.json( result);
};