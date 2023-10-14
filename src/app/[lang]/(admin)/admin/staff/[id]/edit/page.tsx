import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb"
import { getStaffProfile } from "../getStaffProfile"
import { EditStaffForm } from "./EditStaffForm"

interface EditStaffProps {
  params: { id: string }
}

export default async function EditStaff({ params }: EditStaffProps) {
  const profile = await getStaffProfile(params.id)
  return (
    <main>
      {/* Breadcrumb */}
      <Breadcrumb className="pb-6">
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin/staff">Staff</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/admin/staff/${params.id}`}>
            {profile?.givenName} {profile?.familyName}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Edit</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <h2 className="pb-6">
        Edit {profile?.givenName} {profile?.familyName}
      </h2>
      <EditStaffForm params={params} profile={profile} />
    </main>
  )
}
