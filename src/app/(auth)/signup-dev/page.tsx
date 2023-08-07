"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import style from "../auth.module.scss"

const signupdev = () => {
  return (
    <div className=" grid place-items-center  py-8  w-full ">
      <div className="border rounded-md">
        <div
          className={`${style.headerBackgroundColor}  flex  items-center justify-center border`}
        >
          <div className="mt-28">
            <svg
              width={122}
              height={122}
              viewBox="0 0 122 122"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width={122} height={122} rx={61} fill="#F5F6FF" />
              <rect
                x="14.043"
                y="14.0435"
                width="93.913"
                height="93.913"
                rx="46.1327"
                fill="#E0E5FF"
              />
              <path
                d="M60.9983 39L77.4306 42.652C78.3457 42.8553 78.9967 43.6669 78.9967 44.6043V64.5778C78.9967 68.59 76.9916 72.3368 73.6535 74.5624L60.9983 83L48.3431 74.5624C45.005 72.3368 43 68.59 43 64.5778V44.6043C43 43.6669 43.651 42.8553 44.566 42.652L60.9983 39ZM60.9983 51C58.7893 51 56.9987 52.7909 56.9987 55C56.9987 56.4805 57.803 57.7732 58.9983 58.4648L58.9985 67H62.9981L63.0003 58.4636C64.1946 57.7716 64.998 56.4797 64.998 55C64.998 52.7909 63.2073 51 60.9983 51Z"
                fill="#4461FF"
              />
            </svg>
          </div>
        </div>

        <form className="pt-12 pb-4 bg-white grid place-content-center space-y-4 rounded-lg shadow-2xl">
          <h1>Sign up</h1>

          <p className="text-gray-400 text-sm">
            Enter your details to create account on this platform
          </p>
          <Input placeholder="Enter your Email" type="email" />
          <Input placeholder="Enter your Phone number" type="text" />
          <Input placeholder="Enter your LinkedIn profile link" type="text" />
          <Input placeholder="Enter your gitHub profile link" type="text" />
          <Input
            placeholder="Enter your  one project hosted link"
            type="text"
          />
          <Input type="file" alt="Image" />

          <Input placeholder="Enter your password" type="password" />
          <Input placeholder="Enter your Re-type password" type="password" />
          <Button
            text="Continue"
            className="w-full bg-blue-400 hover:bg-blue-300 hover:duration-700 ease-in-out transition"
          />
          <div className="flex justify-end items-center gap-2">
            <p>Already have account</p>
            <Link href={"/signin"} className="text-purple-400">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default signupdev
