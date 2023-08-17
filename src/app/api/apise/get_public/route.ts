import { prisma } from "@/lib/prisma"
import { HttpStatusCode } from "@/utils/enums"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const users = await prisma.api.findMany({
      where: { apiCategory: "Public", apiStatus: "Active" }
    })

    return NextResponse.json(
      {
        success: true,
        message: "Apis fetched successfully.",
        users
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
