"use server";

import { redirect } from "next/navigation";

import { authenticateAdmin } from "@/lib/auth/admin";
import { setAdminSession } from "@/lib/auth/session";

export interface LoginActionState {
  error: string | null;
}

export async function loginAction(
  _previousState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return {
      error: "Email and password are required.",
    };
  }

  const isValid = await authenticateAdmin(email, password);

  if (!isValid) {
    return {
      error: "Invalid credentials.",
    };
  }

  await setAdminSession(email);
  redirect("/admin");
}
