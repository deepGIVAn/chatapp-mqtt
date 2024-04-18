import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongoDB();
    // const { username } = await req.json();
    const user = await User.find();
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
  }
}
