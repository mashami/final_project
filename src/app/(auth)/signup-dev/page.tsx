/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { signUpDev } from "@/services/user"
import { Loader } from "lucide-react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import style from "../auth.module.scss"

const signupdev = () => {
  const [email, setEmail] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [linkedIn, setLinkedIn] = useState<string>("")
  const [gitHub, setGitHub] = useState<string>("")
  const [hostedLink, setHostedLink] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [retypePassword, setRetypePassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      !email ||
      !password ||
      !retypePassword ||
      !linkedIn ||
      !gitHub ||
      !hostedLink
    ) {
      toast({
        variant: "destructive",
        description: "All fields are required"
      })

      return
    }

    if (password !== retypePassword) {
      toast({
        variant: "destructive",
        description: "Passwords do not match"
      })

      return
    }

    setIsLoading(true)

    try {
      const data = await signUpDev({
        email,
        password,
        retypedPassword: retypePassword,
        github: gitHub,
        hostedlink: hostedLink,
        linkedin: linkedIn,
        phoneNumber
      })

      if (data.error) {
        toast({
          variant: "destructive",
          description: data.message
        })

        setIsLoading(false)

        return
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        toast({
          variant: "destructive",
          description: result.error
        })

        setIsLoading(false)

        return
      }

      router.push("/Home")
      setIsLoading(false)
    } catch (error) {
      toast({
        variant: "destructive",
        description: "An error occured. Please try again."
      })
      setIsLoading(false)
    }
  }

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

        <form
          onSubmit={onSubmitHandler}
          className="pt-12 pb-4 bg-white grid place-content-center space-y-4 rounded-lg shadow-2xl"
        >
          <h1>Sign up</h1>

          <p className="text-gray-400 text-sm">
            Enter your details to create account on this platform
          </p>
          <Input
            value={email}
            placeholder="Enter your Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            value={phoneNumber}
            placeholder="Enter your Phone number"
            type="text"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Input
            value={linkedIn}
            placeholder="Enter your LinkedIn profile link"
            type="text"
            onChange={(e) => setLinkedIn(e.target.value)}
          />
          <Input
            value={gitHub}
            placeholder="Enter your gitHub profile link"
            type="text"
            onChange={(e) => setGitHub(e.target.value)}
          />
          <Input
            value={hostedLink}
            placeholder="Enter your  one project hosted link"
            type="text"
            onChange={(e) => setHostedLink(e.target.value)}
          />
          <Input
            value={password}
            placeholder="Enter your password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            value={retypePassword}
            placeholder="Enter your Re-type password"
            type="password"
            onChange={(e) => setRetypePassword(e.target.value)}
          />
          {isLoading ? (
            <div className="px-4 py-4 flex justify-center w-full bg-blue-400 ">
              <Loader />
            </div>
          ) : (
            <Button
              text="Sign up"
              className="w-full bg-blue-400 hover:bg-blue-300 hover:duration-700 ease-in-out transition"
              loading={isLoading}
            />
          )}
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
