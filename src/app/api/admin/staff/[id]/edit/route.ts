import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import * as z from "zod"
import { addStaffSchema } from "@/app/[lang]/(admin)/admin/staff/add/addStaffSchema"
import { hash } from "bcrypt"
import { revalidatePath } from "next/cache"
import { i18n } from "@/lib/i18n-config"

enum GenderType {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

async function handlePhoneUpdates(
  paramsId: string,
  requestData: Partial<z.infer<typeof addStaffSchema>>,
) {
  const result = await prisma.staff.findUnique({
    where: {
      id: parseInt(paramsId, 10), // Assume `staffId` is the ID you're looking for
    },
    select: {
      user: {
        select: {
          phone: {
            orderBy: {
              priority: "asc",
            },
            select: {
              id: true,
              priority: true,
              number: true,
              type: true,
            },
          },
        },
      },
    },
  })
  const existingPhones = result?.user?.phone || []

  const incomingPhones = requestData.phone || []
  const incomingPhonesWithPriorityAndID = incomingPhones.map((phone, index) => {
    const correspondingExistingPhone = existingPhones.find(
      (existingPhone) => existingPhone.priority === index + 1,
    )

    return {
      ...phone,
      priority: index + 1,
      id: correspondingExistingPhone
        ? correspondingExistingPhone.id
        : undefined,
    }
  })

  const phonesToDelete = existingPhones.filter(
    (ePhone) =>
      !incomingPhonesWithPriorityAndID.some(
        (iPhone) => iPhone.id === ePhone.id,
      ),
  )

  const phonesToUpsert = incomingPhonesWithPriorityAndID
    .filter((incomingPhone) => {
      const existingPhone = existingPhones.find(
        (ep) => ep.id === incomingPhone.id,
      )
      return (
        !existingPhone ||
        existingPhone.number !== incomingPhone.number ||
        existingPhone.type !== incomingPhone.type
      )
    })
    .map((incomingPhone) => ({
      create: {
        number: incomingPhone.number,
        type: incomingPhone.type,
        priority: incomingPhone.priority,
      },
      update: {
        number: incomingPhone.number,
        type: incomingPhone.type,
        priority: incomingPhone.priority,
      },
      where: {
        id: incomingPhone.id || undefined,
      },
    }))

  const phonesToUpdate = phonesToUpsert
    .filter((phone) => phone.where.id !== undefined)
    .map((phone) => ({
      where: { id: phone.where.id },
      data: phone.update,
    }))

  const phonesToCreate = phonesToUpsert
    .filter((phone) => phone.where.id === undefined)
    .map((phone) => phone.create)

  await prisma.staff.update({
    where: { id: parseInt(paramsId, 10) },
    data: {
      user: {
        update: {
          phone: {
            updateMany: phonesToUpdate,
            create: phonesToCreate,
            deleteMany: phonesToDelete.map((phone) => ({ id: phone.id })),
          },
        },
      },
    },
  })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const requestData: Partial<z.infer<typeof addStaffSchema>> = await req.json()

  if ("phone" in requestData) {
    await handlePhoneUpdates(params.id, requestData)
  }

  const addressFields: (keyof typeof requestData)[] = [
    "houseNo",
    "building",
    "floor",
    "mooNo",
    "soi",
    "road",
    "subDistrict",
    "district",
    "province",
    "postalCode",
    "country",
  ]
  const addressUpdate = addressFields.reduce(
    (obj, field) =>
      requestData[field] ? { ...obj, [field]: requestData[field] } : obj,
    {},
  )

  // constract data to query
  const data = {
    ...(requestData.givenName ? { givenName: requestData.givenName } : {}),
    ...(requestData.middleName ? { middleName: requestData.middleName } : {}),
    ...(requestData.familyName ? { familyName: requestData.familyName } : {}),
    ...(requestData.nickName ? { nickName: requestData.nickName } : {}),
    ...(requestData.dateOfBirth
      ? { dateOfBirth: new Date(requestData.dateOfBirth) }
      : {}),
    ...(requestData.gender
      ? {
          gender:
            GenderType[
              requestData.gender.toUpperCase() as keyof typeof GenderType
            ],
        }
      : {}),
    ...(requestData.lineId ? { lineId: requestData.lineId } : {}),
    user: {
      update: {
        ...(requestData.email ? { email: requestData.email } : {}),
        ...(requestData.password
          ? { password: await hash(requestData.password, 12) }
          : {}),
        ...(Object.keys(addressUpdate).length > 0
          ? { address: { update: addressUpdate } }
          : {}),
      },
    },
  }
  try {
    const updatedStaff = await prisma.staff.update({
      where: { id: Number(params.id) },
      data: data,
    })

    // to purge cached data on-demand for a specific path
    revalidatePath("/[lang]/(admin)/admin/staff", "page")

    const languages = i18n.locales
    const endpoints = [
      `admin/staff/${params.id}`,
      `admin/staff/${params.id}/edit`,
    ]
    languages.forEach((lang) => {
      endpoints.forEach((endpoint) => {
        revalidatePath(`/${lang}/${endpoint}`)
      })
    })

    return NextResponse.json({
      ...updatedStaff,
    })
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
