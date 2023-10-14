"use client"

import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { ReloadIcon } from "@radix-ui/react-icons"

export default function DeleteButton({
  id,
  name,
}: {
  id: string
  name: string
}) {
  const [isLoading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    const response = await fetch(`/api/admin/staff/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.ok) {
      window.location.href = "/admin/staff"
    } else {
      alert("Failed to delete")
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {isLoading ? (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Deleting
          </Button>
        ) : (
          <Button variant="destructive">Delete</Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            <strong>{name}</strong> will be permanently deleted. This action
            cannot be undone. <br />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
