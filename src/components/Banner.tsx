import Image from "next/image";
import { Button } from "./ui/button";

export default function Banner() {
  return (
    <div className="via- container relative flex justify-between bg-gradient-to-tl from-[#FD6E7A] via-primary-foreground via-40% to-transparent to-60%">
      <div className="z-20 flex-col py-[60px]">
        <h1 className="text-[24px]">Get your Dream Jobs at</h1>
        <h1 className="text-[80px] font-bold text-primary">CP Job Fair</h1>
        <p className="w-[440px]">
          Lorem ipsum dolor sit amet consectetur. Elit hac arcu quam lectus
          viverra. Accumsan malesuada non orci purus eu malesuada ullamcorper
        </p>
        <div className="mt-4 space-x-4">
          <Button variant="outline">Register</Button>
          <Button>Find Now</Button>
        </div>
      </div>
      <div className="relative w-[600px]">
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
