/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { FormField } from "@/components/FormField"
import { Loader } from "@/components/Loader"
import { Logo } from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import "@/styles/globals.scss"
import { useRouter } from "next/navigation"
import { useState } from "react"

const signInPage = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [amount, setAmount] = useState<string>("")

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!amount || !phoneNumber) {
      toast({
        variant: "destructive",
        description: "All fields are required"
      })

      return
    }

    setIsLoading(true)

    try {
      router.push("/profile")
    } catch (error) {
      toast({
        variant: "destructive",
        description: "An error occured. Please try again."
      })

      setIsLoading(false)
    }
  }
  return (
    <div className=" h-screen  grid place-items-center py-12 w-full">
      <div className="border rounded-lg shadow-lg">
        <div className={`  flex  items-center justify-center`}>
          <div className=" w-full h-full bg-white flex items-center justify-center pt-12">
            <Logo />
          </div>
        </div>
        <div className=" rounded-lg  shadow-lg">
          <form
            className="  p-16 bg-white grid place-content-center space-y-4 "
            onSubmit={onSubmitHandler}
          >
            <h1 className="text-2xl">Payment Form</h1>

            <p className="opacity-30">Enter Required details to make payment</p>
            <FormField
              label="Phone number"
              type="text"
              value={phoneNumber}
              placeholder="Enter you phone number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <FormField
              label="Amount"
              type="text"
              value={amount}
              placeholder="Enter your Amount"
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="w-full flex justify-end">
              {isLoading ? (
                <div className="px-4 py-4 flex justify-center items-center w-1/2 rounded-lg bg-blue-400 ">
                  <Loader className="" />
                </div>
              ) : (
                <Button
                  text="Pay"
                  className="w-1/2 bg-blue-400 hover:bg-blue-300 hover:duration-700 ease-in-out transition"
                  loading={isLoading}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default signInPage
