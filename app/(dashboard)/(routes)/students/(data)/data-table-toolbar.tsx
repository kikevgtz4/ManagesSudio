"use client"
import React, { useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/ui/data-table/data-table-view-options"

import { priorities, statuses } from "./data"
import { DataTableFacetedFilter } from "@/components/ui/data-table/data-table-faceted-filter"
import useAuthModal from "@/hooks/useAuthModel";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const AuthModal = useAuthModal();
  const { user, subscription } = useUser();
  const AddStudentModal = useUploadModal();
  const onClick = () => {
    if (!user) {
      return AuthModal.onOpen();
    }
    return AddStudentModal.onOpen();
  }


  return (
    <div className="flex items-center justify-between">
      <Button
      onClick={onClick}
      className="transition"
      >
        Add Student
      </Button>
      <div className="flex ">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter students..."
          value={(table.getColumn("first_name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("first_name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex pl-2">
        <DataTableViewOptions table={table} />
      </div>
      
      </div>
      </div>
  )
}