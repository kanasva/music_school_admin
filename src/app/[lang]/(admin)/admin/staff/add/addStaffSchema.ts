import { z } from "zod"

export const addStaffSchema = z.object({
  phone: z.array(
    z.object({
      number: z.string(),
    })
  ),
  email: z.string().toLowerCase().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password must be at least 1 characters." }),
  givenName: z.string().nonempty(),
  middleName: z.string().optional(),
  familyName: z.string().nonempty(),
  nickName: z.string().nonempty(),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  gender: z.union([z.enum(["MALE", "FEMALE", "OTHER"]), z.string().nonempty()]),
  primaryPhone: z.string().nonempty(),
  primaryPhoneType: z.string().nonempty(),
  secondaryPhone: z.string().optional(),
  secondaryPhoneType: z.string().optional(),
  lineId: z.string().optional(),
  houseNo: z.string().nonempty(),
  building: z.string().optional(),
  floor: z.string().optional(),
  mooNo: z.string().optional(),
  soi: z.string().optional(),
  road: z.string().optional(),
  subDistrict: z.string().nonempty(),
  district: z.string().nonempty(),
  province: z.string().nonempty(),
  postalCode: z.string().nonempty(),
  country: z.string().nonempty(),
})
