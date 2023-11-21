import { Metadata } from "next";
import Link from "next/link";

import AuthBg from "@/components/AuthBackground";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Login",
};

export default function LoginPage() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-5 lg:px-0">
      <div className="col-span-2">
        <div className="mx-auto flex h-screen w-full flex-col justify-center space-y-8 sm:w-[350px]">
          <h1 className="text-4xl font-semibold tracking-tight">Login</h1>
          <LoginForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Do not have an account?{" "}
            <Link
              href="/signup"
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign Up
            </Link>
          </p>
          {/* <PolicyLinks /> */}
        </div>
      </div>
      <AuthBg />
    </div>
  );
}
