import { Budget, Expense } from "@/types";
import { supabase } from "./supabase";

export async function insertExpense(expense: Expense, accountId: string): Promise<boolean> {
    const { error } = await supabase
    .from("expenses_history")
    .insert({
        account_id: accountId,
        title: expense.title,
        category: expense.category,
        budget_type: expense.budgetType,
        amount: expense.amount,
    })
    .select()
    .single();

    if (error) {
        console.log("Supabase Insert Error: ", error);
        return false;
    }

    return true;
}

export async function insertBudget(budget: Budget, accountId: string): Promise<boolean> {
    const { error } = await supabase
    .from("budgets")
    .insert({
        account_id: accountId,
        name: budget.name,
        category: budget.category,
        amount: budget.amount,
    })
    .select()
    .single();

    if (error) {
        console.log("Supabase Insert Error: ", error);
        return false;
    }

    return true;
}

export async function getDailyExpenses(today: string, user_id: string) {
    const { data: dailyExpenses, error: dailyExpensesError } = await supabase
    .from("expenses_history")
    .select("amount")
    .eq("account_id", user_id)
    .gte("created_at", today);

    if (dailyExpensesError) {
        console.log("Supabase Daily Expenses Error: ", dailyExpensesError);
        return [];
    }

    return dailyExpenses;
}

export async function getWeeklyExpenses(week: string, user_id: string) {
    const { data: weeklyExpenses, error: weeklyExpensesError } = await supabase
    .from("expenses_history")
    .select("amount")
    .eq("account_id", user_id)
    .gte("created_at", week);

    if (weeklyExpensesError) {
        console.log("Supabase Weekly Expenses Error: ", weeklyExpensesError);
        return [];
    }

    return weeklyExpenses;
}