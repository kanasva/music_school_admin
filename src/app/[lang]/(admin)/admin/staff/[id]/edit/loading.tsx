import { Skeleton } from "@/components/ui/skeleton"

export default async function LoadingUsers() {
  return (
    <div className="flex w-full flex-col space-y-4">
      <Skeleton className="h-8 w-1/5" />
      <Skeleton className="h-12 w-1/5" />

      <div className="flex w-full flex-row space-x-6">
        <Skeleton className="h-96 w-1/2" />
        <Skeleton className="h-96 w-1/2" />
      </div>
    </div>
  )
}
