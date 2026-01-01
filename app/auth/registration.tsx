import { googleSignUp, signUp } from "@/scripts/authService";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import * as z from "zod";
import { User } from "../../types";

export default function Registration() {

    // Catches state from the user's registration values
    const [input, setInput] = useState<User>({
        email: "",
        password: "",
        confirm_password: ""
    });

    const [errorMessage, setErrorMessage] = useState<string>("");

    // "keyof" takes all properties of User.
    // Key "extends" makes sure that the value "Key" provided by the user is in the "User"
    function updateInput<Key extends keyof User>(key: Key, value: User[Key]) {
        setInput(prev => ({
            ...prev,
            [key]: value,
        }));
    }

    function handleSubmit() {
        // Destructure registration input values
        const { email, password, confirm_password } = input;

        validateInput(email, password, confirm_password);
    }

    async function validateInput(email: User["email"], password: User["password"], cf_password: User["confirm_password"]) {
        
        // Defining registration schema for validation
        const validation = z.object({
            email: z.email(),
            password: z.string()
            .min(8, "Your password must contain at least 8 characters")
            .regex(/[a-z]/, "Password must contain a lowercase letter")
            .regex(/[A-Z]/, "Password must contain an uppercase letter")
            .regex(/[0-9]/, "Password must contain a number")
            .regex(/[^A-Za-z0-9]/, "Password must contain a symbol"),
            confirm_password: z.string()
        }).refine(data => data.password === data.confirm_password, // Check passwords
            {
                message: "Passwords do not match",
                path: ["confirm_password"]
            }
        ).safeParse({
            email: email,
            password: password,
            confirm_password: cf_password
        });

        // Error messages from Zod validation.
        if (!validation.success) {
            setErrorMessage(validation.error.issues[0].message);
            return;
        }

        // Error messages from Supabase
        const error = await signUp(input.email, input.password);

        if (error) {
            setErrorMessage(error);
        }
    }

    return (
        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Sign Up</Text>
            </View>

            <View style={styles.signUpContainer}>
                <TouchableHighlight style={styles.googleSignUp} underlayColor={"#272838"}
                onPress={googleSignUp}>
                    <Text>Sign up with Google</Text>
                </TouchableHighlight>
            </View>

            <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={{ marginVertical: 10, paddingInline: 20 }}>OR</Text>
                <View style={styles.divider} />
            </View>

            <View style={styles.signUpContainer}>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <View style={styles.inputContainer}>
                    <Text>Email</Text>
                    <TextInput style={styles.inputBar} 
                    onChangeText={text => updateInput("email", text)} />
                </View>

                <View style={styles.inputContainer}>
                    <Text>Password</Text>
                    <TextInput style={styles.inputBar} textContentType="password"
                    secureTextEntry={true} onChangeText={text => updateInput("password", text)} />
                </View>

                <View style={styles.inputContainer}>
                    <Text>Confirm Password</Text>
                    <TextInput style={styles.inputBar} textContentType="password"
                    secureTextEntry={true} onChangeText={text => updateInput("confirm_password", text)} />
                </View>

                <View style={styles.manualSignUpContainer}>
                    <TouchableHighlight style={styles.manualSignUp} 
                    underlayColor={"#E0F2E9"}
                    onPress={handleSubmit}
                    >
                        <Text style={{ color: "#E0F2E9" }}>Sign Up</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        backgroundColor: '#E0F2E9',
        padding: 20,
        marginVertical: 20
    },

    title: {
        fontSize: 30,
        fontWeight: 600,
        color: "#272838",
        alignSelf: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "column"
    },

    signUpContainer: {
        paddingInline: 20,
        paddingVertical: 20,
        flex: 1,
        flexDirection: "column",
        alignSelf: "center"
    },

    googleSignUp: {
        borderWidth: 1,
        backgroundColor: '#E0F2E9',
        padding: 15,
        borderRadius: 10,
        width: 250,
        alignItems: "center"
    },

    dividerContainer: {
        flex: 1,
        flexDirection: "row"
    },

    divider: {
        flex: 1,
        height: 2,
        marginVertical: 20,
        backgroundColor: "#272838"
    },

    inputContainer: {
        display: "flex",
        flexDirection: "column"
    },

    inputBar: {
        marginVertical: 5,
        padding: 5,
        height: 35,
        width: 300,
        borderWidth: 1,
        borderColor: "#274156"
    },

    manualSignUp: {
        backgroundColor: "#274156",
        padding: 15,
        borderRadius: 10,
        width: 250,
        alignItems: "center"
    },

    manualSignUpContainer: {
        flex: 1,
        flexDirection: "column",
        padding: 10,
        alignItems: "center"
    },

    errorMessage: {
        paddingVertical: 10,
        color: "red"
    }
});