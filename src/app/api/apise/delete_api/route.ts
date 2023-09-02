import { prisma } from "@/lib/prisma"
import { HttpStatusCode } from "@/utils/enums"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { userId, apiId } = await req.json()

  if (!userId || !apiId) {
    return NextResponse.json({
      error: true,
      message: "user Id and api id should provided"
    })
  }
  try {
    const apis = await prisma.api.findFirst({
      where: { id: apiId, ownerId: userId }
    })

    if (!apis) {
      return NextResponse.json(
        {
          success: true,
          message: "There is not api with the API Id provided.",
          apis
        },
        { status: HttpStatusCode.BAD_REQUEST }
      )
    }

    console.log("herrrrererreereer")

    await prisma.api.delete({
      where: { id: apis.id }
    })

    return NextResponse.json(
      {
        success: true,
        message: "Apis deleted successfully."
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
