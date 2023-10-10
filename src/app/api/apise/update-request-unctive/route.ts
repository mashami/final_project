import { prisma } from "@/lib/prisma"
import { HttpStatusCode } from "@/utils/enums"
import { sendMail } from "@/utils/mailService"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { requestId } = await req.json()

  if (!requestId) {
    return NextResponse.json(
      { error: true, message: "Request Id is required" },
      { status: HttpStatusCode.BAD_REQUEST }
    )
  }

  try {
    const request = await prisma.request.findFirst({
      where: { id: requestId }
    })

    if (!request) {
      return NextResponse.json(
        { error: true, message: "This request doen't exit" },
        { status: HttpStatusCode.BAD_REQUEST }
      )
    }

    // update user in DB
    await prisma.request.update({
      where: { id: requestId },
      data: {
        status: "Unctive"
      }
    })

    await sendMail(
      "Activeted",
      request.email,
      "Your request API has been removed on iHUZO Platform."
    )

    return NextResponse.json(
      {
        success: true,
        message: "The request API has been updated to unctive successfully."
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
