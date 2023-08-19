import { prisma } from "@/lib/prisma"
import { HttpStatusCode } from "@/utils/enums"
import { sendMail } from "@/utils/mailService"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { apiId } = await req.json()

  if (!apiId) {
    return NextResponse.json(
      { error: true, message: "API Id is required" },
      { status: HttpStatusCode.BAD_REQUEST }
    )
  }

  try {
    const api = await prisma.api.findFirst({
      where: { id: apiId }
    })

    if (!api) {
      return NextResponse.json(
        { error: true, message: "This API doen't exit" },
        { status: HttpStatusCode.BAD_REQUEST }
      )
    }

    const user = await prisma.user.findFirst({
      where: { id: api.ownerId }
    })
    if (!user) {
      return NextResponse.json(
        { error: true, message: "user doen't exit" },
        { status: HttpStatusCode.BAD_REQUEST }
      )
    }
    // update user in DB
    await prisma.api.update({
      where: { id: apiId },
      data: {
        apiStatus: "Active",
        updatedAt: new Date()
      }
    })

    await sendMail(
      "Activeted",
      user.email,
      `Your API has been approved with iHUZO`
    )

    return NextResponse.json(
      {
        success: true,
        message: "API has been updated to active successfully."
      },
      { status: HttpStatusCode.OK }
    )
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      { error: true, message: "An error occured. Please try again." },
      { status: HttpStatusCode.INTERNAL_SERVER }
    )
  }
}
