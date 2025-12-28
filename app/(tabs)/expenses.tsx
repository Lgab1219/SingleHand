import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { supabase } from "../../scripts/supabase";

export default function Expenses() {

    const router = useRouter();

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
    }, [])

    return (
        <ScrollView style={{ backgroundColor: "#274156" }}>
            <View style={styles.sectionContainer}>
                <Text style={styles.title}>Money spent today</Text>
                <Text style={styles.dailyExpenseValue}>30</Text>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.title}>Money spent this week</Text>
                <Text style={styles.weeklyExpenseValue}>150</Text>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={{ color: "#e0f2e952", textAlign: "center" }}>Hold and drag to add an expense</Text>
                <TouchableHighlight style={styles.addExpense} onPress={() => { router.replace("/(modals)/expenseForm") }}>
                    <Text style={styles.plus}>+</Text>
                </TouchableHighlight>
            </View>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        backgroundColor: '#274156',
        paddingTop: 30,
        marginTop: 30,
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

    plus: {
        fontSize: 40,
        fontWeight: 700,
        marginTop: -10
    }
})