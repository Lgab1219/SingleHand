import { Option } from "@/types";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import Picker from "../../components/ui/picker";

const categoriesList: Option[] = [
    {id: 1, label: "Food", value: "food"},
    {id: 2, label: "Essentials", value: "essentials"},
    {id: 3, label: "Leisure", value: "leisure"},
    {id: 4, label: "Travel", value: "travel"},
]

export default function ExpenseForm() {

    const router = useRouter();

    const [amount, setAmount] = useState<string>("0.00");
    const [category, setCategory] = useState<Option>({
        id: 0,
        label: "",
        value: ""
    });

    useEffect(() => {
        console.log("Current Category: ", category);
    }, [category]);

    function handleAmount(amount: string) {

        // Makes sure only numbers are allowed in the input
        const cleaned = amount.replace(/[^0-9.]/g, "");

        // Prevents multiple decimals
        if ((cleaned.match(/\./g) || []).length > 1) return;

        setAmount(cleaned);
    }

    function addAmount() {
        const value = parseFloat(amount) || 0;

        setAmount(String(value + 1));
    }

    function subAmount() {
        const value = parseFloat(amount) || 0;

        if (value > 0) {
            setAmount(String(value - 1));
        }
    }

    return (
        <ScrollView style={{ backgroundColor: "#E0F2E9" }}>
            <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Add an expense</Text>
            </View>

            <View style={styles.sectionContainer}>
                <Text>Expense</Text>
                <TextInput style={styles.inputBar} />
            </View>

            <View style={styles.sectionContainer}>
                <Text>Category</Text>
                <Picker optionList={categoriesList} value={category} onSelect={setCategory}  />
            </View>

            <View style={styles.sectionContainer}>
                <Text>Select budget</Text>
                <TextInput style={styles.inputBar} />
            </View>

            <View style={styles.sectionContainer}>
                <Text>Amount</Text>
                <View style={styles.amountContainer}>
                    <TextInput style={styles.amountBar}
                    value={amount}
                    onChangeText={handleAmount}
                    keyboardType="decimal-pad" />
                    <TouchableHighlight style={styles.subButton}
                    onPress={subAmount}><Text>-</Text></TouchableHighlight>
                    <TouchableHighlight style={styles.addButton}
                    onPress={addAmount}><Text style={{ color: "#E0F2E9" }}>+</Text></TouchableHighlight>
                </View>
            </View>

            <View style={styles.submitContainer}>
                <TouchableHighlight style={styles.buttons} onPress={() => {router.replace("/(tabs)/expenses")}}>
                    <Text style={{ color: "#E0F2E9" }}>Cancel</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttons}>
                    <Text style={{ color: "#E0F2E9" }}>Submit</Text>
                </TouchableHighlight>
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

    addButton: {
        width: "20%",
        backgroundColor: "#274156",
        paddingVertical: 18,
        justifyContent: "center",
        alignItems: "center",
    },

    subButton: {
        width: "20%",
        backgroundColor: "#E0F2E9",
        borderWidth: 1,
        borderColor: "#274156",
        paddingVertical: 18,
        justifyContent: "center",
        alignItems: "center",
    },

})