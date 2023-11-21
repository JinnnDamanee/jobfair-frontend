"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type User } from "@/types/user";
import { ChevronDown, UserIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

type UserAccountNavProps = {
  user: User;
};

const UserAccountNav = ({ user }: UserAccountNavProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full ring-offset-background focus-visible:outline-none ">
        <Button variant="outline" asChild>
          <div className="flex items-center gap-2">
            <UserIcon className="h-4 w-4" />
            <p>{user.name}</p>
            <ChevronDown className="h-4 w-4" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex w-[12rem] flex-col space-y-1 leading-none">
            <p className="font-medium">{user.name}</p>
            <p className="w-full truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        {/* ADMIN */}
        {/* {user.role === Role.ADMIN && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/admin/company">Company Information</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/booking">Manage Bookings</Link>
            </DropdownMenuItem>
          </>
        )} */}
        {/* USER */}
        <DropdownMenuItem asChild>
          <Link href="/mybooking">My Bookings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            signOut({
              callbackUrl: "/login",
            });
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
