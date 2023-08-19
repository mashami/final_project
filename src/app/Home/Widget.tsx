/* eslint-disable react/jsx-key */
"use client"
import Card from "@/components/Card/Card"
import { Devs } from "@/components/Devs"
import NavBar from "@/components/NavBar/NavBar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { truncateDescription } from "@/utils/helpers"
import { Api } from "@prisma/client"
import Link from "next/link"
import { svgs } from "../apis/Widget"

interface HomeWidgetProps {
  apis: Api[]
}

const HomeWidget = ({ apis }: HomeWidgetProps) => {
  return (
    <div className="min-h-screen overflow-hidden">
      <NavBar />
      <div className="flex items-center justify-between">
        <div className="space-y-8 mt-8 px-12 text-center relative z-10">
          <h1>Collections of APIs</h1>
          <p className=" z-0">
            Leading digital agency with solid design and development expertise.
            We build ready made websites, mobile applications, and elaborate
            online business services.
          </p>

          <div className="bg-[#F4F9FF] rounded-full w-96 h-24 flex items-center justify-between px-4">
            <input
              type="seach"
              placeholder="Search APIs cotegory"
              className="mx-4 flex items-center flex-1 outline-none bg-transparent "
            />
            <Button
              text="Search"
              variant={"default"}
              className="flex rounded-full"
              icon={
                <svg
                  className="w-[18px] h-[18px]"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.75 15.75L11.25 11.25M12.75 7.5C12.75 10.3995 10.3995 12.75 7.5 12.75C4.60051 12.75 2.25 10.3995 2.25 7.5C2.25 4.60051 4.60051 2.25 7.5 2.25C10.3995 2.25 12.75 4.60051 12.75 7.5Z"
                    stroke="#71717A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
          </div>
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
              href={""}
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
