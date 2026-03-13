import AppIcons from "@/components/ui/app-icon";
import { getBudgets } from "@/scripts/dataService";
import { supabase } from "@/scripts/supabase";
import { Budget } from "@/types";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";

// NOTE: Need to figure out how to get the selected values into budgetInfo component
export default function Budgets() {

    const router = useRouter();

    const [budgets, setBudgets] = useState<Budget[]>([
        {
            budget_id: "",
            name: "",
            category: "",
            total_amount: 0,
            remaining_amount: 0,
        },
    ]);

    function calculateProgress(total: number, remaining: number): number {
        if (total <= 0) return 0;

        const progress = remaining / total;
        return Math.min(Math.max(progress, 0), 1);
    }

    useEffect(() => {

        async function fetchBudgets() {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) return;

            const fetchedBudgets = await getBudgets(user.id);
            setBudgets(fetchedBudgets);
        }

        fetchBudgets();
    }, []);

    return (
        <>
            <ScrollView style={{ backgroundColor: "#274156" }}>
                    <View style={styles.sectionContainer}>
                        {budgets ? budgets.map((budget, index) => (
                            <Pressable key={index} onPress={() => {router.replace({
                                pathname: "/(modals)/budgetInfo",
                                params: { 
                                    budgetName: budget.name, 
                                    budgetCategory: budget.category as string,
                                    budgetRemainingAmount: budget.remaining_amount,
                                    budgetTotalAmount: budget.total_amount }
                            })}}>
                                <View key={index} style={styles.budgetCard}>
                                    <View style={styles.returnContainer}>
                                        <Text style={styles.budgetTitle}>{budget.name}</Text>
                                        <AppIcons name="selectable" style={{ color: "#274156" }} />
                                    </View>
                                    <Text style={styles.budgetSubtitle}>{budget.category as string}</Text>
                                    <Text style={styles.budgetAmount}>{budget.remaining_amount}</Text>
                                    <Progress.Bar width={275} height={10} color="#274156" unfilledColor="#E0F2E9" progress={
                                        calculateProgress(budget.total_amount, budget.remaining_amount)
                                    } borderColor="#274156" />
                                </View>
                            </Pressable>
                        )) : 
                        null
                        }
                    </View>
            </ScrollView>
                <View style={styles.addBudgetBtnContainer}>
                    <Pressable style={({ pressed }) => [styles.addBudgetBtn, pressed && styles.pressedBtn]} onPress={() => (router.replace("/(modals)/budgetForm"))}>
                        <Text>Add Budget</Text>
                    </Pressable>
                </View>
        </>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        flexDirection: "column",
        paddingInline: 10,
        marginTop: 10,
        marginBottom: 20,
        marginInline: 10,
        zIndex: 10
    },
    
    returnContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    budgetCard: {
        flex: 1,
        flexDirection: "column",
        padding: 20,
        width: "100%",
        backgroundColor: "#E0F2E9",
        borderRadius: 10,
        marginVertical: 10,
        justifyContent: "center"
    },

    budgetTitle: {
        fontWeight: 700,
        fontSize: 20,
        color: "#274156",
    },

    budgetSubtitle: {
        fontWeight: 500,
        fontSize: 16,
        color: "#27415676",
        marginBottom: 15
    },

    budgetAmount: {
        fontWeight: 700,
        fontSize: 18,
        paddingVertical: 10,
        color: "#274156",
    },

    addBudgetBtnContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
        width: "100%",
        zIndex: 20,
        marginTop: 100,
        position: "absolute",
        bottom: 20

    },

    addBudgetBtn: {
        width: "90%",
        backgroundColor: "#E0F2E9",
        color: "#274156",
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 20,
        borderWidth: 1,
        borderColor: "#274156",
    },

    pressedBtn: {
        backgroundColor: "#274156AA",
        color: "#E0F2E9"
    },
})