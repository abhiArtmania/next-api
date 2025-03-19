import { NextResponse } from "next/server";

export async function GET(request,content){
    const studentDetails = content.params.student
    const [id, name, age] = studentDetails
    return NextResponse.json({studentDetails ,message:'Data fetched successfully'})
}