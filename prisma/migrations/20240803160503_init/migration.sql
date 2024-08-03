-- DropForeignKey
ALTER TABLE "NewExpense" DROP CONSTRAINT "NewExpense_expenseId_fkey";

-- DropForeignKey
ALTER TABLE "NewIncome" DROP CONSTRAINT "NewIncome_incomeId_fkey";

-- AddForeignKey
ALTER TABLE "NewIncome" ADD CONSTRAINT "NewIncome_incomeId_fkey" FOREIGN KEY ("incomeId") REFERENCES "Income"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewExpense" ADD CONSTRAINT "NewExpense_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;
