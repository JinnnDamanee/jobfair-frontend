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
import { PopulatedBookingType, type Booking } from "@/types/booking";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import EditBookingDialog from "./EditBookingDialog";
import { Session } from "next-auth";
import DeleteBookingDialog from "./DeleteBookingDialog";
import Image from "next/image";

type AdminBookingTableProps = {
  bookings: PopulatedBookingType[];
  session: Session;
};

export default function AdminBookingTable({
  bookings,
  session,
}: AdminBookingTableProps) {
  console.log(bookings);

  type ShowedBooking = {
    id: string;
    bookingDate: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
    company: {
      id: string;
      name: string;
      position: string;
      image: string;
    };
    createdAt: string;
  };

  const columns: ColumnDef<ShowedBooking>[] = [
    {
      accessorKey: "id",
      header: () => <div className="">Booking ID</div>,
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "userId",
      header: () => <div className="">User ID</div>,
      cell: ({ row }) => {
        return <div>{row.original.user.id}</div>;
      },
    },
    {
      accessorKey: "userName",
      header: () => <div className="">User Name</div>,
      cell: ({ row }) => {
        return <div>{row.original.user.name}</div>;
      },
    },
    {
      accessorKey: "companyImage",
      header: () => <div className="">Company Position</div>,
      cell: ({ row }) => (
        <Image
          height={60}
          width={60}
          src={row.original.company.image}
          alt={row.original.company.name}
          className="m-2"
        />
      ),
    },
    {
      accessorKey: "companyId",
      header: () => <div className="">Company ID</div>,
      cell: ({ row }) => <div>{row.original.company.id}</div>,
    },
    {
      accessorKey: "companyName",
      header: () => <div className="">Company Name</div>,
      cell: ({ row }) => <div>{row.original.company.name}</div>,
    },
    {
      accessorKey: "companyPosition",
      header: () => <div className="">Company Position</div>,
      cell: ({ row }) => <div>{row.original.company.position}</div>,
    },
    {
      accessorKey: "bookingDate",
      header: () => <div className="">Booking date</div>,
      cell: ({ row }) => (
        <div>
          <p>{formatCellDate(row.getValue("bookingDate"))}</p>
        </div>
      ),
    },
    // {
    //   accessorKey: "createdAt",
    //   header: () => <div className="">Booking at</div>,
    //   cell: ({ row }) => (
    //     <div>{<p>{formatCellDate(row.getValue("createdAt"))}</p>}</div>
    //   ),
    // },
    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="">Action</div>,
      cell: ({ row }) => {
        const { id, company } = row.original;
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
              <EditBookingDialog bid={id} cid={company.id} session={session} />
              <DeleteBookingDialog bid={id} />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

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
