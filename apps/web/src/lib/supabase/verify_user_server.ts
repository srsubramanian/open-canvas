import { Session, User } from "@supabase/supabase-js";
// import { createClient } from "./server";

export async function verifyUserAuthenticated(): Promise<
  { user: User; session: Session } | undefined
> {
  // Return mock user for authentication bypass
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

  const mockSession: Session = {
    access_token: "mock-access-token",
    token_type: "bearer",
    expires_in: 3600,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    refresh_token: "mock-refresh-token",
    user: mockUser,
  };

  return { user: mockUser, session: mockSession };
  
  // Original authentication code
  // const supabase = createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
  // if (!user || !session) {
  //   return undefined;
  // }
  // return { user, session };
}
