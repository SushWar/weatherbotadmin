import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export default async function handler(req:NextRequest) {
    console.log('Cron job')
    const url = process.env.BACKEND_PATH!
    const infoData = await axios.get(`${url}/telegramclient/info`)
    return NextResponse.json({message:"active"},{status:200})
}