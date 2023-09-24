import * as React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { HiPlus } from "react-icons/hi";
import Link from "next/link";
import { Suspense } from "react";
import { StaffTable } from "./StaffTable";
import { cn } from "@/lib/utils";

export default function Staff() {
  return (
    <>
      <Breadcrumb className="">
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
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
        <Suspense fallback={<p>Loading...</p>}>
          <StaffTable />
        </Suspense>
      </div>
    </>
  );
}
