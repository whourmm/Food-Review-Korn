import { NextResponse } from "next/server";
import { connectMongo } from "@/src/libs/mongo";
import  User  from "@/src/models/User";

export async function GET() {
  await connectMongo();

  const users = await User.find({}, "name avatar email");
  return NextResponse.json(users);
}
