"use client"
import { Connect } from "@/components/Connect"
import ContactUs from "@/components/ContactUs/ContactUs"
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

export default function Home() {
  return (
    <main className=" container h-full w-full relative">
      <div className=" absolute right-3 -top-3">
        <Button
          text="Continue"
          variant={"secondary"}
          className="rounded-full"
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
      <div className="flex justify-center mt-16">
        <h1 className="text-purple-500">WELCOME TO iHUZO </h1>
      </div>

      <div className="flex justify-between items-center pt-4 px-8  in gap-16">
        <div className=" space-y-4">
          <h1 className="text-6xl text-center ">
            Connecting Devs with Employers
          </h1>
          <p className="text-gray-400 mx-28">
            This website connecting Devs with Employers and also collect APIs
            from back-ends platform. This website platform have APIs from
            backend software developer and from different platforms but APIs
            from our backend developers will be the implemented idea in APIs
            which going to be sell them on my platform.
          </p>
          <div className="pt-16 flex items-center justify-center gap-16 fill-red-500">
            <Dialog>
              <DialogTrigger>
                <Button text="Create account" className="rounded-lg" />
              </DialogTrigger>

              <DialogContent className="Background">
                <DialogHeader className="flex w-full items-center justify-center space-y-8">
                  <DialogTitle className="text-black font-serif leading-4">
                    DO YOU WANT TO JOIN AS{" "}
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
                      <Button text="Customer" className="rounded-lg" />
                      <Button text="Back-end Dev" className="rounded-lg" />
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Link
              href={"/signin"}
              className={cn(
                buttonVariants({ variant: "default" }),
                "px-4 rounded-lg"
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
