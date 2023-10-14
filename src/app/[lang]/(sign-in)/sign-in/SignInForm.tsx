"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { ReloadIcon } from "@radix-ui/react-icons"

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(1, {
    message: "Password must be at least 1 characters.",
  }),
})

export default function SignInForm() {
  const callbackUrlQuery = useSearchParams().get("callbackUrl")
  const callbackUrl = callbackUrlQuery ? callbackUrlQuery : "/admin/staff"
  const errorUrlQuery = useSearchParams().get("error")
  const validCredentials = errorUrlQuery === "CredentialsSignin" ? false : true

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { isSubmitting } = form.formState

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: callbackUrl,
    })
  }

  return (
    <Form {...form}>
      <div className="pl-4 pt-2 font-medium text-red-500">
        {validCredentials ? "" : "Invalid Email or Password"}
      </div>
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
                <Input
                  type="password"
                  placeholder="Your password"
                  autoComplete="true"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isSubmitting ? (
          <Button disabled className="w-full">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        )}
      </form>
    </Form>
  )
}
