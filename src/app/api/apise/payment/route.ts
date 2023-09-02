import { HttpStatusCode } from "@/utils/enums"
import { NextResponse } from "next/server"

interface PaypackTransaction {
  // ref: string
  offset: number
  limit: number
  // Add other properties as needed
}

export async function POST(req: Request) {
  const { amount, phoneNumber } = await req.json()

  console.log(amount, phoneNumber)

  console.log("env =>", process.env.NODE_ENV)
  console.log("Hello")

  try {
    let paymentRef = ""

    return NextResponse.json(
      {
        Success: true,
        message: "API updated successfully "
      },
      { status: HttpStatusCode.BAD_REQUEST }
    )
  } catch (error) {
    console.log("The error ===>", error)
    return NextResponse.json(
      { error: error, message: "An error occured. Please try again." },
      { status: HttpStatusCode.INTERNAL_SERVER }
    )
  }
}
