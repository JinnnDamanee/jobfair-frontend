"use client";

import { createCompany } from "@/actions/company";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  CreateCompanyRequestType,
  createCompanyRequestSchema,
} from "@/types/company";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";

interface CreatCompanyFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function CreateCompanyForm({
  className,
  ...props
}: CreatCompanyFormProps) {
  const form = useForm<CreateCompanyRequestType>({
    resolver: zodResolver(createCompanyRequestSchema),
    defaultValues: {
      image: "",
      name: "",
      jd: "",
      location: "",
      position: "",
      tel: "",
    },
  });

  const onSubmit = async (body: CreateCompanyRequestType) => {
    const res = await createCompany({
      image: body.image,
      name: body.name,
      jd: body.jd,
      location: body.location,
      position: body.position,
      tel: body.tel,
    });
    if (!res.success) {
      toast({
        title: "Error",
        description: "Create Company failed.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Create Company success.",
        variant: "success",
      });
    }
    form.reset();
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    autoComplete="name"
                    placeholder="johndoe ltd"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    autoComplete="position"
                    placeholder="Frontend Developer"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    autoComplete="location"
                    placeholder="Bangkok"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Do something" {...field} />
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
                <FormLabel>Telephone</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    autoComplete="tel"
                    placeholder="0851234567"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Image Link</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="https://media.discordapp.net/attachments/..."
                    {...field}
                  />
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
