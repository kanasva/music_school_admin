import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getStaffProfile } from "./getStaffProfile"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb"
import KeyValueDisplay from "@/components/KeyValueDisplay"

export interface StaffProfileProps {
  params: { id: string }
}

export default async function StaffProfile({ params }: StaffProfileProps) {
  const profile = await getStaffProfile(params.id)
  const name = (profile?.givenName ?? "") + " " + (profile?.familyName ?? "")

  const signInInfo = {
    Email: profile?.user.email,
    Password: "••••••••",
  }

  const personalInfo = {
    Name:
      profile?.givenName +
      " " +
      profile?.middleName +
      " " +
      profile?.familyName,
    Nickname: profile?.nickName,
    "Date of Birth": new Date(profile?.dateOfBirth ?? "").toLocaleDateString(),
    Gender: profile?.gender
      ? `${profile.gender.charAt(0).toUpperCase()}${profile.gender
          .slice(1)
          .toLowerCase()}`
      : "",
  }

  const createContact = (profile: any): Record<string, string | undefined> => {
    const contact: Record<string, string | undefined> = {}
    profile?.user.phone.forEach((phone: any, index: number) => {
      contact[`Phone ${index + 1}`] = `${phone.number} (${phone.type})`
    })
    contact["Line ID"] = profile?.lineId
    const address = profile?.user.address
    contact[
      "Address"
    ] = `${address.houseNo}, ${address.building}, Floor ${address.floor}, \nMoo ${address.mooNo}, Soi ${address.soi}, ${address.road} Road, \n${address.subDistrict}, ${address.district}, ${address.province}, \n${address.postalCode}, ${address.country}`
    return contact
  }

  const contact = createContact(profile)

  return (
    <div>
      <Breadcrumb className="pb-6">
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin/staff">Staff</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/admin/staff/new-staff">{name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <h2 className="pb-6">{name}</h2>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Profile</CardTitle>
          <Link href={`/admin/staff/${params.id}/edit`}>
            <Button>Edit</Button>
          </Link>
        </CardHeader>

        <CardContent>
          {profile ? (
            <>
              <h4 className="mt-0">Sign-in Information</h4>
              <KeyValueDisplay data={signInInfo} />
              <h4>Personal Information</h4>
              <KeyValueDisplay data={personalInfo} />
              <h4>Contact</h4>
              <KeyValueDisplay data={contact} />
            </>
          ) : (
            <p>No profile information available.</p>
          )}
        </CardContent>
      </Card>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  )
}
