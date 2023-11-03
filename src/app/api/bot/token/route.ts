import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {

    try {

        const url = process.env.BACKEND_PATH!
        const reqBody = await req.json();
        const {prop} = reqBody
       
        const callToken = await axios.post(`${url}/telegramclient/${prop}`,reqBody)
        
        return NextResponse.json({data:callToken.data},{status:200})
        
        
    } catch (error) {
        return NextResponse.json({data:null},{status:404})
    }
}