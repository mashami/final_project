import { prisma } from "@/lib/prisma"
import cloudinary from "@/utils/cloudinary"
import { HttpStatusCode } from "@/utils/enums"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { userId, profile_image } = await req.json()

  if (!userId) {
    return NextResponse.json(
      { error: true, message: "UserId is required" },
      { status: HttpStatusCode.BAD_REQUEST }
    )
  }

  if (!profile_image) {
    return NextResponse.json(
      { error: true, message: "Profile image is required" },
      { status: HttpStatusCode.BAD_REQUEST }
    )
  }

  try {
    // get old image and delete it
    const user = await prisma.user.findFirst({
      where: { id: userId }
    })

    const oldprofileImageId = user?.profile_image_id

    if (oldprofileImageId) {
      await cloudinary.v2.uploader.destroy(oldprofileImageId)
    }

    // save new image and upload
    const uploadedImage = await cloudinary.v2.uploader.upload(profile_image, {
      folder: "ihuzo"
    })

    // update user in DB
    await prisma.user.update({
      where: { id: userId },
      data: {
        profile_image: uploadedImage.secure_url,
        profile_image_id: uploadedImage.public_id,
        updatedAt: new Date()
      }
    })

    return NextResponse.json(
      {
        success: true,
        message: "Profile image has been updated successfully."
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
