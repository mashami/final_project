import { prisma } from "@/lib/prisma"
import { HttpStatusCode } from "@/utils/enums"
import { sendMail } from "@/utils/mailService"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { userId, requestId } = await req.json()

  if (!requestId || !userId) {
    return NextResponse.json(
      { error: true, message: "Request Id is required" },
      { status: HttpStatusCode.BAD_REQUEST }
    )
  }

  try {
    const request = await prisma.request.findFirst({
      where: { id: requestId }
    })

    const user = await prisma.user.findFirst({
      where: { id: userId }
    })

    if (!request || !user) {
      return NextResponse.json(
        { error: true, message: "This request or user doen't exit" },
        { status: HttpStatusCode.BAD_REQUEST }
      )
    }

    // const userPayment = await prisma.payment.findFirst({
    //   where: {
    //     email: session?.user?.email,
    //     ApiId: api.id
    //   }
    // })

    // update user in DB
    await prisma.request.update({
      where: { id: requestId },
      data: {
        contributors: {
          push: userId
        }
      }
    })

    await sendMail(
      "Contribute",
      user.email,
      `Now you have been add as contributor of the request from ${request.company} on iHUZO Platform.`
    )

    await sendMail(
      "Contribute",
      request.email,
      `Now someone from Ihuzo platform has been added to be contributor on your request on iHUZO Platform.`
    )

    return NextResponse.json(
      {
        success: true,
        message: "You have been added as contributor successfully."
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
