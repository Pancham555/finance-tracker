import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id") ?? undefined;
  const date_range: { from: Date; to: Date } =
    JSON.parse(searchParams.get("date_range") ?? "{}") ?? undefined;

  if (userId) {
    const findUserId = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    const totalIncome = await prisma.income.aggregate({
      where: {
        userId: findUserId?.id,
      },
      _sum: { amount: true },
    });

    const totalExpenses = await prisma.expense.aggregate({
      where: { userId: findUserId?.id },
      _sum: { amount: true },
    });

    const netWorth: number =
      Number(totalIncome._sum.amount) - Number(totalExpenses._sum.amount);

    const recentExpenses = await prisma.expense.findMany({
      where: {
        userId: findUserId?.id,
        createdAt: {
          lte: new Date(date_range.to),
          gte: new Date(date_range.from),
        },
      },
      take: 5,
    });

    const income = await prisma.income.findMany({
      where: {
        userId: findUserId?.id,
        createdAt: {
          lte: new Date(date_range.to),
          gte: new Date(date_range.from),
        },
      },
      include: { new_income: true },
      orderBy: [{ createdAt: "asc" }],
    });

    // here

    return NextResponse.json({
      netWorth,
      totalIncome: totalIncome._sum.amount,
      totalExpenses: totalExpenses._sum.amount,

      incomeDirection:
        Number(totalIncome._sum.amount) > Number(totalExpenses._sum.amount)
          ? {
              direction: "up",
              by: netWorth,
            }
          : {
              direction: "down",
              by: netWorth,
            },
      recentExpenses,
      income,
    });
  }
  return NextResponse.json({ message: "401 unauthorized" });
}
