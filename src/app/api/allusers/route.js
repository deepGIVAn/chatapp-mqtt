import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { _id } = await req.json();
    const user = await User.find({ _id: { $ne: _id } });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
  }
}
