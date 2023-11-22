"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "./ui/use-toast";
import { signupReqSchema, SignupReqType } from "@/types/auth";
import { useRouter } from "next/navigation";
import Route from "@/lib/route";
import { signup } from "@/actions/auth";
import { revalidatePath } from "next/cache";

interface SignupFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignupForm({ className, ...props }: SignupFormProps) {
  const router = useRouter();
  const form = useForm<SignupReqType>({
    resolver: zodResolver(signupReqSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      tel: "",
    },
  });

  const onSubmit = async ({ email, password, name, tel }: SignupReqType) => {
    const res = await signup({
      email,
      password,
      name,
      tel,
    });
    if (!res.success) {
      toast({
        title: "Error",
        description: "Signup failed.",
        variant: "success",
        duration: 5000,
      });
    } else {
      toast({
        title: "Success",
        description: "Signup successful.",
        variant: "success",
      });
      setTimeout(() => {
        router.push(Route.LOGIN);
        revalidatePath(Route.LOGIN);
      }, 1000);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="johndoe@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="name"
                    autoComplete="name"
                    placeholder="johndoe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telephone number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    autoComplete="tel"
                    placeholder="0621234567"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
