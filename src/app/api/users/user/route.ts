import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){
    console.log(request)

    try {
        console.log("request received")
        const userId = await getDataFromToken(request);
        console.log("Id gotten")
        const user = await User.findOne({_id: userId}).select("-password");
        console.log("user found")
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}