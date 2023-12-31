"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export type staff = {
  id: string | number
  name: string
  phone: string
  email: string
}

export const columns: ColumnDef<staff>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => (
      <Link href={`/admin/staff/${info.row.original.id}`}>
        {info.getValue() as string}
      </Link>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
]
