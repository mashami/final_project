"use client"
import { Connect } from "@/components/Connect"
import ContactUs from "@/components/ContactUs/ContactUs"
import { Logo } from "@/components/Logo"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import "@/styles/globals.scss"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const customerHandlerOnclick = () => {
    router.push("/signup-user")
  }
  const devHandlerOnclick = () => {
    router.push("/signup-dev")
  }
  return (
    <main className=" p-12  h-full w-full relative z-0">
      <svg
        className="absolute top-0 left-0 -z-10"
        width={150}
        height={125}
        viewBox="0 0 150 125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="64.1794"
          cy="35.5584"
          rx="4.67939"
          ry="4.40413"
          fill="#FFF5DB"
        />
        <ellipse
          cx="111.823"
          cy="92.5975"
          rx="4.67939"
          ry="4.40413"
          fill="#6944D5"
        />
        <path
          d="M58.1619 75.0358C58.1619 77.8637 55.7588 80.2657 52.6567 80.2657C49.5546 80.2657 47.1515 77.8637 47.1515 75.0358C47.1515 72.2078 49.5546 69.8058 52.6567 69.8058C55.7588 69.8058 58.1619 72.2078 58.1619 75.0358Z"
          stroke="#6944D5"
          strokeWidth="3.3031"
        />
        <rect
          x="-1.5"
          y="12.8486"
          width="14.6581"
          height="14.6581"
          transform="rotate(-60 -1.5 12.8486)"
          fill="#D9CCFF"
        />
        <rect
          x="135.756"
          y="56.5752"
          width="8.27375"
          height="8.27375"
          transform="rotate(-60 135.756 56.5752)"
          stroke="#D9CCFF"
          strokeWidth="3.3031"
        />
        <path
          d="M60.5835 107.154L68.4501 120.367H52.717L60.5835 107.154Z"
          fill="#D9CCFF"
        />
        <path
          d="M126.462 14.5851L119.734 28.672L110.898 15.8014L126.462 14.5851Z"
          fill="#9A77FF"
        />
      </svg>
      <div className=" w-full flex justify-between items-center ">
        <Logo />
        <Button
          text="Get started"
          variant={"secondary"}
          className="rounded-full"
          onClick={() => router.push("/Home")}
          icon={
            <svg
              width={25}
              height={24}
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.3661 12.3381L14.1817 17.8381C14.0786 17.9474 13.9099 18.0006 13.7974 18.0006C13.6728 18.0006 13.5477 17.9576 13.4486 17.8707C13.237 17.6851 13.2213 17.3688 13.4137 17.1648L17.8099 12.5006H6.01893C5.73233 12.5006 5.50049 12.277 5.50049 12.0287C5.50049 11.7804 5.73239 11.5006 6.01893 11.5006H17.8096L13.4127 6.83494C13.2203 6.63085 13.236 6.31432 13.4476 6.12901C13.6598 5.94444 13.9873 5.9581 14.1804 6.16319L19.3648 11.6632C19.5442 11.8537 19.5442 12.1474 19.3661 12.3381Z"
                fill="white"
              />
            </svg>
          }
        />
      </div>
      <div className="flex justify-center items-center ">
        <span className="text-purple-500 ">
          <h1>Welcome to iHUZO</h1>
        </span>
      </div>

      <div className="flex justify-between items-center pt-4 px-8  in gap-12">
        <div className=" space-y-6">
          <h1 className="text-6xl text-center ">
            Connecting Devs with Employers
          </h1>
          <p className="text-gray-400 mx-20">
            This website serves as a bridge between developers and employers.
            Its primary objective is to showcase the work of backend developers
            and aggregate APIs from various backends and platforms. The platform
            features APIs contributed by both backend software developers and
            other platforms. However, the APIs created by our backend developers
            form the core offerings that will be made available for sale on this
            platform.
          </p>
          <div className="pt-5  flex items-center justify-center gap-16">
            <Dialog>
              <DialogTrigger>
                <Button text="Create account" className="rounded-lg" />
              </DialogTrigger>

              <DialogContent className="Background">
                <DialogHeader className="flex w-full items-center justify-center space-y-8">
                  <DialogTitle className="text-black font-serif leading-4">
                    DO YOU WANT TO JOIN US AS
                  </DialogTitle>
                  <DialogDescription className="flex flex-col gap-16 ">
                    <div className="space-y-4 text-gray-400">
                      <p>
                        Back-end Dev is like partner of our platform who will be
                        able to post his/her idea implemented in APIs on our
                        platform and he will be the one going to decide if
                        his/her idea will be for sell.
                      </p>
                      <p>
                        User Customer will be able to view all APIs from our
                        partner backed developer and collection from different
                        platforms and will be able to sign up as normal user to
                        be able to buy APIs on our platforms and get
                        notifications on her/his email.
                      </p>
                    </div>
                    <div className="space-x-24 flex justify-center">
                      <Button
                        text="Customer"
                        className="rounded-lg"
                        onClick={customerHandlerOnclick}
                      />
                      <Button
                        text="Back-end Dev"
                        className="rounded-lg"
                        onClick={devHandlerOnclick}
                      />
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Link
              href={"/signin"}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-lg bg-gray-100/10 hover:bg-purple-50 border ring-1 h-10  ring-purple-300"
              )}
            >
              Sign in
            </Link>
          </div>
          <div>
            <ContactUs />
          </div>
        </div>
        <div className="flex self-end justify-end pt-4">
          <Connect />
        </div>
      </div>
    </main>
  )
}
