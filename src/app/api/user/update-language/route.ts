import { prisma } from "@/lib/prisma"
import { HttpStatusCode } from "@/utils/enums"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { userId, language } = await req.json()

  if (!userId) {
    return NextResponse.json(
      { error: true, message: "UserId is required" },
      { status: HttpStatusCode.BAD_REQUEST }
    )
  }

  if (!language) {
    return NextResponse.json(
      { error: true, message: "language is required" },
      { status: HttpStatusCode.BAD_REQUEST }
    )
  }

  try {
    // update user in DB
    await prisma.user.update({
      where: { id: userId },
      data: {
        languages: language,
        updatedAt: new Date()
      }
    })

    return NextResponse.json(
      {
        success: true,
        message: "Languages has been updated successfully."
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
