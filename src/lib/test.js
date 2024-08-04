const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getData = async () => {
  const income = await prisma.income.findMany({
    where: { userId: "24e75405-40d1-4c74-b0ed-456340414c92" },
    orderBy: [
      {
        createdAt: "asc",
      },
    ],
  });
  const incomeWithCalculatedField = income.map((item) => ({
    name: item.name,
    income: item.amount,
    createdAt: item.createdAt,
  }));

  const expenses = await prisma.expense.findMany({
    where: { userId: "24e75405-40d1-4c74-b0ed-456340414c92" },
    orderBy: [
      {
        createdAt: "asc",
      },
    ],
  });
  const expensesWithCalculatedField = expenses.map((item) => ({
    name: item.name,
    expenses: item.amount,
    createdAt: item.createdAt,
  }));

  const combinedArray = [
    ...incomeWithCalculatedField,
    ...expensesWithCalculatedField,
  ];
  const sortedArray = combinedArray.sort((a, b) => a.createdAt - b.createdAt);
  console.log(sortedArray);
};

getData();
