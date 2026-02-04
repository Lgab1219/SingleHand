import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Budgets() {

    const router = useRouter();

    return (
        <>
            <ScrollView style={{ backgroundColor: "#274156" }}>
                <View style={styles.addBudgetBtnContainer}>
                    <Pressable style={({ pressed }) => [styles.addBudgetBtn, pressed && styles.pressedBtn]} onPress={() => (router.replace("/(modals)/budgetForm"))}>
                        <Text>Add Budget</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    addBudgetBtnContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
        width: "100%",
        position: "absolute",
        top: 590,
    },

    addBudgetBtn: {
        width: "90%",
        backgroundColor: "#E0F2E9",
        color: "#274156",
        paddingVertical: 20,
        marginVertical: 20,
        alignItems: "center",
        justifyContent: "center",
    },

    pressedBtn: {
        backgroundColor: "#274156AA",
        color: "#E0F2E9"
    },
})