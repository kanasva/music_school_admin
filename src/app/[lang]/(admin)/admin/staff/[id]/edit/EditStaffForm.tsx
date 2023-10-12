"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { addStaffSchema } from "../../add/addStaffSchema"
import { getStaffProfile } from "../getStaffProfile"
import { UnwrapPromise } from "@/types/UnwrapPromise"

interface EditStaffFormProps {
  params: { id: string }
  profile: UnwrapPromise<ReturnType<typeof getStaffProfile>>
}

export function EditStaffForm({ params, profile }: EditStaffFormProps) {
  const router = useRouter()
  const primaryPhone = profile?.user.phone?.find(
    (phone) => phone.priority === 1,
  )?.number
  const secondaryPhone = profile?.user.phone?.find(
    (phone) => phone.priority === 2,
  )?.number

  const defaultValues = {
    email: profile?.user.email || "",
    password: "",
    givenName: profile?.givenName || "",
    middleName: profile?.middleName || "",
    familyName: profile?.familyName || "",
    nickName: profile?.nickName || "",
    dateOfBirth: profile?.dateOfBirth
      ? profile.dateOfBirth.toISOString().slice(0, 10)
      : "",
    gender: profile?.gender || "",
    primaryPhone: primaryPhone || "",
    primaryPhoneType:
      profile?.user.phone?.find((phone) => phone.priority === 1)?.type || "",
    secondaryPhone: secondaryPhone || "",
    secondaryPhoneType:
      profile?.user.phone?.find((phone) => phone.priority === 2)?.type || "",
    lineId: profile?.lineId || "",
    houseNo: profile?.user.address?.houseNo || "",
    building: profile?.user.address?.building || "",
    floor: profile?.user.address?.floor || "",
    mooNo: profile?.user.address?.mooNo || "",
    soi: profile?.user.address?.soi || "",
    road: profile?.user.address?.road || "",
    subDistrict: profile?.user.address?.subDistrict || "",
    district: profile?.user.address?.district || "",
    province: profile?.user.address?.province || "",
    postalCode: profile?.user.address?.postalCode || "",
    country: profile?.user.address?.country || "Thailand",
  }

  const editStaffSchema = addStaffSchema.extend({
    password: z.string().optional(),
  })

  // 1. Define your form.
  const form = useForm<z.infer<typeof editStaffSchema>>({
    resolver: zodResolver(editStaffSchema),
    defaultValues: defaultValues,
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof editStaffSchema>) {
    console.log(values)
    const changedValues: Partial<z.infer<typeof editStaffSchema>> = {}
    // typecast the objects to LooseObject type.
    type LooseObject = {
      [key: string]: any
    }
    const looseDefaultValues: LooseObject = defaultValues
    // Iterate over the keys and values of the submitted form data.
    for (const [key, value] of Object.entries(values)) {
      // If the value is different from the default value, add it to the changedValues object.
      if (value !== looseDefaultValues[key]) {
        changedValues[key as keyof typeof defaultValues] = value
      }
    }

    const res = await fetch(`/api/admin/staff/${params.id}/edit`, {
      method: "PATCH",
      body: JSON.stringify(changedValues),
      headers: {
        "Content-type": "application/json",
      },
    })
    await res.json()
    console.log(res)
    if (res.ok) {
      router.push(`/admin/staff/${params.id}`)
    } else {
      alert("Unsuccessful")
    }
  }

  const calculateAge = (dob: string) => {
    const dobDate = new Date(dob)
    const now = new Date()

    let years = now.getFullYear() - dobDate.getFullYear()
    let months = now.getMonth() - dobDate.getMonth()
    let days = now.getDate() - dobDate.getDate()

    if (months < 0 || (months === 0 && days < 0)) {
      years--
      months = (months + 12) % 12
    }

    if (days < 0) {
      months--
      let previousMonth = new Date(now.getFullYear(), now.getMonth(), 0)
      days = previousMonth.getDate() + days
    }

    return `${years} years, ${months} months, ${days} days`
  }
  const dob = form.watch("dateOfBirth")
  const age = dob ? calculateAge(dob) : "please put your date of birth"

  const h4 =
    "text-xl font-normal leading-none tracking-tight align-bottom pb-4 pt-6"

  return (
    <main className="w-full">
      <Card className="m-2">
        {/* Breadcrumb */}
        <Breadcrumb className="px-4 pt-4">
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/staff">Staff</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/admin/staff/${params.id}`}>
              {params.id}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Edit Staff</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <CardHeader className="pb-0">
          <CardTitle className="align-bottom">Edit Staff</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-row justify-between gap-6"
            >
              {/* Sign-in Information */}
              <div className="w-full">
                <h4 className={h4}>Sign-in Information</h4>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Your password"
                          autoComplete="false"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Peronal Information */}
                <h4 className={h4}>Peronal Information</h4>
                <FormField
                  control={form.control}
                  name="givenName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Given Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="familyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Family Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nickName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nick Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p>Age: {age}</p>
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Gender</SelectLabel>
                            <SelectItem value="MALE">Male</SelectItem>
                            <SelectItem value="FEMALE">Female</SelectItem>
                            <SelectItem value="OTHER">Other</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Contact */}
                <h4 className={h4}>Contact</h4>
                <FormField
                  control={form.control}
                  name="primaryPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Phone</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="primaryPhoneType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Phone Type</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="secondaryPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secondary Phone</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="secondaryPhoneType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secondary Phone Type</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lineId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Line ID</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Address */}
              <div className="w-full">
                <h4 className={h4}>Address</h4>
                <FormField
                  name="houseNo"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>House No</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="building"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Building</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="floor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Floor</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mooNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Moo No</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="soi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Soi</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="road"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Road</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subDistrict"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subdistrict</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Province</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6">
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}
