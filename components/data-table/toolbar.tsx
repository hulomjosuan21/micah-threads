"use client";

import { Table } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchKey: string;
  leftActions?: ReactNode;
  rightActions?: ReactNode;
  className?: string;
  value?: string;
  onChange: Dispatch<SetStateAction<string>>;
  showColumnVisibilityToggle?: boolean;
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  leftActions,
  rightActions,
  className,
  value,
  onChange,
  showColumnVisibilityToggle = true,
}: DataTableToolbarProps<TData>) {
  return (
    <div
      className={`flex items-center justify-between py-4 gap-2 ${
        className ?? ""
      }`}
    >
      <div className="flex items-center gap-2">
        <Input
          key={searchKey}
          placeholder={"Search some data..."}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="max-w-sm"
        />
        {leftActions}
      </div>

      <div className="flex items-center gap-2">
        {rightActions}

        {showColumnVisibilityToggle && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size={"sm"}>
                Columns <ChevronDown className="ml-2" size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())
                      .trim()}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
