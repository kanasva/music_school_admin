import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
): Promise<Response> {
  const staffRecord = await prisma.staff.findUnique({
    where: { id: Number(params.id) },
    select: { userId: true },
  })

  if (staffRecord && staffRecord.userId) {
    await prisma.user.delete({
      where: { id: staffRecord.userId },
    })
    revalidatePath("/[lang]/(admin)/admin/staff", "page")

    return new Response(null, { status: 204 }) // 204 No Content
  }
  return new Response("Not found", { status: 404 }) // 404 Not Found
}
