"use client"

import { SampleDatePicker } from "@/components/SampleDatePicker";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/CalendarForSampleDatePicker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { DateField, DatePicker } from "@/components/ui/old_date-picker";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

// form schema
const formSchema = z.object({
	email: z.string().toLowerCase().email({ message: "Invalid email address", }),
	password: z.string().min(1, { message: "Password must be at least 1 characters.", }),
	givenName: z.string().nonempty(),
	middleName: z.string().optional(),
	familyName: z.string().nonempty(),
	nickName: z.string().nonempty(),
	dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
	gender: z.string().nonempty(),
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

export default function AddStaff() {
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			givenName: "",
			middleName: "",
			familyName: "",
			nickName: "",
			dateOfBirth: "",
			gender: "",
			primaryPhone: "",
			primaryPhoneType: "",
			secondaryPhone: "",
			secondaryPhoneType: "",
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
	})

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
		const res = await fetch('/api/admin/staff/add-staff', {
			method: 'POST',
			body: JSON.stringify(values),
			headers: {
				'Content-type': 'application/json'
			}
		})
		await res.json()
		console.log(res)
	};

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
	}
	const dob = form.watch("dateOfBirth");
	const age = dob ? calculateAge(dob) : 'please put your date of birth';

	const h4 = "text-xl font-normal leading-none tracking-tight align-bottom pb-4 pt-6"

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
					<BreadcrumbItem isCurrentPage>
						<BreadcrumbLink href="/admin/staff/new-staff">Add Staff</BreadcrumbLink>
					</BreadcrumbItem>
				</Breadcrumb>
				<CardHeader className="pb-0">
					<CardTitle className="align-bottom">Add Staff</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row justify-between gap-6">
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
												<Input type="password" placeholder="Your password" {...field} />
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
								<FormField control={form.control} name="gender" render={({ field }) => (
									<FormItem>
										<FormLabel>Gender</FormLabel>
										<FormControl>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<SelectTrigger className="w-[180px]">
													<SelectValue placeholder="Gender" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>Gender</SelectLabel>
														<SelectItem value="male">Male</SelectItem>
														<SelectItem value="female">Female</SelectItem>
														<SelectItem value="other">Other</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
								/>

								{/* Contact */}
								<h4 className={h4}>Contact</h4>
								<FormField control={form.control} name="primaryPhone" render={({ field }) => (
									<FormItem>
										<FormLabel>Primary Phone</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
								/>
								<FormField control={form.control} name="primaryPhoneType" render={({ field }) => (
									<FormItem>
										<FormLabel>Primary Phone Type</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
								/>
								<FormField control={form.control} name="secondaryPhone" render={({ field }) => (
									<FormItem>
										<FormLabel>Secondary Phone</FormLabel>
										<FormControl>
											<Input type="number" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
								/>
								<FormField control={form.control} name="secondaryPhoneType" render={({ field }) => (
									<FormItem>
										<FormLabel>Secondary Phone Type</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
								/>
								<FormField control={form.control} name="lineId" render={({ field }) => (
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
								<FormField name="houseNo" control={form.control} render={({ field }) => (
									<FormItem>
										<FormLabel>House No</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)} />
								<FormField control={form.control} name="building" render={({ field }) => (
									<FormItem>
										<FormLabel>Building</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)} />
								<FormField control={form.control} name="floor" render={({ field }) => (
									<FormItem>
										<FormLabel>Floor</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
								/>
								<FormField control={form.control} name="mooNo" render={({ field }) => (
									<FormItem>
										<FormLabel>Moo No</FormLabel>
										<FormControl>
											<Input type="number" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
								/>
								<FormField control={form.control} name="soi" render={({ field }) => (
									<FormItem>
										<FormLabel>Soi</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
								/>
								<FormField control={form.control} name="road" render={({ field }) => (
									<FormItem>
										<FormLabel>Road</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
								/>
								<FormField control={form.control} name="subDistrict" render={({ field }) => (
									<FormItem>
										<FormLabel>Subdistrict</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
								/>
								<FormField control={form.control} name="district" render={({ field }) => (
									<FormItem>
										<FormLabel>District</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
								/>
								<FormField control={form.control} name="province" render={({ field }) => (
									<FormItem>
										<FormLabel>Province</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
								/>
								<FormField control={form.control} name="postalCode" render={({ field }) => (
									<FormItem>
										<FormLabel>Postal Code</FormLabel>
										<FormControl>
											<Input type="number" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
								/>
								<FormField control={form.control} name="country" render={({ field }) => (
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
									<Button type="submit" className="w-full">Submit</Button>
								</div>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</main >
	)
}