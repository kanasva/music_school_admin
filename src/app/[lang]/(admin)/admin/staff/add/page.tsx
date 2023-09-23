"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addStaffSchema } from "./addStaffSchema";
import { Fragment } from "react";

export default function AddStaff() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof addStaffSchema>>({
    resolver: zodResolver(addStaffSchema),
    defaultValues: {
      phone: [{ number: "", type: "" }],
      email: "",
      password: "",
      givenName: "",
      middleName: "",
      familyName: "",
      nickName: "",
      dateOfBirth: "",
      gender: undefined,
      lineId: "",
      houseNo: "",
      building: "",
      floor: "",
      mooNo: "",
      soi: "",
      road: "",
      subDistrict: "",
      district: "",
      province: "",
      postalCode: "",
      country: "Thailand",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "phone",
    control: form.control,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof addStaffSchema>) {
    console.log(values);
    // const res = await fetch("/api/admin/staff/add", {
    //   method: "POST",
    //   body: JSON.stringify(values),
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    // });
    // await res.json();
    // console.log(res);
    // if (res.ok) {
    //   router.push("/admin/staff");
    // } else {
    //   alert("Unsuccessful");
    // }
  }

  const calculateAge = (dob: string) => {
    const dobDate = new Date(dob);
    const now = new Date();

    let years = now.getFullYear() - dobDate.getFullYear();
    let months = now.getMonth() - dobDate.getMonth();
    let days = now.getDate() - dobDate.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months = (months + 12) % 12;
    }

    if (days < 0) {
      months--;
      let previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days = previousMonth.getDate() + days;
    }

    return `${years} years, ${months} months, ${days} days`;
  };
  const dob = form.watch("dateOfBirth");
  const age = dob ? calculateAge(dob) : "please put your date of birth";

  const h4 =
    "text-xl font-normal leading-none tracking-tight align-bottom pb-4 pt-6";

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
          <BreadcrumbLink href="/admin/staff/new-staff">
            Add Staff
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <h2 className="pb-6">Add Staff</h2>
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
                            {index > 0 && (
                              <div className="flex items-center justify-between pt-1">
                                <Button
                                  type="button"
                                  variant="secondary"
                                  onClick={() =>
                                    append({ number: "", type: "" })
                                  }
                                >
                                  + Phone {index + 2}
                                </Button>
                                <Button
                                  variant="secondary"
                                  type="button"
                                  onClick={() => remove(index)}
                                >
                                  Remove Phone {index + 1}
                                </Button>
                              </div>
                            )}
                          </FormItem>
                        )}
                      />
                    </Fragment>
                  ))}
                  {fields.length === 1 && (
                    <div className="mb-2 text-left">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => append({ number: "", type: "" })}
                      >
                        + Phone 2
                      </Button>
                    </div>
                  )}
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
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
