import { logOut } from "@/scripts/authService";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Settings() {
    return (
        <ScrollView style={{ backgroundColor: "#274156" }}>
            <View style={styles.sectionContainer}>
                <Text style={styles.logout} onPress={logOut}>Logout</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        backgroundColor: '#274156',
        paddingVertical: 10,
        marginTop: 30,
        flex: 1,
        alignSelf: "center"
    },

    logout: {
        backgroundColor: "#274156",
        color: "#E0F2E9",
        padding: 15,
        alignItems: "center",
        flex: 1,
        textAlign: "center",
        marginVertical: 50
    },
})