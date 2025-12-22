import { ScrollView, StyleSheet } from "react-native";
import Registration from "./registration";

export default function RootScreen() {
    return (
        <ScrollView style={styles.screen}>
            <Registration />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#E0F2E9"
    }
})