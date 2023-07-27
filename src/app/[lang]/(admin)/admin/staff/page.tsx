import * as React from "react"

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
} from "@/components/ui/breadcrumb"
import { staff, columns } from "./columns"
import { DataTable } from "./data-table"
import { HiPlus } from "react-icons/hi";
import { prisma } from "@/lib/prisma"
import Link from "next/link"


async function getStaff() {
	const staff = await prisma.user.findMany({
		where: {
			role: "ADMIN",
		},
	})
	return staff
}


export default async function Staff() {
	const staff = await getStaff()
	return (
		<main className="w-full">
			<Card className="m-2">
				<Breadcrumb className="px-4 pt-4">
					<BreadcrumbItem>
						<BreadcrumbLink href="/admin">Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbItem isCurrentPage>
						<BreadcrumbLink href="/admin/staff">Staff</BreadcrumbLink>
					</BreadcrumbItem>
				</Breadcrumb>
				<CardHeader className="flex flex-row items-center justify-center">
					<CardTitle className="align-bottom">Staff</CardTitle>
					<Link href="/admin/staff/add-staff" className="ml-auto">
						<Button style={{ marginTop: 0 }}><HiPlus /><span className="mr-2" />Add Staff</Button>
					</Link>
				</CardHeader>
				<CardContent>
					<DataTable columns={columns} data={staff} />
				</CardContent>
			</Card>
		</main >
	)
}