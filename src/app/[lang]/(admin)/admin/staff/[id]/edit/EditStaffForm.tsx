"use client"

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
import { useFieldArray, useForm } from "react-hook-form"
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
import { Fragment } from "react"
import { ReloadIcon } from "@radix-ui/react-icons"

interface EditStaffFormProps {
  params: { id: string }
  profile: UnwrapPromise<ReturnType<typeof getStaffProfile>>
}

export function EditStaffForm({ params, profile }: EditStaffFormProps) {
  const router = useRouter()

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
    phone: profile?.user.phone
      .sort((a, b) => a.priority - b.priority)
      .map((p) => ({ number: p.number, type: p.type })),
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

  const { isSubmitting } = form.formState

  async function onSubmit(values: z.infer<typeof editStaffSchema>) {
    const changedValues: Partial<z.infer<typeof editStaffSchema>> = {}
    type LooseObject = {
      [key: string]: any
    }
    const looseDefaultValues: LooseObject = defaultValues

    const phoneHasChanged = (
      newPhones: { number: string; type: string }[],
      defaultPhones: { number: string; type: string }[],
    ): boolean => {
      if (newPhones.length !== defaultPhones.length) return true
      for (let i = 0; i < newPhones.length; i++) {
        const newPhone = newPhones[i]
        const defaultPhone = defaultPhones[i]
        if (
          newPhone.number !== defaultPhone.number ||
          newPhone.type !== defaultPhone.type
        ) {
          return true
        }
      }
      return false
    }

    for (const [key, value] of Object.entries(values)) {
      if (key === "phone") {
        if (
          phoneHasChanged(
            value as { number: string; type: string }[],
            looseDefaultValues[key] as { number: string; type: string }[],
          )
        ) {
          changedValues[key as keyof typeof defaultValues] = value as any
        }
      } else if (value !== looseDefaultValues[key]) {
        changedValues[key as keyof typeof defaultValues] = value as any
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

    if (res.ok) {
      // router.push(`/admin/staff/${params.id}`)
      window.location.href = `/admin/staff/${params.id}`
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

  const { fields, append, remove } = useFieldArray({
    name: "phone",
    control: form.control,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-6">
          <div className="flex w-full flex-col gap-6">
            <Card className="w-full">
              {/* Sign-in Information */}
              <CardHeader>
                <CardTitle>Sign-in Information</CardTitle>
              </CardHeader>
              <CardContent>
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
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
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
                      <FormLabel>Nickname</FormLabel>
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
                <p className="text-sm">Age: {age}</p>
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
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent>
                {/* start phone */}
                {fields.map((field, index) => (
                  <Fragment key={field.id}>
                    <FormField
                      control={form.control}
                      name={`phone.${index}.number`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone {index + 1}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`phone.${index}.type`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone {index + 1} Type</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Fragment>
                ))}
                <div className="mb-2 flex items-center justify-between text-left">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => append({ number: "", type: "" })}
                  >
                    + Phone {fields.length + 1}
                  </Button>
                  {fields.length > 1 && (
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={() => remove(fields.length - 1)}
                    >
                      Remove Phone {fields.length}
                    </Button>
                  )}
                </div>
                {/* end phone */}
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
              </CardContent>
            </Card>
          </div>
          <div className="flex w-full flex-col gap-6">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Address</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            {isSubmitting ? (
              <Button disabled className="w-full">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  )
}
