import { prisma } from "@/lib/prisma"
import { HttpStatusCode } from "@/utils/enums"
import { sendMail } from "@/utils/mailService"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { userId } = await req.json()

  if (!userId) {
    return NextResponse.json(
      { error: true, message: "UserId is required" },
      { status: HttpStatusCode.BAD_REQUEST }
    )
  }

  try {
    const user = await prisma.user.findFirst({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: true, message: "User doen't exit" },
        { status: HttpStatusCode.BAD_REQUEST }
      )
    }
    // update user in DB
    await prisma.user.update({
      where: { id: userId },
      data: {
        dev_status: "Active",
        updatedAt: new Date()
      }
    })
    await sendMail(
      "Activeted",
      user.email,
      `You are now approved by iHUZO admin, Start to use iHUZO platform `
    )

    return NextResponse.json(
      {
        success: true,
        message: "Dev has been updated to active successfully."
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
