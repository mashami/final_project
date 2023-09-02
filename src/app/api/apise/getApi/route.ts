import { prisma } from "@/lib/prisma"
import { HttpStatusCode } from "@/utils/enums"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { apiId } = await req.json()

  if (!apiId) {
    return NextResponse.json({
      error: true,
      message: "APi Id should provided"
    })
  }
  try {
    const api = await prisma.api.findFirst({
      where: { id: apiId }
    })

    if (!api) {
      return NextResponse.json(
        {
          Error: true,
          message: "There isn't API with this Id",
          api
        },
        { status: HttpStatusCode.BAD_REQUEST }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Api fetched successfully.",
        api
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
