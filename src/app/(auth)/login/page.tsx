import { Metadata } from "next";
import Link from "next/link";

import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Login",
};

export default function LoginPage() {
  return (
    <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-5 lg:px-0">
      <div className="col-span-2 lg:p-2">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <h1 className="text-4xl font-semibold tracking-tight">Login</h1>
          <LoginForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
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
      <BgSide />
    </div>
  );
}

const BgSide = () => {
  return (
    <div className="relative col-span-3 hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-foreground" />
      <div className="relative z-20 flex items-center text-lg font-medium">
        Job Fair 2023
      </div>
    </div>
  );
};

const PolicyLinks = () => {
  return (
    <p className="px-8 text-center text-sm text-muted-foreground">
      By clicking continue, you agree to our{" "}
      <Link
        href="/terms"
        className="underline underline-offset-4 hover:text-primary"
      >
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link
        href="/privacy"
        className="underline underline-offset-4 hover:text-primary"
      >
        Privacy Policy
      </Link>
      .
    </p>
  );
};
