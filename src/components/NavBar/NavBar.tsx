"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import "@/styles/globals.scss"
import { signOut } from "next-auth/react"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Logo } from "../Logo"
import { Button } from "../ui/button"

import style from "./NavBar.module.scss"

const NavBar = () => {
  const [selectValue, setSelectvalue] = useState<string>("")

  const router = useRouter()

  const SelectHandle = (value: string) => {
    if (value == "profile") {
      return router.push("/profile")
    }
    signOut({ callbackUrl: "/signin" })
  }
  return (
    <nav
      className={`${style.nav}  bg-transparent w-full px-24 flex justify-between items-center py-10 lg:mr-20 mx-auto relative -z-0`}
    >
      <svg
        className="absolute top-12 -right-16 -z-10"
        width={406}
        height={154}
        viewBox="0 0 406 154"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="402.5" cy="3.5" r="3.5" fill="#F4F4F4" />
        <circle cx="381.5" cy="3.5" r="3.5" fill="#FFF5DB" />
        <circle cx="360.5" cy="3.5" r="3.5" fill="#F4F4F4" />
        <circle cx="339.5" cy="3.5" r="3.5" fill="#FFF5DB" />
        <circle cx="318.5" cy="3.5" r="3.5" fill="#F4F4F4" />
        <circle cx="297.5" cy="3.5" r="3.5" fill="#FFF5DB" />
        <circle cx="276.5" cy="3.5" r="3.5" fill="#F4F4F4" />
        <circle cx="255.5" cy="3.5" r="3.5" fill="#F4F4F4" />
        <circle cx="234.5" cy="3.5" r="3.5" fill="#FFF5DB" />
        <circle cx="213.5" cy="3.5" r="3.5" fill="#F4F4F4" />
        <circle cx="402.5" cy="24.5" r="3.5" fill="#F4F4F4" />
        <circle cx="381.5" cy="24.5" r="3.5" fill="#F4F4F4" />
        <circle cx="360.5" cy="24.5" r="3.5" fill="#FFF5DB" />
        <circle cx="339.5" cy="24.5" r="3.5" fill="#F4F4F4" />
        <circle cx="318.5" cy="24.5" r="3.5" fill="#F4F4F4" />
        <circle cx="297.5" cy="24.5" r="3.5" fill="#F4F4F4" />
        <circle cx="276.5" cy="24.5" r="3.5" fill="#FFF5DB" />
        <circle cx="255.5" cy="24.5" r="3.5" fill="#F4F4F4" />
        <circle cx="234.5" cy="24.5" r="3.5" fill="#F4F4F4" />
        <circle cx="213.5" cy="24.5" r="3.5" fill="#F4F4F4" />
        <circle cx="402.5" cy="45.5" r="3.5" fill="#FFF5DB" />
        <circle cx="381.5" cy="45.5" r="3.5" fill="#F4F4F4" />
        <circle cx="360.5" cy="45.5" r="3.5" fill="#F4F4F4" />
        <circle cx="339.5" cy="45.5" r="3.5" fill="#F4F4F4" />
        <circle cx="318.5" cy="45.5" r="3.5" fill="#F4F4F4" />
        <circle cx="297.5" cy="45.5" r="3.5" fill="#F4F4F4" />
        <circle cx="276.5" cy="45.5" r="3.5" fill="#FFF5DB" />
        <circle cx="255.5" cy="45.5" r="3.5" fill="#F4F4F4" />
        <circle cx="234.5" cy="45.5" r="3.5" fill="#F4F4F4" />
        <circle cx="213.5" cy="45.5" r="3.5" fill="#F4F4F4" />
        <circle cx="402.5" cy="66.5" r="3.5" fill="#FFF5DB" />
        <circle cx="381.5" cy="66.5" r="3.5" fill="#F4F4F4" />
        <circle cx="360.5" cy="66.5" r="3.5" fill="#F4F4F4" />
        <circle cx="339.5" cy="66.5" r="3.5" fill="#FFF5DB" />
        <circle cx="318.5" cy="66.5" r="3.5" fill="#F4F4F4" />
        <circle cx="297.5" cy="66.5" r="3.5" fill="#F4F4F4" />
        <circle cx="276.5" cy="66.5" r="3.5" fill="#F4F4F4" />
        <circle cx="255.5" cy="66.5" r="3.5" fill="#F4F4F4" />
        <circle cx="234.5" cy="66.5" r="3.5" fill="#F4F4F4" />
        <circle cx="213.5" cy="66.5" r="3.5" fill="#FFF5DB" />
        <circle cx="402.5" cy="87.5" r="3.5" fill="#F4F4F4" />
        <circle cx="381.5" cy="87.5" r="3.5" fill="#F4F4F4" />
        <circle cx="360.5" cy="87.5" r="3.5" fill="#FFF5DB" />
        <circle cx="339.5" cy="87.5" r="3.5" fill="#F4F4F4" />
        <circle cx="318.5" cy="87.5" r="3.5" fill="#F4F4F4" />
        <circle cx="297.5" cy="87.5" r="3.5" fill="##FFF5DB" />
        <circle cx="276.5" cy="87.5" r="3.5" fill="#F4F4F4" />
        <circle cx="255.5" cy="87.5" r="3.5" fill="#F4F4F4" />
        <circle cx="234.5" cy="87.5" r="3.5" fill="#F4F4F4" />
        <circle cx="213.5" cy="87.5" r="3.5" fill="#F4F4F4" />
        <circle cx="402.5" cy="108.5" r="3.5" fill="#FFF5DB" />
        <circle cx="381.5" cy="108.5" r="3.5" fill="#F4F4F4" />
        <circle cx="360.5" cy="108.5" r="3.5" fill="#FFF5DB" />
        <circle cx="339.5" cy="108.5" r="3.5" fill="#F4F4F4" />
        <circle cx="318.5" cy="108.5" r="3.5" fill="#F4F4F4" />
        <circle cx="297.5" cy="108.5" r="3.5" fill="#F4F4F4" />
        <circle cx="276.5" cy="108.5" r="3.5" fill="#F4F4F4" />
        <circle cx="255.5" cy="108.5" r="3.5" fill="#F4F4F4" />
        <circle cx="234.5" cy="108.5" r="3.5" fill="#FFF5DB" />
        <circle cx="213.5" cy="108.5" r="3.5" fill="#F4F4F4" />
        <circle cx="402.5" cy="129.5" r="3.5" fill="#F4F4F4" />
        <circle cx="381.5" cy="129.5" r="3.5" fill="#F4F4F4" />
        <circle cx="360.5" cy="129.5" r="3.5" fill="#FFF5DB" />
        <circle cx="339.5" cy="129.5" r="3.5" fill="#F4F4F4" />
        <circle cx="318.5" cy="129.5" r="3.5" fill="#F4F4F4" />
        <circle cx="297.5" cy="129.5" r="3.5" fill="#FFF5DB" />
        <circle cx="276.5" cy="129.5" r="3.5" fill="#F4F4F4" />
        <circle cx="255.5" cy="129.5" r="3.5" fill="#F4F4F4" />
        <circle cx="234.5" cy="129.5" r="3.5" fill="#F4F4F4" />
        <circle cx="213.5" cy="129.5" r="3.5" fill="#FFF5DB" />
        <circle cx="402.5" cy="150.5" r="3.5" fill="#F4F4F4" />
        <circle cx="381.5" cy="150.5" r="3.5" fill="#F4F4F4" />
        <circle cx="360.5" cy="150.5" r="3.5" fill="#FFF5DB" />
        <circle cx="339.5" cy="150.5" r="3.5" fill="#F4F4F4" />
        <circle cx="318.5" cy="150.5" r="3.5" fill="#F4F4F4" />
        <circle cx="297.5" cy="150.5" r="3.5" fill="#FFF5DB" />
        <circle cx="276.5" cy="150.5" r="3.5" fill="#F4F4F4" />
        <circle cx="255.5" cy="150.5" r="3.5" fill="#F4F4F4" />
        <circle cx="234.5" cy="150.5" r="3.5" fill="#FFF5DB" />
        <circle cx="213.5" cy="150.5" r="3.5" fill="#F4F4F4" />
      </svg>

      <div>
        <span className="text-gray-500 font-light font-serif">
          <Logo />
        </span>
      </div>
      <div>
        <ul className="w-full h-full  flex justify-center items-center">
          <li className="hover:text-purple-300 focus:text-purple-300">
            <a href="/Home">Home</a>
          </li>

          <li className="hover:text-purple-300">
            <a href="/dev-list">Developer</a>
          </li>
          <li className="hover:text-purple-300">
            <a href="/apis">API</a>
          </li>
          <li className="hover:text-purple-300">
            <a href="">Requests</a>
          </li>
          <li className="hover:text-purple-300">
            <a href="/service">Service</a>
          </li>
          <li>
            <Select
              onValueChange={(value) => {
                setSelectvalue(value)
                SelectHandle(value)
              }}
            >
              <SelectTrigger className=" text-1xl py-0 my-0">
                <SelectValue
                  placeholder="Settings"
                  className="h-full justify-center items-center"
                />
              </SelectTrigger>
              <SelectContent className="background text-sm ">
                <SelectGroup>
                  {options.map((item) => (
                    <SelectItem
                      className="text-sm hover:bg-purple-50 "
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </li>
        </ul>
      </div>
      <div className="flex gap-6">
        <Button
          text="Sign in"
          onClick={() => router.push("/signin")}
          className="rounded-lg bg-gray-100/10 hover:bg-purple-50 border ring-1  ring-purple-300"
          variant={"outline"}
        />
        <Button
          text="Sign up"
          onClick={() => router.push("/")}
          className="rounded-lg"
        />
      </div>
    </nav>
  )
}

export default NavBar

const options = [
  {
    label: "Profile",
    value: "profile"
  },
  {
    label: "Logout",
    value: "logout"
  }
]
