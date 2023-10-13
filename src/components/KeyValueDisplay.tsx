import { cn } from "@/lib/utils" // Import your utility for combining class names

interface KeyValueProps {
  data: Record<string, string | number | undefined>
  className?: string // Make className an optional prop
}

export default function KeyValueDisplay({ data, className }: KeyValueProps) {
  return (
    <dl className={cn("space-y-2", className)}>
      {Object.keys(data).map((key, index) => (
        <div key={index} className="relative">
          <dt className="inline-block w-32 align-top font-medium">{key}:</dt>
          <dd className="ml-4 inline-block align-top">
            {data[key] !== undefined && data[key] !== null ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: data[key]!.toString().replace(/\n/g, "<br/>"),
                }}
              />
            ) : (
              "-"
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}
