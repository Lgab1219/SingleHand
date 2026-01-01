import { getDailyExpenses, getWeeklyExpenses } from "@/scripts/dataService";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { supabase } from "../../scripts/supabase";

export default function Expenses() {

    const router = useRouter();

    const [expenseSummaryState, setExpenseSummaryState] = useState<ExpenseSummary>({
        dailyTotal: 0,
        weeklyTotal: 0
    });

    // Checks to see if a user is logged in
    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (!session) {
                    router.navigate("/");
                }
            }
        );

        return () => listener.subscription.unsubscribe();
    }, []);

    function getStartOfToday() {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      return now.toISOString();
    }

    function getStartOfWeek() {

      // Get todays's date
      const now = new Date();

      // 0 (Sun) to 6 (Sat)
      const dayOfWeek = now.getDay();

      // Calculate the difference to get the Monday date of the current week
      const diffToMonday = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);

      // Set the date
      const startOfWeek = new Date(now.setDate(diffToMonday));
      startOfWeek.setHours(0, 0, 0, 0);

      return startOfWeek.toISOString();
    }

    // Fetch and calculate daily and weekly expenses
    useEffect(() => {

        // To prevent setting state on unmounted component
        let isMounted = true;

        async function calculateDailyExpense() {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                console.log("Supabase Auth Error: No user logged in");
                router.navigate("/");
                return;
            }

            // Get today's date at 00:00:00
            const today = getStartOfToday();

            // Fetch daily expenses
            const dailyExpense = await getDailyExpenses(today, user.id);

            // Check if component is still mounted before setting state
            if (!isMounted) return;

            const dailyTotal = dailyExpense.reduce(
                (sum, expense) => sum + expense.amount, 0
            );

            setExpenseSummaryState(prev => ({
                ...prev,
                dailyTotal: dailyTotal
            }));
        }

        async function calculateWeeklyExpense() {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                console.log("Supabase Auth Error: No user logged in");
                router.navigate("/");
                return;
            }

            const weekly = getStartOfWeek();

            const weeklyExpense = await getWeeklyExpenses(weekly, user.id);

            if (!isMounted) return;

            const weeklyTotal = weeklyExpense.reduce(
                (sum, expense) => sum + expense.amount, 0
            );

            setExpenseSummaryState(prev => ({
                ...prev,
                weeklyTotal: weeklyTotal
            }));

        }

        calculateDailyExpense();
        calculateWeeklyExpense();
    }, []);


    return (
        <ScrollView style={{ backgroundColor: "#274156" }}>
            <View style={styles.sectionContainer}>
                <Text style={styles.title}>Money spent today</Text>
                <Text style={styles.dailyExpenseValue}>{expenseSummaryState.dailyTotal}</Text>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.title}>Money spent this week</Text>
                <Text style={styles.weeklyExpenseValue}>{expenseSummaryState.weeklyTotal}</Text>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={{ color: "#e0f2e952", textAlign: "center" }}>Hold and drag to add an expense</Text>
                <Pressable style={({ pressed }) => [styles.addExpense, pressed && styles.pressedAddExpense]} onPress={() => { router.replace("/(modals)/expenseForm") }}>
                    <Text style={styles.plus}>+</Text>
                </Pressable>
            </View>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        backgroundColor: '#274156',
        paddingTop: 30,
        marginTop: 40,
        flex: 1,
        alignSelf: "center"
    },

    title: {
        fontSize: 18,
        color: "#E0F2E9",
        alignSelf: "center",
        justifyContent: "center",
        flex: 1,
    },

    dailyExpenseValue: {
        fontSize: 50,
        color: "#E0F2E9",
        alignSelf: "center",
        justifyContent: "center",
        flex: 1,
        paddingVertical: 10,
        fontWeight: 700
    },

    weeklyExpenseValue: {
        fontSize: 40,
        color: "#E0F2E9",
        alignSelf: "center",
        justifyContent: "center",
        flex: 1,
        paddingVertical: 10,
        fontWeight: 700
    },

    addExpense: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginVertical: 20,
        width: 100,
        height: 100,
        backgroundColor: "#E0F2E9",
        borderRadius: 50
    },

    pressedAddExpense: {
        backgroundColor: "#acdacdff"
    },

    plus: {
        fontSize: 40,
        fontWeight: 700,
        marginTop: -10
    }
})

type ExpenseSummary = {
    dailyTotal: number;
    weeklyTotal: number;
}