import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const url = process.env.BACKEND_PATH!;
    const userData = await axios.post(`${url}/admin/provider`, reqBody);
    const msg = userData.data.login
    return NextResponse.json({ msg }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: null }, { status: 404 });
  }
}