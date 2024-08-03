import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth, currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { userId } = auth();
  const user = await currentUser();
  if (!user || user === null || !user.id || !userId) {
    return NextResponse.json({ message: "Not valid data found" });
  }

  let dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        name: user.fullName,
        email: `${user.primaryEmailAddress?.emailAddress}`,
      },
    });
  }

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`);
}
