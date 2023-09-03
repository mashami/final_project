import { prisma } from "@/lib/prisma"
import { HttpStatusCode } from "@/utils/enums"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { requestId } = await req.json()

  if (!requestId) {
    return NextResponse.json({
      error: true,
      message: "Request Id should provided"
    })
  }
  try {
    const request = await prisma.request.findFirst({
      where: { id: requestId }
    })

    if (!request) {
      return NextResponse.json(
        {
          Error: true,
          message: "There isn't request with this Id",
          request
        },
        { status: HttpStatusCode.BAD_REQUEST }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "request fetched successfully.",
        request
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
