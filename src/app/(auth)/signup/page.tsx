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
      <div className="col-span-2 lg:p-2">
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
