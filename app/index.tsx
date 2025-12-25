import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { supabase } from "../scripts/supabase";
import Registration from "./registration";

export default function RootScreen() {

    const router = useRouter();

    // Check if there is a change in auth state. If there is, navigate to selected path.
    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (session) {
                    router.replace("/(tabs)/explore");
                }
            }
        );

        return () => listener.subscription.unsubscribe();
    }, []);

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