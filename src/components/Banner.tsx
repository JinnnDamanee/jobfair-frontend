"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import Route from "@/lib/route";

export default function Banner() {
  return (
    <div className="container relative flex justify-between bg-gradient-to-tl from-[#FD6E7A] via-primary-foreground via-40% to-transparent to-60%">
      <div className="z-20 flex-col py-[60px] max-[1150px]:px-10">
        <h1 className="text-xl font-medium">Get your Dream Jobs at</h1>
        <h1 className="my-4 text-7xl font-bold text-primary">CP Job Fair</h1>
        <p className="xs:w-full md:w-[440px]">
          Where opportunities meet ambition. Join us for a transformative
          experience connecting top-tier employers with your potential. Your
          future career starts here!
        </p>
        <div className="mt-4 space-x-4">
          <Button variant="outline" asChild>
            <Link href={Route.SIGNUP}>Register</Link>
          </Button>
          <Button
            onClick={() => {
              window.location.href = "#search";
              window.scrollBy(0, -60);
            }}
          >
            Find Now
          </Button>
        </div>
      </div>
      <div className="relative hidden w-[600px] min-[1150px]:flex">
        <Image
          src={"/computer.svg"}
          alt={"computer"}
          fill
          className="absolute z-20 object-cover"
        />
      </div>
    </div>
  );
}
