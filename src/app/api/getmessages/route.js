import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Chat from "@/models/chat.model";

function con(id1, id2) {
  return [...id1.split(""), ...id2.split("")].sort().join("");
}

export async function POST(req) {
  try {
    await connectMongoDB();
    const { from, to } = await req.json();
    const topic = con(from, to);
    const data = await Chat.find({ topic }).populate("from").populate("to");
    // console.log(data);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
