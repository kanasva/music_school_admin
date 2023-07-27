"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type staff = {
	id: string | number
	// name: number
	// phone: string
	email: string
}

export const columns: ColumnDef<staff>[] = [
	// {
	// 	accessorKey: "name",
	// 	header: "Name",
	// },
	// {
	// 	accessorKey: "phone",
	// 	header: "Phone",
	// },
	{
		accessorKey: "email",
		header: "Email",
	},

]