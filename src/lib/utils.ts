import z from "zod";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function checkType<T>(schema: z.ZodSchema<T>, data: unknown) {
  return schema.parse(data);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
