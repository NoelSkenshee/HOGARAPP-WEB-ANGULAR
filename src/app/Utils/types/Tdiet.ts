export type TdaysTime={ day: number; textDay:string,  time: string;marckDay:Date }

export type Tdiet={
    product:string,
    quantity:number,
    daysTime:TdaysTime[],
    initDate:Date,
    endDate:Date
    countDay:number
    durationDay:number
    image:string,
    marckDay:Date
}
export type TresponseDiet={
 error:boolean,
 message:string,
 data:Tdiet[]|null,
 token:string|null
}
