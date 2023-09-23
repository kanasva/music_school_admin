import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getStaffProfile } from "./getStaffProfile"

export interface StaffProfileProps {
  params: { id: string }
}

export default async function StaffProfile({ params }: StaffProfileProps) {
  const profile = await getStaffProfile(params.id)
  return (
    <div>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
      <Link href={`/admin/staff/${params.id}/edit`}>
        <Button>Edit</Button>
      </Link>
    </div>
  )
}
