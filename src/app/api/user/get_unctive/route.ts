import { prisma } from "@/lib/prisma"
import { HttpStatusCode } from "@/utils/enums"
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
        { error: true, message: "User not exit" },
        { status: HttpStatusCode.BAD_REQUEST }
      )
    }

    if (!(user.status === "Admin")) {
      return NextResponse.json(
        { error: true, message: "you are not authorized" },
        { status: HttpStatusCode.BAD_REQUEST }
      )
    }
    // update user in DB
    const users = await prisma.user.findMany({
      where: { status: "Dev", dev_status: "Unctive" }
    })

    return NextResponse.json(
      {
        success: true,
        message: "Users fetched successfully.",
        users
      },
      { status: HttpStatusCode.OK }
    )
  } catch (error) {
    return NextResponse.json(
      { error: true, message: "An error occured. Please try again." },
      { status: HttpStatusCode.INTERNAL_SERVER }
    )
  }
}
