import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";
import type { Provider } from "@supabase/gotrue-js/dist/main/lib/types";

interface Credentials {
  email?: string | undefined;
  password?: string | undefined;
  provider?: "bitbucket" | "github" | "gitlab" | "google" | undefined;
}

export const almacenAuth = defineStore({
  id: "user",
  state: () => ({}),
  actions: {
    async handleLogin(credentials: Credentials) {
      try {
        const { error, user } = await supabase.auth.signIn({
          email: credentials.email,
          password: credentials.password,
        });
        if (error) {
          alert("Error logging in: " + error.message);
        }
        // No error throw, but no user detected so send magic link
        if (!error && !user) {
          alert("Check your email for the login link!");
        }
      } catch (error) {
        console.error("Error thrown:", error.message);
        alert(error.error_description || error);
      }
    },

    /*
     * Handles signup provided a valid credentials object.
     */
    async handleSignup(credentials: Credentials) {
      try {
        const { email, password } = credentials;
        // prompt user if they have not filled populated their credentials
        if (!email || !password) {
          alert("Please provide both your email and password.");
          return;
        }
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          alert(error.message);
          console.error(error, error.message);
          return;
        }
        alert("Signup successful, confirmation mail should be sent soon!");
      } catch (err) {
        alert("Fatal error signing up");
        console.error("signup error", err);
      }
    },

    /**
     * Handles signup via Third Party Login.
     * https://supabase.com/docs/guides/auth#third-party-logins
     */
    async handleOAuthLogin(provider: Provider) {
      const { error } = await supabase.auth.signIn({ provider });
      if (error) console.error("Error: ", error.message);
    },

    /**
     * Handles password reset. Will send an email to the given email address.
     */
    async handlePasswordReset() {
      const email = prompt("Please enter your email:");
      if (!email) {
        window.alert("Email address is required.");
      } else {
        const { error } = await supabase.auth.api.resetPasswordForEmail(email);
        if (error) {
          alert("Error: " + error.message);
        } else {
          alert("Password recovery email has been sent.");
        }
      }
    },

    async handleUpdateUser(credentials: Credentials) {
      try {
        const { error } = await supabase.auth.update(credentials);
        if (error) {
          alert("Error updating user info: " + error.message);
        } else {
          alert("Successfully updated user info!");
          window.location.href = "/";
        }
      } catch (error) {
        alert("Error updating user info: " + error.message);
      }
    },

    /**
     * Handles logging a user out of a supabase session
     */
    async handleLogout() {
      console.log("logging out");
      try {
        const { error } = await supabase.auth.signOut();

        if (error) {
          alert("Error signing out");
          console.error("Error", error);
          return;
        }

        alert("You have signed out!");
      } catch (err) {
        alert("Unknown error signing out");
        console.error("Error", err);
      }
    },
  },
});
