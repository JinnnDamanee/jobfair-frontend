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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Company } from "@/types/company";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "id",
    header: () => <div className="">Company ID</div>,
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: () => <div className="">Name</div>,
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "position",
    header: () => <div className="">Position</div>,
    cell: ({ row }) => <div>{row.getValue("position")}</div>,
  },
  {
    accessorKey: "jd",
    header: () => <div className="">Job Description</div>,
    cell: ({ row }) => <div>{row.getValue("jd")}</div>,
  },
  {
    accessorKey: "location",
    header: () => <div className="">Location</div>,
    cell: ({ row }) => <div>{row.getValue("location")}</div>,
  },
  {
    accessorKey: "tel",
    header: () => <div className="">Telephone</div>,
    cell: ({ row }) => <div>{row.getValue("tel")}</div>,
  },
  {
    accessorKey: "image",
    header: () => <div className="">Image</div>,
    cell: ({ row }) => (
      <Image
        height={60}
        width={60}
        src={row.getValue("image")}
        alt={row.getValue("name")}
        className="m-2"
      />
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="">Action</div>,
    cell: ({ row }) => {
      const company = row.original;
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
            <DropdownMenuItem
              onClick={() => {
                window.location.href = `/company/${company.id}`;
              }}
            >
              View Company
            </DropdownMenuItem>
            <DropdownMenuItem
              //TODO: Edit Company
              onClick={() => {}}
            >
              Edit Company
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-primary"
              // TODO: Delete Company
              onClick={() => {}}
            >
              Delete Company
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

type AdminCompanyTableProps = {
  companies: Company[];
};

export default function AdminCompanyTable({
  companies,
}: AdminCompanyTableProps) {
  const table = useReactTable({
    data: companies,
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
