import { prisma } from "@/lib/prisma"
import cloudinary from "@/utils/cloudinary"
import { HttpStatusCode } from "@/utils/enums"
import { sendMail } from "@/utils/mailService"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const {
    email,
    phoneNumber,
    numberPay,
    camponyName,
    description,
    problemStatment,
    amount
  } = await req.json()

  // console.log(
  //   "Email ==>",
  //   email,
  //   "phoneNumber ==>",
  //   phoneNumber,
  //   "numberPay ==>",
  //   numberPay,
  //   "camponyName ==>",
  //   camponyName,
  //   "description ==>",
  //   description,
  //   "problemStatment ==>",
  //   problemStatment,
  //   "amount ==>",
  //   amount
  // )

  if (
    !email ||
    !numberPay ||
    !phoneNumber ||
    !camponyName ||
    !description ||
    !problemStatment ||
    !amount
  ) {
    return NextResponse.json(
      { error: true, message: "All fields are required from Back-End" },
      { status: HttpStatusCode.BAD_REQUEST }
    )
  }
  try {
    const response = await fetch(process.env.PAY_URL + `/api/pay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number: numberPay, amount }),
      cache: "no-store"
    })
    const result = await response.json()
    console.log("The payment =====>", result)

    if (result.status === "paid") {
      const uploadedFile = await cloudinary.v2.uploader.upload(
        problemStatment,
        { resource_type: "raw", Folder: "ihuzo" },
        (error, result) => {
          if (error) {
            console.error("Upload error:", error)
          } else {
            console.log("Upload result:", result)
          }
        }
      )

      const requestApi = await prisma.request.create({
        data: {
          email,
          description,
          phoneNumber,
          company: camponyName,
          probleStatmentUrl: uploadedFile.secure_url,
          probleStatmentId: uploadedFile.public_id
        }
      })

      if (!requestApi) {
        return NextResponse.json(
          { error: true, message: "on Creating a request Error occurs" },
          { status: HttpStatusCode.BAD_REQUEST }
        )
      }

      await prisma.payment.create({
        data: {
          email,
          paymentRef: result.paymentRef,
          phoneNumber,
          requestId: requestApi.id
        }
      })

      await sendMail(
        "REQUEST API",
        email,
        `You have raised a request for an API on our platform @IHUZO 😇. We appreciate your participation and hope you will patiently await a response from our Back-end developer 🤝.`
      )

      return NextResponse.json(
        {
          error: true,
          message: "Your request has been saved successfully!! 😇"
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
    console.log("the error===>" + error)
    return NextResponse.json(
      { error: true, message: "An error occured. Please try again." },
      { status: HttpStatusCode.INTERNAL_SERVER }
    )
  }
}
