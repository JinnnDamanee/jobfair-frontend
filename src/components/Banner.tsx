"use client";

import Image from "next/image";
import { Button } from "./ui/button";

export default function Banner() {
  return (
    <div className="container relative flex justify-between bg-gradient-to-tl from-[#FD6E7A] via-primary-foreground via-40% to-transparent to-60%">
      <div className="z-20 flex-col py-[60px] max-[1150px]:px-10">
        <h1 className="text-[24px]">Get your Dream Jobs at</h1>
        <h1 className="text-[80px] font-bold text-primary">CP Job Fair</h1>
        <p className="w-[440px]">
          Lorem ipsum dolor sit amet consectetur. Elit hac arcu quam lectus
          viverra. Accumsan malesuada non orci purus eu malesuada ullamcorper
        </p>
        <div className="mt-4 space-x-4">
          <Button variant="outline">Register</Button>
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
