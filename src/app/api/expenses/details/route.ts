import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") ?? undefined;
  const data = await prisma.expense.findUnique({
    where: { id },
    include: { new_expense: true },
  });

  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const { id, amount, createdAt } = await req.json();
  const data = await prisma.expense.update({
    where: { id },
    data: {
      new_expense: {
        create: {
          amount: Number(amount),
          createdAt,
        },
      },
    },
  });

  return NextResponse.json({ data });
}

export async function PUT(req: NextRequest) {
  const { id, new_expense_id, amount, createdAt } = await req.json();
  const data = await prisma.expense.update({
    where: { id },
    data: {
      new_expense: {
        update: {
          where: {
            id: new_expense_id,
          },
          data: {
            amount: Number(amount),
            createdAt,
          },
        },
      },
    },
  });

  return NextResponse.json({ data });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") ?? undefined;
  const new_expense_id = searchParams.get("new_expense_id") ?? undefined;

  const data = await prisma.expense.update({
    where: { id },
    data: {
      new_expense: {
        delete: { id: new_expense_id },
      },
    },
  });

  return NextResponse.json({ data });
}
