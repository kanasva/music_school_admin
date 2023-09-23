import { columns } from "./columns"
import { DataTable } from "./data-table"
import { prisma } from "@/lib/prisma"

export async function StaffTable() {
  async function getStaff() {
    const staff = await prisma.staff.findMany({
      select: {
        id: true,
        givenName: true,
        familyName: true,
        user: {
          select: {
            email: true,
            role: true,
            phone: {
              select: {
                number: true,
                priority: true,
              },
            },
          },
        },
      },
    })
    const modifiedData = staff.map((staff) => {
      const id = staff.id
      const name = `${staff.givenName} ${staff.familyName}`
      const email = staff.user.email
      const phone = staff.user.phone
        .slice()
        .sort((a, b) => a.priority - b.priority)
        .map((phone) => phone.number)
        .join(", ")
      const role = staff.user.role.toLowerCase()
      return { id, name, phone, email, role }
    })
    return modifiedData
  }
  return <DataTable columns={columns} data={await getStaff()} />
}
