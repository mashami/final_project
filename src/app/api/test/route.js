import { NextResponse } from "next/server"

var Paypack = require("paypack-js")

Paypack.config({
  client_id: "25dfd0e8-43ea-11ee-9720-deaddb65b9c2",
  client_secret:
    "441206aa644232c610575be203114c7eda39a3ee5e6b4b0d3255bfef95601890afd80709"
})

export async function POST(req) {
  const { amount, phoneNumber } = await req.json()

  try {
    const response = await Paypack.cashin({
      number: phoneNumber,
      amount,
      environment: process.env.NODE_ENV
    })

    console.log(response)

    return NextResponse.json(
      {
        error: true,
        message: "Hello just testing"
      },
      {
        status: 200
      }
    )
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        error: true,
        message: error.message
      },
      {
        status: 400
      }
    )
  }
}
