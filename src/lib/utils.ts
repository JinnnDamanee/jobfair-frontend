import z from "zod";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

export function checkType<T>(schema: z.ZodSchema<T>, data: unknown) {
  return schema.parse(data);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCellDate(row: any) {
  return dayjs(row.getValue("bookingDate")).format("MMM D, YYYY h:mm A");
}
