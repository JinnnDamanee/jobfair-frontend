import AuthBg from "@/components/AuthBackground";
import { SignupForm } from "@/components/SignupForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign Up",
};

export default function SignupPage() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-5 lg:px-0">
      <div className="col-span-2">
        <div className="mx-auto flex h-screen w-full flex-col justify-center space-y-8 sm:w-[350px]">
          <h1 className="text-4xl font-semibold tracking-tight">Register</h1>
          <SignupForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Login
            </Link>
          </p>
          {/* <PolicyLinks /> */}
        </div>
      </div>
      <AuthBg />
    </div>
  );
}

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
