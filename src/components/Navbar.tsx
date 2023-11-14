import { Role, type User } from "@/types/user";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import UserAccountNav from "./UserAccountNav";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";

const NavBar = () => {
  const user: User = {
    email: "punnapob.jdk@gmail.com",
    role: Role.ADMIN,
    id: "1",
    name: "Punnapob",
    tel: "0812345678",
  };

  return (
    <header className="container sticky left-0 right-0 top-0 z-50 flex h-16 items-center justify-between bg-background/70 backdrop-blur-xl ">
      <LinkLogo />
      <div className="flex items-center gap-4">
        {/* <TextLink link="/mybooking" text="My Bookings" />
        <TextLink link="/mybooking" text="My Bookings" /> */}
        {user ? (
          <div className="flex items-center gap-4 text-sm">
            {user.role === Role.ADMIN && <AdminPanelDropdown />}
            <UserAccountNav user={user} />
          </div>
        ) : (
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link
              className="text-foreground transition-colors hover:text-foreground/90"
              href="/login"
            >
              Login
            </Link>
            <Button variant="outline" size="sm">
              Sign up
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;

const LinkLogo = () => {
  return (
    <Link
      href="/"
      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      <Image src="/chula.svg" alt="Logo" height={0} width={80} />
    </Link>
  );
};

const Search = () => {
  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
      />
    </div>
  );
};

const AdminPanelDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full ring-offset-background focus-visible:outline-none ">
        <div className="flex items-center gap-2">
          <p>Admin Management</p>
          <ChevronDown className="h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex w-[12rem] flex-col space-y-1 leading-none">
            <p className="font-medium">Admin Management</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/admin/booking">Manage Bookings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/admin/company">Company Information</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};