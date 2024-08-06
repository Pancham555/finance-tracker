import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { clerkClient } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const clerkId = searchParams.get("id") ?? undefined;
  const data = await prisma.user.findUnique({
    where: { clerkId },
  });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const { id, name, email } = await req.json();
  const data = await prisma.user.update({
    where: { clerkId: id },
    data: {
      name,
      email,
    },
  });

  return NextResponse.json({ data });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const clerkId = searchParams.get("id");
  console.log("It reached here - delete");

  if (clerkId) {
    const data = await prisma.user.delete({
      where: { clerkId },
    });
    await clerkClient.users.deleteUser(clerkId);
    return NextResponse.json({ data });
  }
  return NextResponse.json({ message: "Id not provided!" });
}
