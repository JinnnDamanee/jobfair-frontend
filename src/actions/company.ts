"use server";

import { GetAllCompanyResponseType } from "@/types/company";

export const getAllCompany = async (
  word?: string,
): Promise<GetAllCompanyResponseType> => {
  const path = word ? `/companies?word=${word.trim()}` : "/companies";

  const resp = await fetch(`${process.env.BASE_BACKEND_URL}${path}`, {
    next: {
      revalidate: 60,
      tags: ["company"],
    },
  });
  const data = await resp.json();
  return data;
};

export const createCompany = async () => {};

export const updateCompany = async () => {};

export const deleteCompany = async () => {};
