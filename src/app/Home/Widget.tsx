/* eslint-disable react/jsx-key */
"use client"
import Card from "@/components/Card/Card"
import { Devs } from "@/components/Devs"
import { FormField } from "@/components/FormField"
import { Logo } from "@/components/Logo"
import NavBar from "@/components/NavBar/NavBar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { requestApi } from "@/services/api"
import { fileToDataURI2, truncateDescription } from "@/utils/helpers"
import { Api } from "@prisma/client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { svgs } from "../apis/Widget"
interface HomeWidgetProps {
  apis: Api[]
}

const HomeWidget = ({ apis }: HomeWidgetProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [email, setEmail] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [company, setCompany] = useState<string>("")
  const [uploadedFile, setUploadedFile] = useState<string>("")
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState<boolean>(false)
  const [numberPay, setNumberPay] = useState<string>(phoneNumber)
  const [amount, setAmount] = useState<number>(100)

  const onSubmitRequestHandle = () => {
    if (!email || !phoneNumber || !description || !company || !uploadedFile) {
      return toast({
        variant: "destructive",
        description: "All field required"
      })
    }
    return (
      setNumberPay(phoneNumber),
      setIsDialogOpen(false),
      setIsPaymentDialogOpen(true)
    )
  }

  const router = useRouter()

  const isMutating = isLoading || isPending

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.stopPropagation()
    const file = event.target.files?.[0]

    if (!file) {
      return null
    }

    const uri = (await fileToDataURI2(file)) as any

    if (uri?.error) return console.log(uri.error)

    setUploadedFile(uri)
  }
  const submitHandle = async () => {
    if (
      !email ||
      !phoneNumber ||
      !description ||
      !company ||
      !uploadedFile ||
      !numberPay
    ) {
      return toast({
        variant: "destructive",
        description: "All field from  front End required"
      })
    }

    setIsLoading(true)

    try {
      const data = await requestApi({
        amount,
        camponyName: company,
        description,
        email,
        phoneNumber,
        numberPay,
        problemStatment: uploadedFile
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
        setEmail("")
        setDescription("")
        setAmount(0)
        setCompany("")
        setNumberPay("")
        setUploadedFile("")
        setPhoneNumber("")
        setIsDialogOpen(false)
        setIsPaymentDialogOpen(false)
        setIsLoading(false)
      })
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
      <div className="min-h-screen fixed">
        <NavBar />
        <div className="flex items-center justify-between mt-14">
          <div className="space-y-8 mt-8 px-12 text-center relative z-10 ">
            <h1>Request for API</h1>
            <p className=" z-0">
              Leading digital agency with solid design and development
              expertise. We build ready made websites, mobile applications, and
              elaborate online business services.
            </p>

            <Button
              text="Request API"
              variant={"default"}
              className=" flex-grow-0 self-center"
              onClick={() => setIsDialogOpen(true)}
            />
            <svg
              className="absolute -top-12 -z-20"
              width={178}
              height={178}
              viewBox="0 0 178 178"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.78"
                d="M0 100C0 44.7715 44.7715 0 100 0H178V178H0V100Z"
                fill="#FFF5DB"
              />
            </svg>
            <div className="space-y-4 grid place-items-center">
              <span className="space-y-4">
                <h1>Back-end developers</h1>
                <p className="text-center">
                  Our partner of our platform That his/her idea implemented in
                  APIs on our platform
                </p>
              </span>

              <Link href={"/dev-list"} className=" relative cursor-pointer ">
                <p className="text-purple-500 py-3 hover:text-purple-200 hover:duration-75 ease-in-out transition">
                  Click here to view them
                </p>
                <Devs />
                {/* this one in the m middle */}
                <svg
                  className="absolute lg:block hidden bottom-[25%] left-[25%] -z-20"
                  width={184}
                  height={114}
                  viewBox="0 0 184 184"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx={92} cy={92} r={92} fill="#FFF5DB" />
                </svg>
              </Link>
            </div>
          </div>

          <CardList apis={apis} />
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="Background">
          <Logo />
          <DialogHeader className="flex w-full items-center justify-center space-y-8">
            <DialogTitle className="text-black font-serif leading-4">
              REQUEST API
            </DialogTitle>
            <DialogDescription
              key={""}
              className="flex flex-col space-y-4 "
              onSubmit={onSubmitRequestHandle}
            >
              <div className="space-y-4 ">
                <FormField
                  label="Email"
                  type="email"
                  value={email}
                  placeholder="Enter your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormField
                  label="Phone Number"
                  type="text"
                  value={phoneNumber}
                  placeholder="Enter your Email"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <FormField
                  label="Company Name"
                  type="text"
                  value={company}
                  placeholder="Enter your Campony's name"
                  onChange={(e) => setCompany(e.target.value)}
                />
                <FormField
                  label="Description"
                  type="text"
                  value={description}
                  placeholder="Enter a simple desription"
                  onChange={(e) => setDescription(e.target.value)}
                  isTextArea={true}
                />

                <span className="space-y-2">
                  <Label>Problem statment</Label>
                  <Input
                    id="problemStatment"
                    type="file"
                    onChange={handleFileChange}
                    max={1}
                  />
                </span>
              </div>

              <span className="flex justify-between items-center my-4">
                <Button
                  text="Cancel"
                  // loading={isLoading}
                  className="rounded-full bg-gray-300 text-black hover:bg-gray-200"
                  onClick={() => setIsDialogOpen(false)}
                />

                <Button
                  text="Submit"
                  className="rounded-lg"
                  onClick={onSubmitRequestHandle}
                />
              </span>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="Background">
          <Logo />
          <DialogHeader className="flex w-full items-center justify-center space-y-8">
            <DialogTitle className="text-black font-serif leading-4 ">
              PAYMENT
            </DialogTitle>
            <DialogDescription
              className="flex flex-col space-y-4 w-[300px]"
              onSubmit={submitHandle}
            >
              <span className="space-y-8">
                <FormField
                  label="Phone Number"
                  type="test"
                  value={numberPay}
                  placeholder="Enter your phone number use to pay"
                  onChange={(e) => setNumberPay(e.target.value)}
                />
                <FormField
                  label="Amount"
                  type="number"
                  value={amount}
                  disabled={true}
                  onChange={() => setAmount(100)}
                />
              </span>

              <span className="flex justify-between items-center">
                <Button
                  text="Cancel"
                  // loading={isLoading}
                  className="rounded-full bg-gray-300 text-black hover:bg-gray-200"
                  onClick={() => setIsPaymentDialogOpen(false)}
                />

                <Button
                  text="Pay"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={24}
                      viewBox="0 -960 960 960"
                      fill="white"
                      width={24}
                    >
                      <path d="M539.135-466.769q-31.866 0-53.654-21.789-21.789-21.788-21.789-53.846 0-32.058 21.827-53.596 21.828-21.539 53.888-21.539 31.645 0 53.35 21.684 21.705 21.683 21.705 53.538 0 31.855-21.475 53.702-21.474 21.846-53.852 21.846ZM294.769-339.077q-25.384 0-43.461-18.077-18.077-18.077-18.077-43.461v-283.078q0-25.384 18.077-43.461 18.077-18.077 43.461-18.077H784q25.385 0 43.462 18.077t18.077 43.461v283.078q0 25.384-18.077 43.461-18.077 18.077-43.462 18.077H294.769ZM332.923-376h412.923q0-26.346 18.439-44.866 18.438-18.519 44.331-18.519v-205.538q-26.231 0-44.501-18.615-18.269-18.616-18.269-44.77H332.923q0 26.346-18.438 44.866-18.439 18.519-44.331 18.519v205.538q26.231 0 44.5 18.616 18.269 18.615 18.269 44.769Zm395.385 155.077H176q-25.385 0-43.462-18.077t-18.077-43.461V-628h36.923v345.539q0 9.23 7.693 16.923 7.692 7.692 16.923 7.692h552.308v36.923ZM294.769-376h-24.615v-332.308h24.615q-10 0-17.307 7.308-7.308 7.308-7.308 17.307v283.078q0 10 7.308 17.307Q284.769-376 294.769-376Z" />
                    </svg>
                  }
                  loading={isMutating}
                  className="rounded-lg"
                  onClick={submitHandle}
                />
              </span>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default HomeWidget

const CardList = ({ apis }: HomeWidgetProps) => {
  return (
    <div className="lg:container  gap-2 grid lg:grid-cols-2 justify-center items-center lg:space-y-0 relative  ">
      {apis &&
        apis.map((api, mapIndex) => {
          const randomIndex = Math.floor(Math.random() * svgs.length)

          return (
            <Link
              href={`/getApi/[id]`}
              as={`getApi/${api.id}`}
              className={cn(
                `relative    `,
                mapIndex === 0 || mapIndex === 2 ? "-bottom-[4.125rem]" : ""
              )}
            >
              <Card
                title={api.title}
                desc={truncateDescription(`${api.discription}`, 50)}
                svg={svgs[randomIndex]}
              />
            </Link>
          )
        })}
      <svg
        className="absolute lg:block hidden -z-20 -bottom-56 right-0 "
        width={960}
        height={960}
        viewBox="0 0 1047 619"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 150C0 67.1573 67.1573 0 150 0H1047V619H0V150Z"
          fill="#F4F9FF"
        />
      </svg>
    </div>
  )
}
