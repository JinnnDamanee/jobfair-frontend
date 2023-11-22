import z from "zod";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function checkType<T>(schema: z.ZodSchema<T>, data: unknown) {
  return schema.parse(data);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCellDate(row: any) {
  return format(new Date(row.getValue("bookingDate")), "MMM dd, yyyy HH:mm");
}
