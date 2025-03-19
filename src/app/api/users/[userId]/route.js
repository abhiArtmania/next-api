import { UserList } from "@/util/db";
import { NextResponse } from "next/server";

export function GET(request,content) {
    const userId = content.params.userId;
    const userDetail = UserList.find((user)=>user.id == userId)
    return NextResponse.json(userDetail || 'No Result Found', { status: 200 });
}

export async function PUT(request,content){
    const payload = await request.json()
    payload.id = content.params.userId
    if(!payload.email){
        return NextResponse.json({message:'Invalid user id'},{status:400})
    }
    return NextResponse.json({data:payload,message:'User updated!'},{status:200})
}

export function DELETE(request,content){
    const userId = content.params.userId;
    if(userId){
        return NextResponse.json({message:'User deleted successfully',success:true},{status:200})
    } else {
        return NextResponse.json({message:'Invalid User',success:false},{status:400})
    }
}