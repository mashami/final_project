import { prisma } from "@/lib/prisma"
import { HttpStatusCode } from "@/utils/enums"
import { hash } from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email, password, retypedPassword } = await req.json()

  // Check if all fields are sent from client
  if (!email || !password || !retypedPassword) {
    return NextResponse.json(
      { error: true, message: "All fields are required" },
      { status: HttpStatusCode.BAD_REQUEST }
    )
  }

  // Check if passwords match
  if (password !== retypedPassword) {
    return NextResponse.json(
      { error: true, message: "Passwords do not match" },
      { status: HttpStatusCode.BAD_REQUEST }
    )
  }

  try {
    // Check if Email already exists in DB
    const userWithEmail = await prisma.user.findFirst({
      where: { email }
    })

    if (userWithEmail) {
      return NextResponse.json(
        { error: true, message: "User with email already exists." },
        { status: HttpStatusCode.BAD_REQUEST }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Save user in DB
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: true, message: "Error creating user. Please try again" },
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
