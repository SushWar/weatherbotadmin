import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {

    try {

        const url = process.env.BACKEND_PATH!
        const reqBody = await req.json();
        const {prop} = reqBody
       
        const callToken = await axios.post(`${url}/controlbot/${prop}`)
        
        if(callToken.data.token.length > 0){
            return NextResponse.json({data:callToken.data},{status:200})
        }

        return NextResponse.json({data:null},{status:401})
        
    } catch (error) {
        return NextResponse.json({data:null},{status:404})
    }
}