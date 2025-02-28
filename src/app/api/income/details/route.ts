import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") ?? undefined;
  const income = await prisma.income.findUnique({
    where: { id },
  });
  const data = await prisma.newIncome.findMany({
    where: { incomeId: id },
    orderBy: [{ createdAt: "asc" }],
  });

  return NextResponse.json({ data: { ...income, new_income: data } });
}

export async function POST(req: NextRequest) {
  const { id, amount, createdAt } = await req.json();
  const findIncomeItem = await prisma.income.findUnique({
    where: { id },
  });
  const data = await prisma.income.update({
    where: { id },
    data: {
      amount: (findIncomeItem?.amount ?? 0) + Number(amount),
      updatedAt: createdAt,
      new_income: {
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
  const { id, new_income_id, amount, createdAt } = await req.json();

  const checkAddOrSubtract = async () => {
    const oldAmount = await prisma.newIncome.findUnique({
      where: {
        id: new_income_id,
      },
    });

    if (oldAmount?.amount) {
      if (Number(oldAmount.amount) > Number(amount)) {
        return (
          (findIncomeItem?.amount ?? 0) -
          (Number(oldAmount.amount) - Number(amount))
        );
      } else if (Number(oldAmount.amount) < Number(amount)) {
        return (
          (findIncomeItem?.amount ?? 0) -
          Number(oldAmount.amount) +
          Number(amount)
        );
      } else {
        return undefined;
      }
    }
  };
  const findIncomeItem = await prisma.income.findUnique({
    where: { id },
  });

  const data = await prisma.income.update({
    where: { id },
    data: {
      amount: await checkAddOrSubtract(),
      new_income: {
        update: {
          where: {
            id: new_income_id,
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
  const new_income_id = searchParams.get("new_income_id") ?? undefined;
  const findIncomeItem = await prisma.income.findUnique({
    where: { id },
  });
  const findNewIncomeItem = await prisma.newIncome.findUnique({
    where: { id: new_income_id },
  });
  const data = await prisma.income.update({
    where: { id },
    data: {
      amount: (findIncomeItem?.amount ?? 0) - (findNewIncomeItem?.amount ?? 0),

      new_income: {
        delete: { id: new_income_id },
      },
    },
  });

  return NextResponse.json({ data });
}
