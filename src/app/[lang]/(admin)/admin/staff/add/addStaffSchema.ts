import { z } from "zod"

export const addStaffSchema = z.object({
  phone: z.array(
    z.object({
      number: z
        .string()
        .min(9, { message: "Number must be at least 9 characters." })
        .max(12, { message: "Number must be no more than 12 characters." }),
      type: z
        .string()
        .min(2, { message: "Type must be at least 2 characters." })
        .max(20, { message: "Type must be no more than 20 characters." }),
    }),
  ),
  email: z
    .string()
    .min(5, { message: "Email must be at least 5 characters." })
    .max(50, { message: "Email must be no more than 50 characters." })
    .toLowerCase()
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(100, { message: "Password must be no more than 100 characters." }),
  givenName: z
    .string()
    .min(1, { message: "Given name must be at least 1 character." })
    .max(30, { message: "Given name must be no more than 30 characters." }),
  middleName: z.optional(
    z
      .string()
      .max(30, { message: "Middle name must be no more than 30 characters." }),
  ),
  familyName: z
    .string()
    .min(1, { message: "Family name must be at least 1 character." })
    .max(30, { message: "Family name must be no more than 30 characters." }),
  nickName: z
    .string()
    .min(1, { message: "Nickname must be at least 1 character." })
    .max(30, { message: "Nickname must be no more than 30 characters." }),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Invalid date format. Use DD/MM/YYYY",
  }),
  gender: z.union([
    z.enum(["MALE", "FEMALE", "OTHER"]),
    z
      .string()
      .min(1, { message: "Gender must be at least 1 character." })
      .max(20, { message: "Gender must be no more than 20 characters." }),
  ]),
  lineId: z.optional(
    z
      .string()
      .max(30, { message: "Line ID must be no more than 30 characters." }),
  ),
  houseNo: z
    .string()
    .min(1, { message: "House number must be at least 1 character." })
    .max(10, { message: "House number must be no more than 10 characters." }),
  building: z.optional(
    z
      .string()
      .max(30, { message: "Building must be no more than 30 characters." }),
  ),
  floor: z.optional(
    z
      .string()
      .max(10, { message: "Floor must be no more than 10 characters." }),
  ),
  mooNo: z.optional(
    z
      .string()
      .max(10, { message: "Moo No must be no more than 10 characters." }),
  ),
  soi: z.optional(
    z.string().max(30, { message: "Soi must be no more than 30 characters." }),
  ),
  road: z.optional(
    z.string().max(30, { message: "Road must be no more than 30 characters." }),
  ),
  subDistrict: z
    .string()
    .min(1, { message: "Sub-district must be at least 1 character." })
    .max(50, { message: "Sub-district must be no more than 50 characters." }),
  district: z
    .string()
    .min(1, { message: "District must be at least 1 character." })
    .max(50, { message: "District must be no more than 50 characters." }),
  province: z
    .string()
    .min(1, { message: "Province must be at least 1 character." })
    .max(50, { message: "Province must be no more than 50 characters." }),
  postalCode: z
    .string()
    .length(5, { message: "Postal code must be exactly 5 characters." }),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters." })
    .max(50, { message: "Country must be no more than 50 characters." }),
})
