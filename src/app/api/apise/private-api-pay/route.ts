import { prisma } from "@/lib/prisma"
import { HttpStatusCode } from "@/utils/enums"
import { sendMail } from "@/utils/mailService"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email, phoneNumber, apiId, amount } = await req.json()

  if (!email || !phoneNumber || !apiId || !amount) {
    return NextResponse.json(
      { error: true, message: "All fields are required from Back-End" },
      { status: HttpStatusCode.BAD_REQUEST }
    )
  }
  try {
    const response = await fetch(process.env.PAY_URL + `/api/pay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number: phoneNumber, amount }),
      cache: "no-store"
    })
    const result = await response.json()

    if (result.status === "paid") {
      await prisma.payment.create({
        data: {
          email,
          paymentRef: result.paymentRef,
          phoneNumber,
          ApiId: apiId
        }
      })

      await sendMail(
        "ACCESS PRIVATE API",
        email,
        `You have been pay private API sucessfully! 
        Your access token : ${result.paymentRef}`
      )

      return NextResponse.json(
        {
          success: true,
          message: "Your request has been saved successfully!!",
          accesstoken: result.paymentRef
        },
        { status: HttpStatusCode.OK }
      )
    } else {
      return NextResponse.json(
        { error: true, message: "You have to pay to do this task! 🥹" },
        { status: HttpStatusCode.BAD_REQUEST }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: true, message: "An error occured. Please try again." },
      { status: HttpStatusCode.INTERNAL_SERVER }
    )
  }
}
