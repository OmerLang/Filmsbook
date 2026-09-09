"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { loginFormData } from "@/components/auth/LoginForm";
import { signupFormData } from "@/components/auth/SignupForm";

export const useLogout = () => {
  const router = useRouter();
  const logout = async () => await authClient.signOut({});
  return { logout };
};

export const useLogin = () => {
  const router = useRouter();
  const login = async ({ email, password }: loginFormData) => {
    return await authClient.signIn.email({
      email,
      password,
    });
  };
  return { login };
};

export const useSignup = () => {
  const router = useRouter();
  const signup = async (signupFormData: signupFormData) => {
    const { firstName, lastName, email, password } = signupFormData;
    return await authClient.signUp.email({
      email,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      password,
    });
  };
  return { signup };
};
