import { prisma } from "@/lib/prisma"
import cloudinary from "@/utils/cloudinary"
import { HttpStatusCode } from "@/utils/enums"
import { sendMail } from "@/utils/mailService"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const {
    ownerId,
    discription,
    languages,
    apiDocumentationLink,
    title,
    price,
    apiUrl,
    apiCategory
  } = await req.json()

  if (
    !ownerId ||
    !discription ||
    !languages ||
    !apiDocumentationLink ||
    !title ||
    !apiUrl ||
    !apiCategory
  ) {
    return NextResponse.json(
      { error: true, message: "User Id are required" },
      { status: HttpStatusCode.BAD_REQUEST }
    )
  }
  const userFind = await prisma.user.findFirst({
    where: { id: ownerId }
  })

  if (!userFind) {
    return NextResponse.json(
      { error: true, message: "User Id is not exit" },
      { status: HttpStatusCode.BAD_REQUEST }
    )
  }
  // console.log("my apiUrl ==>", apiUrl)
  // const uploadedFile = await cloudinary.v2.uploader.upload(apiUrl, {
  //   Folder: "ihuzo"
  // })

  const uploadedFile = await cloudinary.v2.uploader.upload(
    apiUrl,
    { resource_type: "raw", Folder: "ihuzo" },
    (error, result) => {
      if (error) {
        console.error("Upload error:", error)
      } else {
        console.log("Upload result:", result)
      }
    }
  )

  try {
    await prisma.api.create({
      data: {
        ownerId: userFind?.id,

        discription,

        languages,

        apiDocumentationLink,

        title,

        price,

        apiCategory,

        apiId: uploadedFile.public_id,

        apiUrl: uploadedFile.secure_url
      }
    })
    await sendMail(
      "API added request",
      "mashamipaccy04@gmail.com",
      `There is a api added from developer whose Email is :${userFind.email} need to be approved `
    )

    return NextResponse.json(
      { success: true, message: "API added successfull" },
      { status: HttpStatusCode.OK }
    )
  } catch (error) {
    console.log("the error===>" + error)
    return NextResponse.json(
      { error: true, message: "An error occured. Please try again." },
      { status: HttpStatusCode.INTERNAL_SERVER }
    )
  }
}
