import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectMongo } from "@/src/libs/mongo";
import { Calendar } from "@/src/models/Calendar";
import crypto from "crypto";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectMongo();

  const inviteCode = crypto.randomBytes(4).toString("hex");

  const calendar = await Calendar.create({
    inviteCode,
    members: [
      {
        userId: session.user.email,
        name: session.user.name,
        avatar: session.user.image,
        email: session.user.email,
      },
    ],
  });

  return NextResponse.json({ inviteCode });
}
