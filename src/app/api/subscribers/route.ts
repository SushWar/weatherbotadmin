import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const url = process.env.BACKEND_PATH!;
    const userData = await axios.get(`${url}/controlbot/subscriber`);
    const filterData = userData.data.data;

    return NextResponse.json({ filterData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: null }, { status: 404 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const url = process.env.BACKEND_PATH!;
    const blockUser = await axios.put(`${url}/controlbot/blocksubscriber`, reqBody);
    
    if(blockUser.data.status === 'ok'){
        return NextResponse.json({status:200})
    }

    return NextResponse.json({status:400})
    
  } catch (error) {
    return NextResponse.json({status:404})
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const url = process.env.BACKEND_PATH!;
    const sendMessage = await axios.post(`${url}/controlbot/sendcustommessage`, reqBody);
    
    if(sendMessage.data.sendAll === 'ok'){
        return NextResponse.json({status:200})
    }

    return NextResponse.json({status:400})
    
  } catch (error) {
    return NextResponse.json({status:404})
  }
}
