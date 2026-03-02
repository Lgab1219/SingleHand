import { logOut } from "@/scripts/authService";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Settings() {
    return (
        <ScrollView style={{ backgroundColor: "#274156" }}>
            <View style={styles.sectionContainer}>
                <Pressable onPress={logOut} style={({ pressed }) => [styles.logout, pressed && styles.pressedLogout]}>
                <Text>Logout</Text>
                </Pressable>
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
        alignSelf: "center",
        width: "100%",
    },

    logout: {
        width: "90%",
        backgroundColor: "#E0F2E9",
        color: "#274156",
        paddingVertical: 20,
        marginVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
    },

    pressedLogout: {
        backgroundColor: "#274156AA",
        color: "#E0F2E9"
    },
})