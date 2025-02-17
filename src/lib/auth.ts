import { create } from "zustand";
import { supabase } from "./db";

interface User {
  id: string;
  email: string;
  role: "user" | "admin";
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  signup: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;

    if (data.user) {
      // Create a profile for the new user
      // Check if this is the admin email
      const role = email === "admin@example.com" ? "admin" : "user";
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([{ id: data.user.id, email: data.user.email, role }]);

      if (profileError) throw profileError;

      set({
        user: {
          id: data.user.id,
          email: data.user.email!,
          role: "user",
        },
        isAuthenticated: true,
      });
    }
  },
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profile) {
        set({
          user: {
            id: data.user.id,
            email: data.user.email!,
            role: profile.role as "user" | "admin",
          },
          isAuthenticated: true,
        });
      }
    }
  },
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, isAuthenticated: false });
  },
}));

// Initialize auth state from session
supabase.auth.getSession().then(async ({ data: { session } }) => {
  if (session?.user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (profile) {
      useAuth.setState({
        user: {
          id: session.user.id,
          email: session.user.email!,
          role: profile.role as "user" | "admin",
        },
        isAuthenticated: true,
      });
    }
  }
});

// Listen for auth changes
supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === "SIGNED_IN" && session?.user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (profile) {
      useAuth.setState({
        user: {
          id: session.user.id,
          email: session.user.email!,
          role: profile.role as "user" | "admin",
        },
        isAuthenticated: true,
      });
    }
  } else if (event === "SIGNED_OUT") {
    useAuth.setState({ user: null, isAuthenticated: false });
  }
});
