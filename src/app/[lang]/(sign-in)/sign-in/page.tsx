"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useSession, signIn, signOut } from "next-auth/react";


const formSchema = z.object({
	email: z.string().email({
		message: "Invalid email address",
	}),
	password: z.string().min(1, {
		message: "Password must be at least 1 characters.",
	}),
})

export default function SignIn() {
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		const result = await signIn("credentials", {
			email: values.email,
			password: values.password,
			callbackUrl: "/admin",
		});
	};


	return (
		<div className="flex flex-col w-screen h-screen justify-center items-center">
			<Card className="flex flex-col w-full max-w-sm">
				<h1 className="p-4 w-full text-center">Sign in</h1>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
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
						<Button type="submit" className="w-full">Sign in</Button>
					</form>
				</Form>
			</Card>
		</div>
	)
}