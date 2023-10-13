import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import * as z from "zod"
import { addStaffSchema } from "@/app/[lang]/(admin)/admin/staff/add/addStaffSchema"
import { hash } from "bcrypt"

enum RoleType {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
}

enum GenderType {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export async function POST(req: Request) {
  const data: z.infer<typeof addStaffSchema> = await req.json()

  const preparedData = {
    email: data.email,
    password: await hash(data.password, 12),
    role: RoleType.ADMIN,
    staff: {
      create: {
        givenName: data.givenName,
        middleName: data.middleName || null,
        familyName: data.familyName,
        nickName: data.nickName,
        dateOfBirth: new Date(data.dateOfBirth),
        gender:
          GenderType[data.gender.toUpperCase() as keyof typeof GenderType],
        lineId: data.lineId || null,
      },
    },
    address: {
      create: {
        houseNo: data.houseNo,
        building: data.building || null,
        floor: data.floor || null,
        mooNo: data.mooNo || null,
        soi: data.soi || null,
        road: data.road || null,
        subDistrict: data.subDistrict,
        district: data.district,
        province: data.province,
        postalCode: data.postalCode,
        country: data.country,
      },
    },
    phone: {
      create: data.phone.map((phone, index) => ({
        number: phone.number,
        priority: index + 1, // Priority could be index + 1 if you want it to be ordered
        type: phone.type,
      })),
    },
  }

  try {
    const createdStaff = await prisma.user.create({
      data: preparedData,
    })
    return NextResponse.json(createdStaff)
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    )
  }
}
