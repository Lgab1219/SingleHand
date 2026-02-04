import { insertBudget } from "@/scripts/dataService";
import { supabase } from "@/scripts/supabase";
import { Budget, Option } from "@/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Picker from "../../components/ui/picker";

const categoriesList: Option[] = [
    {id: 1, label: "Food", value: "food"},
    {id: 2, label: "Essentials", value: "essentials"},
    {id: 3, label: "Leisure", value: "leisure"},
    {id: 4, label: "Travel", value: "travel"},
]

export default function BudgetForm() {

    const router = useRouter();

    const [amount, setAmount] = useState<string>("0.00");
    const [budget, setBudget] = useState<Budget>({
        name: "",
        category: "",
        amount: 0.00
    })


    function handleAmount(amount: string) {

        // Makes sure only numbers are allowed in the input
        const cleaned = amount.replace(/[^0-9.]/g, "");

        // Prevents multiple decimals
        if ((cleaned.match(/\./g) || []).length > 1) return;

        setAmount(cleaned);
    }

    function addAmount() {
        const fixedNumber = parseFloat(amount) || 0;
        setAmount((fixedNumber + 1).toFixed(2));
    }

    function subAmount() {
        const fixedNumber = parseFloat(amount) || 0;
        if (fixedNumber > 0) {
            setAmount((fixedNumber - 1).toFixed(2));
        }
    }

    function handleInput<Key extends keyof Budget>(key: Key, value: Budget[Key]) {
        setBudget(prev => ({
            ...prev,
            [key]: value,
        }));
    }

    function isBudgetValid(budget: Budget, amount: string): boolean {
        
        if (!budget.name || !budget.category) return false;
        
        const fixedAmount = parseFloat(amount);
        if (isNaN(fixedAmount) || fixedAmount <= 0) return false;

        return true;
    }

    async function handleSubmit() {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            console.log("No user logged in");
            return;
        }

        const finalBudget: Budget = {
            ...budget,
            amount: parseFloat(amount),
        }

        if (!isBudgetValid(finalBudget, amount)) {
            console.log("Invalid budget data");
            return;
        }

        const insertSuccess = await insertBudget(finalBudget, user.id);

        if (!insertSuccess) {
            console.log("Failed to insert budget");
            return;
        }

        router.replace("/(tabs)/budgets");
    }

    return (
        <ScrollView style={{ backgroundColor: "#E0F2E9" }} keyboardShouldPersistTaps="always">
            <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Create a budget</Text>
            </View>

            <View style={styles.sectionContainer}>
                <Text>Budget</Text>
                <TextInput style={styles.inputBar} onChangeText={(text) => (handleInput("name", text))} />
            </View>

            <View style={styles.sectionContainer}>
                <Text>Category</Text>
                <Picker optionList={categoriesList} value={budget.category} onSelect={(text) => {handleInput("category", text.value)}}  />
            </View>

            <View style={styles.sectionContainer}>
                <Text>Amount</Text>
                <View style={styles.amountContainer}>
                    <TextInput style={styles.amountBar}
                    value={amount}
                    onChangeText={handleAmount}
                    keyboardType="decimal-pad" />
                    <Pressable style={({ pressed }) => [styles.subButton, pressed && styles.pressedSubButton]}
                    onPress={subAmount}><Text>-</Text></Pressable>
                    <Pressable style={({ pressed }) => [styles.addButton, pressed && styles.pressedAddButton]}
                    onPress={addAmount}><Text style={{ color: "#E0F2E9" }}>+</Text></Pressable>
                </View>
            </View>

            <View style={styles.submitContainer}>
                <Pressable style={({ pressed }) => [styles.buttons, pressed && styles.pressedButtons]} onPress={() => {router.replace("/(tabs)/budgets")}}>
                    <Text style={{ color: "#E0F2E9" }}>Cancel</Text>
                </Pressable>

                <Pressable style={({ pressed }) => [styles.buttons, pressed && styles.pressedButtons]} onPress={handleSubmit}>
                    <Text style={{ color: "#E0F2E9" }}>Submit</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    sectionTitleContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingInline: 20,
        paddingVertical: 50
    },

    sectionTitle: {
        fontWeight: 700,
        fontSize: 30,
        color: "#274156",
        flex: 1,
        textAlign: "center",
        zIndex: 10
    },

    sectionContainer: {
        flex: 1,
        flexDirection: "column",
        paddingInline: 10,
        marginTop: 10,
        marginBottom: 20,
        marginInline: 10,
        zIndex: 10
    },

    submitContainer: {
        flex: 1,
        flexDirection: "row",
        paddingInline: 10,
        marginVertical: 10,
        justifyContent: "space-between",
        gap: 5
    },

    amountContainer: {
        flex: 1,
        flexDirection: "row",
        paddingInline: 10,
        justifyContent: "space-between",
        gap: 5
    },

    inputBar: {
        height: 50,
        backgroundColor: "#E0F2E9",
        borderWidth: 1,
        borderColor: "#274156",
        marginVertical: 5,
        padding: 10,
        borderRadius: 5,
    },

    amountBar: {
        width: "50%",
        height: 50,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        textAlign: "center",
        marginVertical: 5,
        borderColor: "#274156",
    },

    buttons: {
        width: "50%",
        backgroundColor: "#274156",
        paddingVertical: 20,
        flex: 1,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    },

    pressedButtons: {
        backgroundColor: "#274156AA",
    },

    addButton: {
        width: "20%",
        backgroundColor: "#274156",
        paddingVertical: 18,
        justifyContent: "center",
        alignItems: "center",
    },

    pressedAddButton: { backgroundColor: "#274156AA"},

    subButton: {
        width: "20%",
        backgroundColor: "#E0F2E9",
        borderWidth: 1,
        borderColor: "#274156",
        paddingVertical: 18,
        justifyContent: "center",
        alignItems: "center",
    },
    pressedSubButton: { backgroundColor: "#E0F2E9AA"},
})