"use client";

import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { BookingForm } from "./BookingForm";
import { useState } from "react";
import { Session } from "next-auth";

type CreateBookingDialogProps = {
  // bid: string;
  cid: string;
  session: Session;
};

export default function CreateBookingDialog({
  // bid,
  cid,
  session,
}: CreateBookingDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog
      open={open}
      onOpenChange={(value: boolean) => {
        setOpen(value);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="mb-4 bg-black text-white  hover:bg-gray-700"
        >
          <Pencil className="mr-2 h-4 w-4" /> Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <BookingForm
          companyId={cid}
          setOpen={setOpen}
          purpose="create"
          session={session}
          // editBookingId={bid}
        />
      </DialogContent>
    </Dialog>
  );
}
