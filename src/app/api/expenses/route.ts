import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") ?? undefined;
  if (userId) {
    const data = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { expense: { orderBy: [{ createdAt: "asc" }] } },
    });
    return NextResponse.json({ data });
  }
  return NextResponse.json({ message: "401 unauthorized" });
}

export async function POST(req: NextRequest) {
  const { userId, name, amount, type, createdAt } = await req.json();

  const data = await prisma.user.update({
    where: { clerkId: userId },
    data: {
      expense: {
        create: {
          name,
          amount: Number(amount),
          type,
          createdAt,
          new_expense: {
            create: {
              amount: Number(amount),
              createdAt,
            },
          },
        },
      },
    },
  });
  return NextResponse.json({ data });
}

export async function PUT(req: NextRequest) {
  const { userId, id, name } = await req.json();
  const data = await prisma.user.update({
    where: { clerkId: userId },
    data: {
      expense: {
        update: {
          where: { id },
          data: { name },
        },
      },
    },
  });
  return NextResponse.json({ data });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") ?? undefined;
  const data = await prisma.expense.delete({
    where: { id },
  });

  return NextResponse.json({ data });
}
