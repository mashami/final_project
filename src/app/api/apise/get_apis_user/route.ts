import { prisma } from "@/lib/prisma"
import { HttpStatusCode } from "@/utils/enums"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { userId } = await req.json()

  if (!userId) {
    return NextResponse.json({
      error: true,
      message: "User Id should provided"
    })
  }
  try {
    const apis = await prisma.api.findMany({
      where: { ownerId: userId, apiStatus: "Active" }
    })

    if (!apis) {
      return NextResponse.json(
        {
          success: true,
          message: "You don't have APIs yet.",
          apis
        },
        { status: HttpStatusCode.OK }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Apis fetched successfully.",
        apis
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
