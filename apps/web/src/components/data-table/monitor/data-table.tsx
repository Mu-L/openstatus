"use client";

import type {
  ColumnDef,
  ColumnFiltersState,
  Table as TTable,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { z } from "zod";

import { selectMonitorTagSchema } from "@openstatus/db/src/schema";
import type { MonitorTag } from "@openstatus/db/src/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@openstatus/ui";

import { DataTableToolbar } from "./data-table-toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tags?: MonitorTag[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  tags,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    // getFacetedUniqueValues: getFacetedUniqueValues(),
    // REMINDER: We cannot use the default getFacetedUniqueValues as it doesnt support Array of Objects
    getFacetedUniqueValues: (_table: TTable<TData>, columnId: string) => () => {
      const map = new Map();
      if (columnId === "tags") {
        if (tags) {
          for (const tag of tags) {
            const tagsNumber = data.reduce((prev, curr) => {
              const values = z
                .object({ tags: z.array(selectMonitorTagSchema) })
                .safeParse(curr);
              if (!values.success) return prev;
              if (values.data.tags?.find((t) => t.name === tag.name))
                return prev + 1;
              return prev;
            }, 0);
            map.set(tag.name, tagsNumber);
          }
        }
      }
      return map;
    },
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} tags={tags} />
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
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
                  data-state={row.getIsSelected() && "selected"}
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
