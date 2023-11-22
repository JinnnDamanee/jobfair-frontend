"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCellDate } from "@/lib/utils";
import { type Booking } from "@/types/booking";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import DeleteBookingDialog from "./DeleteBookingDialog";

export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "id",
    header: () => <div className="">Booking ID</div>,
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "bookingDate",
    header: () => <div className="">Booking date</div>,
    cell: ({ row }) => (
      <div>
        <p>{formatCellDate(row)}</p>
      </div>
    ),
  },
  {
    accessorKey: "user",
    header: () => <div className="">User ID</div>,
    cell: ({ row }) => <div>{row.getValue("user")}</div>,
  },
  {
    accessorKey: "company",
    header: () => <div className="">Company ID</div>,
    cell: ({ row }) => <div>{row.getValue("company")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="">Booking at</div>,
    cell: ({ row }) => <div>{<p>{formatCellDate(row)}</p>}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="">Action</div>,
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DeleteBookingDialog bid={id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

type AdminBookingTableProps = {
  bookings: Booking[];
};

export default function AdminBookingTable({
  bookings,
}: AdminBookingTableProps) {
  console.log(bookings);
  const table = useReactTable({
    data: bookings,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  // data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
