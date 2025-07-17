

type UserInfo = {
    firstName : string,
    lastName : string,
    email : string,
    phone : string,
    gender : 'male' | 'female',
    nationalId : string
}

type MembershipData = {
    userId : number,
    planId : number,
    startDate : Date,
    pricePaid : number,
}

type Payment = {
    membershipId :  number,
    amount       :  number,
}

type Slot = {
    seance :    string[],
    day    :    'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
}

type Slots = Slot[]


type Days = { day : string, ids :number[]}[]

type UserSLot = {
    // slot : Slots,
    seanceIds : Days,
    userId : number,
    plan   : {
        id                : number,
        duration          : number,
        price             : number,
        max_days_per_week : number,
        is_vip            : boolean,
        type              : string 
        description       : String
        seance            : number
    }
}

export { Days, MembershipData, Payment, Slots, UserInfo, UserSLot };