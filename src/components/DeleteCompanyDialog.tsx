"use client";

import { deleteCompany } from "@/actions/company";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export default function DeleteCompanyDialog({ cid }: { cid: string }) {
  const router = useRouter();
  const onDelete = async () => {
    const resp = await deleteCompany(cid);
    if (!resp.success) {
      toast({
        title: "Error",
        description: "Failed to delete company",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Successfully deleted company",
        variant: "success",
      });
    }
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <h1 className="text-bold m-1 rounded p-1 text-primary hover:bg-destructive-foreground">
          Delete
        </h1>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Company</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this company?
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={onDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
