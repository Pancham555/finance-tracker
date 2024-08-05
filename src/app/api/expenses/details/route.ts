import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") ?? undefined;
  const expense = await prisma.expense.findUnique({
    where: { id },
  });
  const data = await prisma.newExpense.findMany({
    where: { expenseId: id },
    orderBy: [{ createdAt: "asc" }],
  });

  return NextResponse.json({ data: { ...expense, new_expense: data } });
}

export async function POST(req: NextRequest) {
  const { id, amount, createdAt } = await req.json();
  const findExpenseItem = await prisma.expense.findUnique({
    where: { id },
  });
  const data = await prisma.expense.update({
    where: { id },
    data: {
      amount: (findExpenseItem?.amount ?? 0) + Number(amount),
      updatedAt: createdAt,
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
  const checkAddOrSubtract = async () => {
    const oldAmount = await prisma.newExpense.findUnique({
      where: {
        id: new_expense_id,
      },
    });

    if (oldAmount?.amount) {
      if (Number(oldAmount.amount) > Number(amount)) {
        return (
          (findExpenseItem?.amount ?? 0) -
          (Number(oldAmount.amount) - Number(amount))
        );
      } else if (Number(oldAmount.amount) < Number(amount)) {
        return (
          (findExpenseItem?.amount ?? 0) -
          Number(oldAmount.amount) +
          Number(amount)
        );
      } else {
        return undefined;
      }
    }
  };

  const findExpenseItem = await prisma.expense.findUnique({
    where: { id },
  });

  const data = await prisma.expense.update({
    where: { id },
    data: {
      amount: await checkAddOrSubtract(),
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
  const findExpenseItem = await prisma.expense.findUnique({
    where: { id },
  });
  const findNewExpenseItem = await prisma.newExpense.findUnique({
    where: { id: new_expense_id },
  });
  const data = await prisma.expense.update({
    where: { id },
    data: {
      amount:
        (findExpenseItem?.amount ?? 0) - (findNewExpenseItem?.amount ?? 0),
      new_expense: {
        delete: { id: new_expense_id },
      },
    },
  });

  return NextResponse.json({ data });
}
