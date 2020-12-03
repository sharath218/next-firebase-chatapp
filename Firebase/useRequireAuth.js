import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useRouter } from "next/router";
export function useRequireAuth(redirectUrl = "/signin") {
  const auth = useAuth();
  const router = useRouter();
  // If auth.user is false that means we're not
  // logged in and should redirect.
  useEffect(() => {
    if (auth.user === false) {
      router.push(redirectUrl);
    }
  }, [auth]);

  return auth;
}
