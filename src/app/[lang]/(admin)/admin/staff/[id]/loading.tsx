import { Skeleton } from "@/components/ui/skeleton"

export default async function LoadingUsers() {
  return (
    <div className="flex w-full flex-col space-y-4">
      <div>
        <Skeleton className="h-8 w-1/5" />
      </div>
      <div>
        <Skeleton className="h-12 w-1/5" />
      </div>
      <div>
        <Skeleton className="h-96 w-full" />
      </div>
    </div>
  )
}
