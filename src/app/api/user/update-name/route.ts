import { prisma } from "@/lib/prisma"
import { HttpStatusCode } from "@/utils/enums"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { userId, name } = await req.json()

  if (!userId) {
    return NextResponse.json(
      { error: true, message: "UserId is required" },
      { status: HttpStatusCode.BAD_REQUEST }
    )
  }

  if (!name) {
    return NextResponse.json(
      { error: true, message: "Name is required" },
      { status: HttpStatusCode.BAD_REQUEST }
    )
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive"
        }
      }
    })

    if (user) {
      return NextResponse.json(
        { error: true, message: "Name has already been taken" },
        { status: HttpStatusCode.BAD_REQUEST }
      )
    }

    // update user in DB
    await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        updatedAt: new Date()
      }
    })

    return NextResponse.json(
      {
        success: true,
        message: "Name has been updated successfully."
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
