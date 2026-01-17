import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectMongo } from "@/src/libs/mongo";
import CalendarRoom from "@/src/models/CalendarRoom";

export async function POST() {
  await connectMongo();

  const code = crypto.randomBytes(6).toString("hex");

  await CalendarRoom.create({
    code,
    members: [],
    createdAt: new Date(),
  });

  return NextResponse.json({
    inviteLink: `${process.env.NEXT_PUBLIC_BASE_URL}/calendar/invite?code=${code}`,
  });
}
