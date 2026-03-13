import AppIcons from "@/components/ui/app-icon";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

// NOTE: Next task would be to add edit & delete features for each budget
export default function BudgetInfo() {

    const router = useRouter();

    // Load parameters via router
    const { budgetName } = useLocalSearchParams();

    return (

        <ScrollView style={{ backgroundColor: "#274156" }}>
            <View style={styles.returnContainer}>
                <Pressable onPress={() => {router.replace("/(tabs)/budgets")}}>
                    <AppIcons name="left" size={30} style={{ color: "#E0F2E9" }} />
                </Pressable>
            </View>
            <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>{budgetName}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    returnContainer: {
        flex: 1,
        alignSelf: "flex-end",
        paddingInline: 25,
        paddingVertical: 20,
    },

    sectionTitle: {
        fontWeight: 700,
        fontSize: 30,
        color: "#E0F2E9",
        flex: 1,
        textAlign: "center",
        zIndex: 10
    },

    sectionTitleContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingInline: 20,
    },
})