"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button variant="outline" onClick={() => router.back()}>
      <ChevronLeft className="mr-2 h-4 w-4" /> Back
    </Button>
  );
};

export default BackButton;
