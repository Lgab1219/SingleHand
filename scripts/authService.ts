import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { supabase } from "./supabase";

WebBrowser.maybeCompleteAuthSession();

export async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (error) {
        console.log("Sign-up Error: ", error);
        return;
    }

    return data;
}

// This currently only works for the web app.
// Need to customize the scheme for the URI to be able to request Google Auth from android
export async function googleSignUp() {

    // Initialize path to navigate after authentication
    const redirectTo = AuthSession.makeRedirectUri();

    // Ask for auth to Google through Supabase Auth
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: redirectTo, // Replacing this later with a custom scheme
        }
    });

    if (error) {
        console.log("Sign in with OAuth Error: ", error)
        return;
    }

    // If auth is successful, keep data and open account session.
    if (data?.url) {
        await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
    }
}