"use client";
import { fetchInventoryItems } from "@/actions/item-actions";
import {
  DataTable,
  DataTablePagination,
  DataTableToolbar,
} from "@/components/data-table";
import AppContent from "@/components/layout/app-content";

import AddItemDialogForm from "@/forms/AddItemDialogForm";
import { cn, formatPostgresDateTime } from "@/lib/utils";
import { Item, ItemRow } from "@/types/item";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, Table } from "@tanstack/react-table";
import Image from "next/image";
import {
  SetStateAction,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getItemImageUrl } from "@/lib/supabase/utils/image-url";

interface SlidingImageProps {
  images: string[];
  interval?: number;
  size?: number;
  className?: string;
}

export function SlidingImage({
  images,
  interval = 2500,
  size = 48,
  className,
}: SlidingImageProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  if (!images || images.length === 0) {
    return (
      <div
        style={{ width: size, height: size }}
        className="flex items-center justify-center bg-muted text-xs rounded-md"
      >
        NA
      </div>
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className={cn("relative overflow-hidden rounded-md", className)}
    >
      <Image
        key={images[index]}
        src={getItemImageUrl(images[index])}
        alt="image"
        fill
        sizes={`${size}px`}
        className="object-cover transition-opacity duration-500 ease-in-out"
        priority={false}
      />
    </div>
  );
}

export default function ItemsPage() {
  const [search, setSearch] = useState("");
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["inventory-items"],
    queryFn: fetchInventoryItems,
  });

  const columns = useMemo<ColumnDef<ItemRow>[]>(
    () => [
      {
        accessorKey: "itemName",
        header: "Item",
        cell: ({ row, getValue }) => {
          const images = row.original.imagesPaths;
          const description = row.original.description;

          return (
            <div className="flex items-center space-x-2">
              <SlidingImage images={images} size={24} />
              <div className="flex flex-col">
                <span className="font-medium">{getValue<string>()}</span>
                <span className="text-muted-foreground font-xs">
                  {description}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "category.label",
        header: "Category",
      },
      {
        accessorKey: "variantLabel",
        header: "Variant",
      },
      {
        accessorKey: "itemCode",
        header: "Item Code",
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ getValue }) =>
          `${getValue<number>().toLocaleString("en-PH", { style: "currency", currency: "PHP" })}`,
      },
      {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ getValue }) => getValue<number>().toLocaleString() + " pcs",
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ getValue }) => formatPostgresDateTime(getValue<string>()),
      },
    ],
    [],
  );

  const renderToolbar = useCallback(
    (table: Table<ItemRow>) => (
      <DataTableToolbar
        table={table}
        searchKey="itemName"
        value={search}
        onChange={setSearch}
      />
    ),
    [search],
  );

  const renderPagination = useCallback(
    (table: Table<ItemRow>) => <DataTablePagination table={table} />,
    [],
  );

  return (
    <AppContent
      title={"Items"}
      description={"Your current listed items"}
      actions={
        <>
          <AddItemDialogForm />
        </>
      }
    >
      <DataTable<ItemRow, unknown>
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

          return item.itemCode.toLowerCase().includes(search);
        }}
      />
    </AppContent>
  );
}
