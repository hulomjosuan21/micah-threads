"use client";

import { fetchCategoriesWithItemCount } from "@/actions/category-actions";
import {
  DataTable,
  DataTablePagination,
  DataTableToolbar,
} from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { CategoryWithItemCountRow } from "@/types/category";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, Table } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export default function CategorySection() {
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
    ],
    [],
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
            <Button size={"sm"}>
              <Plus size={16} />
              Add Category
            </Button>
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
