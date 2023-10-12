import { getStaffProfile } from "../getStaffProfile"
import { EditStaffForm } from "./EditStaffForm"

interface EditStaffProps {
  params: { id: string }
}

export default async function EditStaff({ params }: EditStaffProps) {
  const profile = await getStaffProfile(params.id)
  return (
    <div>
      <EditStaffForm params={params} profile={profile} />
      aa
    </div>
  )
}
