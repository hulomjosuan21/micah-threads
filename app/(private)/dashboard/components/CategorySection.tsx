"use client";

import { fetchCategoriesWithItemCount } from "@/actions/category-actions";
import {
  DataTable,
  DataTablePagination,
  DataTableToolbar,
} from "@/components/data-table";
import { Button } from "@/components/ui/button";
import AddCategoryDialogForm from "@/forms/AddCategoryDialogForm";
import { CategoryWithItemCountRow } from "@/types/category";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, Table } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import useDeleteCategory from "@/hooks/useDeleteCategory";
import UpdateCategoryDialogForm from "@/forms/EditCategoryDialogForm";

export default function CategorySection() {
  const { handleDeleteCategory } = useDeleteCategory();
  const [search, setSearch] = useState("");
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories-with-item-count"],
    queryFn: fetchCategoriesWithItemCount,
  });

  const columns = useMemo<ColumnDef<CategoryWithItemCountRow>[]>(
    () => [
      {
        accessorKey: "label",
        header: "Category",
      },
      {
        accessorKey: "itemCount",
        header: "Item Count",
      },
      {
        accessorKey: "actions",
        header: "",
        cell: ({ row }) => {
          const category = row.original;

          return (
            <div className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <UpdateCategoryDialogForm
                    categoryId={category.categoryId}
                    defaultLabel={category.label}
                    trigger={
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        Edit
                      </DropdownMenuItem>
                    }
                  />
                  <DropdownMenuItem
                    className="text-red-400"
                    onSelect={() => handleDeleteCategory(category.categoryId)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [handleDeleteCategory],
  );

  const renderToolbar = useCallback(
    (table: Table<CategoryWithItemCountRow>) => (
      <DataTableToolbar
        table={table}
        searchKey="label"
        value={search}
        onChange={setSearch}
        showColumnVisibilityToggle={false}
        rightActions={
          <>
            <AddCategoryDialogForm />
          </>
        }
      />
    ),
    [search],
  );

  const renderPagination = useCallback(
    (table: Table<CategoryWithItemCountRow>) => (
      <DataTablePagination table={table} />
    ),
    [],
  );

  return (
    <div>
      <DataTable<CategoryWithItemCountRow, unknown>
        columns={columns}
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        toolbar={renderToolbar}
        pagination={renderPagination}
        globalFilter={search}
        onGlobalFilterChange={setSearch}
        globalFilterFn={(row, _, value) => {
          const search = value.toLowerCase();
          const item = row.original;

          return item.label.toLowerCase().includes(search);
        }}
      />
    </div>
  );
}
