import { prisma } from "@/lib/prisma"
import { HttpStatusCode } from "@/utils/enums"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const apis = await prisma.api.findMany({
      where: { apiCategory: "Public", apiStatus: "Active" }
    })

    if (!apis) {
      return NextResponse.json(
        { error: true, message: "There is not yet APIs public" },
        { status: HttpStatusCode.BAD_REQUEST }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Apis fetched successfully.",
        apis
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
