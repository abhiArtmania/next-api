import mongoose from "mongoose";
import { connectionStr } from "@/lib/db"; 
import { Product } from "@/lib/model/product";
import { NextResponse } from "next/server";

export async function PUT(request,content) {
    await mongoose.connect(connectionStr);
    const payload = await request.json();
    const {productId} = await content.params;
    const result = await Product.findByIdAndUpdate({_id:productId},payload)
    return NextResponse.json({success:true,result},{status:200})
}

export async function GET(request,connect){
    await mongoose.connect(connectionStr);
    const {productId} = await connect.params;
    const productDetails = await Product.findById({_id:productId})
    return NextResponse.json({data:productDetails,success:true},{status:200})
}