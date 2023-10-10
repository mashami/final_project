/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { FormField } from "@/components/FormField"
import { Loader } from "@/components/Loader"
import { Logo } from "@/components/Logo"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { privateAPIPay } from "@/services/api"
import "@/styles/globals.scss"
import { useRouter } from "next/navigation"
import { startTransition, useState } from "react"

interface PaymentWidgetProps {
  amounts: string
  number: string
  apiId: string
  email: string
}

const PaymentWidget = ({
  amounts,
  number,
  apiId,
  email
}: PaymentWidgetProps) => {
  const [phoneNumber, setPhoneNumber] = useState<string>(number)
  const [amount, setAmount] = useState<string>(amounts)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email || !phoneNumber || !apiId || !amount) {
      return toast({
        variant: "destructive",
        description: "All field from  front End required"
      })
    }

    const cleanedPriceString = amount.replace(/[%2C,]/g, "")
    const priceNumber = parseFloat(cleanedPriceString)

    setIsLoading(true)
    try {
      const data = await privateAPIPay({
        email,
        phoneNumber,
        apiId,
        amount: priceNumber
      })

      if (data.error) {
        toast({
          variant: "destructive",
          description: data.message
        })

        setIsLoading(false)

        return
      }

      startTransition(() => {
        router.refresh()

        toast({
          description: data.message
        })
        setIsLoading(false)
      })
      setAmount("")
      setPhoneNumber("")
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
    <>
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

              <p className="opacity-30">
                Enter Required details to make payment
              </p>
              <FormField
                label="Phone number"
                type="number"
                value={phoneNumber}
                disabled={isLoading}
                placeholder="Enter you phone number"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <FormField
                label="Amount"
                type="text"
                disabled
                value={amount}
                placeholder="Enter your Amount"
                onChange={(e) => setAmount(e.target.value)}
                className="select-none"
              />
              <div className="w-full flex justify-between items-center">
                <Button
                  text="Cancel"
                  disabled={isLoading}
                  className=" bg-gray-400 hover:bg-gray-300 hover:duration-700 ease-in-out transition"
                  onClick={() => router.back()}
                />
                {isLoading ? (
                  <div className="px-4 py-4 flex justify-center items-center w-1/2 rounded-lg bg-blue-400 ">
                    <Loader className="" />
                  </div>
                ) : (
                  <Button
                    text="Pay"
                    className=" w-1/3 bg-blue-400 hover:bg-blue-300 hover:duration-700 ease-in-out transition"
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <Dialog open={isLoading} onOpenChange={setIsLoading}>
        <DialogContent className="grid place-items-center w-full Background">
          <Logo />
          <DialogDescription className=" grid place-items-center w-full space-y-2 ">
            <h1 className="mb-4"> Check your phone</h1>
            <p className="text-base">Did you reiceve the message?</p>
            <p className="text-gray-400">
              If not, write this in your phone to check your message for
              payment:
            </p>
            <p className="text-2xl font-bold pt-5 ">*182*7*1#</p>
            <p className="text-center">You have only 30 secs</p>
          </DialogDescription>
          <DialogFooter className=" py-8">
            <Loader />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PaymentWidget
