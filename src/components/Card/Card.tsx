"use client"
import { cn } from "@/lib/utils"
import "@/styles/globals.scss"
import Link from "next/link"
import React from "react"
interface CardProps {
  svg: React.ReactNode
  title: string
  desc: string
  backgroundColor?: string
  className?: string
}

const Card = ({ svg, title, desc, backgroundColor, className }: CardProps) => {
  return (
    <div className="flex flex-col justify-between space-y-2 pb-14  w-[308px]  border rounded-3xl shadow-sm bg-white">
      <div
        className={cn(
          `mt-[39px] mx-[94px] rounded-3xl pb-5 bg-[#FFF7E3]`,
          backgroundColor,
          className
        )}
      >
        <div className={`pl-5 flex self-center pt-2`}>{svg}</div>
      </div>
      <div>
        <Link href="">
          <h2 className="mx-auto text-center font-bold px-14">{title}</h2>
        </Link>
      </div>
      <div>
        <p className="text-center mx-7">{desc}</p>
      </div>
    </div>
  )
}

export default Card
