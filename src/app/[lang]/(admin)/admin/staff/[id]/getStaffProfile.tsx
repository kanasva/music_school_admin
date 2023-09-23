import { prisma } from "@/lib/prisma"

export async function getStaffProfile(id: string) {
  // const staffId = parseInt(id, 10)
  // if (staffId == null) throw new Error("Username undefined")
  const staffProfile = await prisma.staff.findUnique({
    where: {
      id: parseInt(id, 10),
    },
    select: {
      givenName: true,
      middleName: true,
      familyName: true,
      nickName: true,
      dateOfBirth: true,
      gender: true,
      lineId: true,
      user: {
        select: {
          email: true,
          password: true,
          role: true,
          address: {
            select: {
              houseNo: true,
              building: true,
              floor: true,
              mooNo: true,
              soi: true,
              road: true,
              subDistrict: true,
              district: true,
              province: true,
              postalCode: true,
              country: true,
            },
          },
          phone: {
            select: {
              number: true,
              priority: true,
              type: true,
            },
          },
        },
      },
    },
  })
  return staffProfile
}
