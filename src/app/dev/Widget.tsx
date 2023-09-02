/* eslint-disable react/jsx-key */
"use client"
import Card from "@/components/Card/Card"
import NavBar from "@/components/NavBar/NavBar"
import { cn } from "@/lib/utils"
import { Api } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { svgs } from "../profile/Widget"
import { UserWithRelations } from "./[id]/page"

interface DevProfileWidgetProps {
  user: UserWithRelations
  getApiUser: Api[]
}

const DevProfileWidget = ({ user, getApiUser }: DevProfileWidgetProps) => {
  console.log("user Image ==>", user.profile_image)

  return (
    <div>
      <div className="">
        <NavBar />
      </div>

      <div className="py-8 px-4 flex justify-between  ">
        <div className=" w-96 h-full grid place-items-center py-8 space-y-4">
          <div className="grid gap-2 place-items-center">
            <div
              className={cn(
                "relative w-[100px] h-[100px] rounded-full overflow-hidden bg-brand border-[3px] border-white "
              )}
            >
              <Image
                src={user.profile_image ?? ""}
                fill
                priority
                style={{ objectFit: "cover" }}
                alt="cover-image"
              />
            </div>

            <span className="space-y-1 font-serif text-center">
              <p className=" font-semibold">{user.name}</p>

              <p className=" text-gray-500">{user.languages}</p>
            </span>
          </div>
          <div className="space-y-4 ">
            <p className="font-serif font-bold text-center">Your Socials</p>
            <div className="space-y-4">
              <span className="flex gap-2 justify-start px-4">
                <p>LinkdIn: </p>
                <a
                  className="text-sm text-purple-400"
                  href={`${user.linkedin}`}
                >
                  {user.linkedin}
                </a>
              </span>
              <span className="flex gap-2 justify-start px-4">
                <p>GitHub:</p>
                <a className="text-sm text-purple-400" href={`${user.github}`}>
                  {user.github}
                </a>
              </span>
              <span className="flex gap-2 justify-start px-4">
                <p>Email:</p>
                <a className="text-sm text-purple-400" href={`${user.email}`}>
                  {user.email}
                </a>
              </span>
            </div>
          </div>
        </div>

        <div className="z-0 space-y-12 px-4">
          <span className="text-center space-y-4 ">
            <h1>Description</h1>
            <p className="px-20"> {user.discription}</p>
          </span>
          <div className="flex-grow-0 flex justify-between items-center ">
            <h1>APIs</h1>
          </div>

          <div className=" grid grid-cols-3 gap-2 relative">
            {getApiUser.length ? (
              getApiUser.map((api) => {
                const randomIndex = Math.floor(Math.random() * svgs.length)

                return (
                  <Link href={""}>
                    <Card
                      title={api.title}
                      desc={api.discription}
                      svg={svgs[randomIndex]}
                    />
                  </Link>
                )
              })
            ) : (
              <p>You do not have API added yet</p>
            )}
          </div>
          <div className="absolute bottom-3 right-[30%] -z-10">
            <svg
              width={184}
              height={17}
              viewBox="0 0 184 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx={8} cy="8.5" r={8} fill="#2639ED" />
              <circle cx={50} cy="8.5" r={8} fill="#E7F0FC" />
              <circle cx={92} cy="8.5" r={8} fill="#E7F0FC" />
              <circle cx={134} cy="8.5" r={8} fill="#E7F0FC" />
              <circle cx={176} cy="8.5" r={8} fill="#E7F0FC" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DevProfileWidget
