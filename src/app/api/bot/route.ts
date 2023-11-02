import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {

    try {
        const url = process.env.BACKEND_PATH!
        const infoData = await axios.get(`${url}/controlbot/info`)
        const botInfo = infoData.data
        const filterData = {
            botid:botInfo.info.id,
            name:botInfo.info.first_name,
            username:botInfo.info.username,
            bio:botInfo.short.short_description,
            description:botInfo.long.description
        }

        return NextResponse.json({filterData},{status:200})
        
    } catch (error) {
        return NextResponse.json({data:null},{status:404})
    }
}

export async function PUT(req: NextRequest){
    try {
        const reqBody = await req.json();
        const {prop,value} = reqBody
        const url = process.env.BACKEND_PATH!
        const infoData = await axios.put(`${url}/controlbot/update/${prop}`, {value})
        const msg = infoData.data.message
        if(msg === 'ok'){
            return NextResponse.json({message:msg},{status:200})
        }
        return NextResponse.json({message:msg},{status:400})
    } catch (error) {
        return NextResponse.json({message:'Please try again after some time !!'},{status:404})
    }
}