// import { createSupabaseClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type UserContentType = {
  getUser: () => Promise<User | undefined>;
  user: User | undefined;
  loading: boolean;
};

const UserContext = createContext<UserContentType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // Mock user for authentication bypass
  const mockUser: User = {
    id: "mock-user-id",
    app_metadata: {},
    user_metadata: {},
    aud: "authenticated",
    created_at: new Date().toISOString(),
    email: "mock@example.com",
    email_confirmed_at: new Date().toISOString(),
    phone: "",
    confirmed_at: new Date().toISOString(),
    last_sign_in_at: new Date().toISOString(),
    role: "authenticated",
    updated_at: new Date().toISOString(),
  };

  const [user] = useState<User>(mockUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // No need to fetch user - using mock user
    // if (user || typeof window === "undefined") return;
    // getUser();
  }, []);

  async function getUser() {
    // Always return mock user
    setLoading(false);
    return mockUser;
    
    // Original authentication code
    // if (user) {
    //   setLoading(false);
    //   return user;
    // }
    // const supabase = createSupabaseClient();
    // const {
    //   data: { user: supabaseUser },
    // } = await supabase.auth.getUser();
    // setUser(supabaseUser || undefined);
    // setLoading(false);
    // return supabaseUser || undefined;
  }

  const contextValue: UserContentType = {
    getUser,
    user,
    loading,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
