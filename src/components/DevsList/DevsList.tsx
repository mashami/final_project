/* eslint-disable react/jsx-key */
"use client"

import Image from "next/image"

import { truncateDescription } from "@/utils/helpers"
import { User } from "@prisma/client"
import { DevCard } from "../DevCard"

interface DevsListProps {
  devs: User[]
}

const DevsList = ({ devs }: DevsListProps) => {
  return (
    <div className="px-24 w-full h-full -z-10 space-y-16">
      <div className="grid place-items-center">
        <h1>OUR BACK-END DEVELOPERS</h1>
      </div>
      <div className=" grid grid-cols-4 gap-2 place-items-center">
        <div>
          {devs.length ? (
            devs.map((dev) => (
              <DevCard
                image={
                  <Image
                    src={`${dev.profile_image}`}
                    alt="dev image"
                    width={500}
                    height={500}
                    className="w-full h-full rounded-full"
                  />
                }
                id={`${dev.id}`}
                name={`${dev.name}`}
                discription={truncateDescription(`${dev.discription}`, 100)}
                languages={`${dev.languages}`}
              />
            ))
          ) : (
            <p>There is not yet Back-end software yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default DevsList
