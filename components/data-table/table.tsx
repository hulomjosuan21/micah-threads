"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  RowSelectionState,
  OnChangeFn,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Table as TanStackTable,
  FilterFn,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactNode, useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  loadingDetail?: string;
  isError?: boolean;
  error?: Error | null;
  toolbar?: (table: TanStackTable<TData>) => ReactNode;
  pagination?: (table: TanStackTable<TData>) => ReactNode;

  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;

  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;

  columnVisibility?: VisibilityState;
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>;

  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;

  globalFilterFn?: FilterFn<TData>;
  globalFilter?: string;
  onGlobalFilterChange?: OnChangeFn<string>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  loadingDetail = "Loading...",
  isError,
  error,
  toolbar,
  pagination,
  globalFilter,
  globalFilterFn,
  onGlobalFilterChange,
  sorting: externalSorting,
  onSortingChange: externalOnSortingChange,
  columnFilters: externalColumnFilters,
  onColumnFiltersChange: externalOnColumnFiltersChange,
  columnVisibility: externalColumnVisibility,
  onColumnVisibilityChange: externalOnColumnVisibilityChange,
  rowSelection: externalRowSelection,
  onRowSelectionChange: externalOnRowSelectionChange,
}: DataTableProps<TData, TValue>) {
  const [internalSorting, setInternalSorting] = useState<SortingState>([]);
  const [internalColumnFilters, setInternalColumnFilters] =
    useState<ColumnFiltersState>([]);
  const [internalColumnVisibility, setInternalColumnVisibility] =
    useState<VisibilityState>({});
  const [internalRowSelection, setInternalRowSelection] =
    useState<RowSelectionState>({});
  const sorting = externalSorting ?? internalSorting;
  const columnFilters = externalColumnFilters ?? internalColumnFilters;
  const columnVisibility = externalColumnVisibility ?? internalColumnVisibility;
  const rowSelection = externalRowSelection ?? internalRowSelection;

  const onSortingChange = externalOnSortingChange ?? setInternalSorting;
  const onColumnFiltersChange =
    externalOnColumnFiltersChange ?? setInternalColumnFilters;
  const onColumnVisibilityChange =
    externalOnColumnVisibilityChange ?? setInternalColumnVisibility;
  const onRowSelectionChange =
    externalOnRowSelectionChange ?? setInternalRowSelection;
  const [internalGlobalFilter, setInternalGlobalFilter] = useState<string>("");

  const resolvedGlobalFilter = globalFilter ?? internalGlobalFilter;

  const resolvedOnGlobalFilterChange =
    onGlobalFilterChange ?? setInternalGlobalFilter;

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange,
    onColumnFiltersChange,
    onColumnVisibilityChange,
    onRowSelectionChange,

    onGlobalFilterChange: resolvedOnGlobalFilterChange,
    globalFilterFn,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter: resolvedGlobalFilter,
    },
  });

  return (
    <div className="w-full">
      {toolbar && toolbar(table)}

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-primary/10 ">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="">
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
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {loadingDetail}
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-red-500"
                >
                  {error?.message || "Something went wrong."}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
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

      {pagination && pagination(table)}
    </div>
  );
}
