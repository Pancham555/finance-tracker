import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id") ?? undefined;
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

    const income = await prisma.income.findMany({
      where: {
        userId: findUserId?.id,
      },
      include: { new_income: { orderBy: { createdAt: "asc" } } },
      orderBy: [{ createdAt: "asc" }],
    });
    const expenses = await prisma.expense.findMany({
      where: {
        userId: findUserId?.id,
      },
      include: { new_expense: { orderBy: { createdAt: "asc" } } },
      orderBy: [{ createdAt: "asc" }],
    });

    return NextResponse.json({
      totalIncome: totalIncome._sum.amount,
      totalExpenses: totalExpenses._sum.amount,
      netWorth,
      income,
      expenses,
    });
  }
  return NextResponse.json({ message: "401 unauthorized" });
}
