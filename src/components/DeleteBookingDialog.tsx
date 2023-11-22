"use client";

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
import { deleteBooking } from "@/actions/booking";

export default function DeleteBookingDialog({ bid }: { bid: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      console.log("Deleting booking with id:", bid);

      // Call the deleteBooking function
      const deleteResult = await deleteBooking(bid);

      // Check the result of the delete operation
      if (deleteResult.success) {
        console.log("Booking deleted successfully");
        // Show a success toast
        toast({
          title: "Booking Deleted",
          description: "The booking has been successfully deleted.",
          variant: "success",
          duration: 5000,
        });
        router.refresh();
      } else {
        console.error("Failed to delete booking:", deleteResult.message);
        // Show an error toast
        toast({
          title: "Error",
          description: `Failed to delete booking: ${deleteResult.message}`,
          variant: "destructive",
          duration: 5000,
        });
        // Handle the case where deletion failed, show an error message, etc.
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      // Show an error toast
      toast({
        title: "Error",
        description: "An error occurred while deleting the booking.",
        variant: "destructive",
        duration: 5000,
      });
    }
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
          <DialogTitle>Delete Booking</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this booking?
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
