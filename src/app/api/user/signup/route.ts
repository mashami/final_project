import { prisma } from "@/lib/prisma"
import { HttpStatusCode } from "@/utils/enums"
import { sendMail } from "@/utils/mailService"
import { hash } from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const {
    email,
    phoneNumber,
    linkedin,
    github,
    hostedlink,

    password,
    retypedPassword
  } = await req.json()

  // Check if all fields are sent from client
  if (
    !email ||
    !password ||
    !retypedPassword ||
    !phoneNumber ||
    !linkedin ||
    !github ||
    !hostedlink
  ) {
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
        phone: phoneNumber,
        linkedin: linkedin,
        github: github,
        hostedlink: hostedlink,
        password: hashedPassword,
        status: "Dev"
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: true, message: "Error creating user. Please try again" },
        { status: HttpStatusCode.BAD_REQUEST }
      )
    }
    await sendMail(
      "Developer Sign up",
      "mashamipaccy04@gmail.com",
      `There is a developer whose email :${user.email} need to be approved `
    )
    return NextResponse.json(
      {
        success: true,
        message: "Creating an account successfully."
      },
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
