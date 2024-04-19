import { NextResponse } from "next/server";
import mqtt from "mqtt";
import { connectMongoDB } from "@/lib/mongodb";
import Chat from "@/models/chat.model";

function con(id1, id2) {
  return [...id1.split(""), ...id2.split("")].sort().join("");
}

export async function POST(req) {
  const client = mqtt.connect("mqtt://broker.hivemq.com");
  let result;
  try {
    await connectMongoDB();
    const { from, to, message } = await req.json();
    const topic = con(from, to);

    client.on("connect", async () => {
      client.subscribe(topic);
      client.publish(topic, message);
    });

    client.on("message", async (topic, message) => {
      let data = {
        topic: topic.toString(),
        message: message.toString(),
        from: from,
        to: to,
      };
      result = await Chat.create(data);
      // result = message.toString();
      client.end();
      // console.log(result);
    });
    return NextResponse.json({ message: "Message Sent" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
