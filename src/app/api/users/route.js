import { UserList } from "@/util/db";
import { NextResponse } from "next/server";

export function GET(request){
    const data = UserList;
    return NextResponse.json(data,{status:200});
}

export async function POST(request){
    const payload = await request.json();
    if(!payload.name || !payload.email || !payload.age){
        return NextResponse.json({message:"Required fields are mendatory!"},{status:400});
    }
    return NextResponse.json({message:"New User Created!"},{status:201});
}