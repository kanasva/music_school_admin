import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb"
import { HiPlus } from "react-icons/hi"
import Link from "next/link"
import { Suspense } from "react"
import { StaffTable } from "./StaffTable"
import { Skeleton } from "@/components/ui/skeleton"

export default function Staff() {
  return (
    <>
      <Breadcrumb className="">
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/admin/staff">Staff</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="flex flex-row items-center justify-between py-6">
        <h2>Staff</h2>
        <Link href="/admin/staff/add">
          <Button>
            <HiPlus />
            <span className="mr-2" />
            Add Staff
          </Button>
        </Link>
      </div>

      <div>
        <Suspense
          fallback={
            <div className="space-y-1">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          }
        >
          <StaffTable />
        </Suspense>
      </div>
    </>
  )
}
