"use server";

import { getServerSession } from "@/app/api/auth/[...nextauth]/route";
import {
  Company,
  CreateCompanyRequestType,
  DeleteCompanyResponseType,
  GetAllCompanyResponseType,
  UpdateCompanyRequestType,
} from "@/types/company";
import { Role } from "@/types/user";
import { revalidateTag } from "next/cache";

export const getAllCompany = async (
  word?: string,
): Promise<GetAllCompanyResponseType> => {
  const path = word ? `/companies?word=${word.trim()}` : "/companies";

  const resp = await fetch(`${process.env.BASE_BACKEND_URL}${path}`, {
    next: {
      tags: ["company"],
    },
  });
  const data = await resp.json();
  return data;
};

export const getCompanyById = async (companyId: string): Promise<Company> => {
  const path = `/companies/${companyId}`;
  const resp = await fetch(`${process.env.BASE_BACKEND_URL}${path}`, {
    next: {
      tags: ["company"],
    },
  });
  const data = await resp.json();
  return data.data;
};

export const createCompany = async ({
  image,
  jd,
  location,
  name,
  position,
  tel,
}: CreateCompanyRequestType) => {
  const sess = await getServerSession();
  if (!sess || sess.user.role !== Role.ADMIN) return;
  const res = await fetch(`${process.env.BASE_BACKEND_URL}/companies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sess?.user.token}`,
    },
    body: JSON.stringify({
      image,
      jd,
      location,
      name,
      position,
      tel,
    }),
  });
  const data = await res.json();
  revalidateTag("company");
  return data;
};

export const updateCompany = async ({
  id,
  image,
  jd,
  location,
  name,
  position,
  tel,
}: UpdateCompanyRequestType) => {
  console.log("update");
  const sess = await getServerSession();
  if (!sess || sess.user.role !== Role.ADMIN) {
    throw new Error("Unauthorized");
  }
  const res = await fetch(`${process.env.BASE_BACKEND_URL}/companies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sess?.user.token}`,
    },
    body: JSON.stringify({
      image,
      jd,
      location,
      name,
      position,
      tel,
    }),
  });
  const data = await res.json();
  revalidateTag("company");
  return data;
};

export const deleteCompany = async (
  id: string,
): Promise<DeleteCompanyResponseType> => {
  const sess = await getServerSession();
  if (!sess || sess.user.role !== Role.ADMIN) {
    throw new Error("Unauthorized");
  }
  const res = await fetch(`${process.env.BASE_BACKEND_URL}/companies/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${sess?.user.token}`,
    },
  });
  const data = await res.json();
  revalidateTag("company");
  return data;
};
