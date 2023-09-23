import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as z from "zod";
import { addStaffSchema } from "@/app/[lang]/(admin)/admin/staff/add/addStaffSchema";
import { hash } from "bcrypt";
import { revalidatePath } from "next/cache";

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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  // address field
  const requestData: Partial<z.infer<typeof addStaffSchema>> = await req.json();
  console.log(requestData);
  let addressFields: (keyof typeof requestData)[] = [
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
  ];
  let addressUpdate = addressFields.reduce(
    (obj, field) =>
      requestData[field] ? { ...obj, [field]: requestData[field] } : obj,
    {},
  );

  // phone field
  // let primaryPhoneUpdate = {
  //   ...(requestData.primaryPhone ? { number: requestData.primaryPhone } : {}),
  //   ...(requestData.primaryPhoneType
  //     ? { type: requestData.primaryPhoneType }
  //     : {}),
  // }

  // let secondaryPhoneUpdate = {
  //   ...(requestData.secondaryPhone
  //     ? { number: requestData.secondaryPhone }
  //     : {}),
  //   ...(requestData.secondaryPhoneType
  //     ? { type: requestData.secondaryPhoneType }
  //     : {}),
  // }

  // let phoneUpdateMany = []
  // if (Object.keys(primaryPhoneUpdate).length > 0) {
  //   phoneUpdateMany.push({
  //     where: { priority: 1 },
  //     data: primaryPhoneUpdate,
  //   })
  // }
  // if (Object.keys(secondaryPhoneUpdate).length > 0) {
  //   phoneUpdateMany.push({
  //     where: { priority: 2 },
  //     data: secondaryPhoneUpdate,
  //   })
  // }

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
        // ...(phoneUpdateMany.length > 0
        //   ? { phone: { updateMany: phoneUpdateMany } }
        //   : {}),
      },
    },
  };
  try {
    const updatedStaff = await prisma.staff.update({
      where: { id: Number(params.id) },
      data: data,
    });
    const path = req.nextUrl.searchParams.get("path") || "/";
    console.log(path);
    revalidatePath(path);
    return NextResponse.json({
      ...updatedStaff,
      revalidated: true,
      now: Date.now(),
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
