import { connectionStr } from "@/lib/db";
import { Product } from "@/lib/model/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request){
    try{
        await mongoose.connect(connectionStr)
        const data = await Product.find()
        return NextResponse.json({data, success:true},{status:200})
    } catch(error){
        return NextResponse.json({success:false,db_error:error},{status:500})
    }
}

export async function POST(request,content){
    try{
        await mongoose.connect(connectionStr)
        const payload = await request.json()
        const product = new Product(payload)
        const result = await product.save();
        return NextResponse.json({result,success:true},{status:200})
    } catch(error){
        return NextResponse.json({result,success:false},{status:500})
    }
}