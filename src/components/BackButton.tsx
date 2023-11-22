"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button variant="outline" onClick={() => router.back()}>
      Back
    </Button>
  );
};

export default BackButton;
