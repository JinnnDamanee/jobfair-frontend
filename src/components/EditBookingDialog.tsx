"use client";

import { Session } from "next-auth";
import { useState } from "react";
import { BookingForm } from "./BookingForm";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

type EditBookingDialogProps = {
  bid: string;
  cid: string;
  session: Session;
};

export default function EditBookingDialog({
  bid,
  cid,
  session,
}: EditBookingDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog
      open={open}
      onOpenChange={(value: boolean) => {
        setOpen(value);
      }}
    >
      <DialogTrigger asChild>
        <h1 className="text-bold m-1 rounded p-1 hover:bg-destructive-foreground">
          Edit
        </h1>
      </DialogTrigger>

      <DialogContent>
        <BookingForm
          companyId={cid}
          setOpen={setOpen}
          purpose="update"
          session={session}
          editBookingId={bid}
        />
      </DialogContent>
    </Dialog>
  );
}
