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
    // Iniciar Sesión
    async handleLogin(credentials: Credentials) {
      try {
        const { error, user } = await supabase.auth.signIn({
          email: credentials.email,
          password: credentials.password,
        });
        if (error) {
          alert("Ha ocurrido un error de acceso: " + error.message);
        }
        // No detecta error, pero no detecta el usuario y envía un enlace al correo
        if (!error && !user) {
          alert("¡Revisa tu correo pincha en el enlace!");
        }
      } catch (error: any) {
        console.error("Error detectado:", error.message);
        alert(error.error_description || error);
      } 
    },
    // Registra un nuevo usuario y envía un email para la activación
    async handleSignup(credentials: Credentials) {
      try {
        const { email, password } = credentials;
        // Avisa al usuario si no ha rellenado sus credenciales
        if (!email || !password) {
          alert("Por favor introduce el correo y la contraseña.");
          return;
        }
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          alert(error.message);
          console.error(error, error.message);
          return;
        }
        alert("Registro comprobado, se enviará un email para la activación");
      } catch (err) {
        alert("¡Lo sentimos ha ocurrido un error de inicio!");
        console.error("Error de singin", err);
      }
    },
    // Registra usuarios de terceros Github, Google...
    async handleOAuthLogin(provider: Provider) {
      const { error } = await supabase.auth.signIn({ provider });
      if (error) console.error("Error: ", error.message);
    },
    // Recupera/Actualiza la contraseña de un usuario
    async handlePasswordReset() {
      const email = prompt("Por favor introduce tu correo:");
      if (!email) {
        window.alert("Se necesita el correo electrónico.");
      } else {
        const { error } = await supabase.auth.api.resetPasswordForEmail(email);
        if (error) {
          alert("Error: " + error.message);
        } else {
          alert("Se enviará un correo para restablecer la contraseña.");
        }
      }
    },
    // Actualiza la contraseña del usuario
    async handleUpdateUser(credentials: Credentials) {
      try {
        const { error } = await supabase.auth.update(credentials);
        if (error) {
          alert("Ha ocurrido un error al actualizar la información del usuario: " + error.message);
        } else {
          alert("¡Se ha actualizado la información del usuario!");
          window.location.href = "/";
        }
      } catch (error: any) {
        alert("Ha ocurrido un error actualizando la información del usuario: " + error.message);
      }
    },
    // Finaliza la sesión del usuario
    async handleLogout() {
      console.log("Saliendo");
      try {
        const { error } = await supabase.auth.signOut();

        if (error) {
          alert("Ha ocurrido un error al salir de la sesión");
          console.error("Error", error);
          return;
        }

        alert("¡Has salido de la sesión!");
      } catch (error) {
        alert("Error desconocido al salir de la sesión");
        console.error("Error", error);
      }
    },
  },
});
