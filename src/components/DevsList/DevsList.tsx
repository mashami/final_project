"use client"

import Image from "next/image"

import { DevCard } from "../DevCard"

const DevsList = () => {
  return (
    <div className="px-24 w-full h-full -z-10 space-y-16">
      <div className="grid place-items-center">
        <h1>OUR BACK-END DEVELOPERS</h1>
      </div>
      <div className=" grid grid-cols-4 gap-2 place-items-center">
        <div>
          <DevCard
            image={
              <Image
                src="/paccyImage.png"
                alt="dev image"
                width={500}
                height={500}
                className="w-full h-full rounded-full"
              />
            }
            name="MASHAMI Paccy"
            discription="simple discriptions"
            languages="Django"
          />
        </div>
        <div>
          <DevCard
            discription="I'm software ingeener in java"
            name="MURENZI"
            languages="Javascript"
          />
        </div>
        <div>
          <DevCard
            discription="I'm software ingeener in java"
            name="MUGABO"
            languages="Javascript"
          />
        </div>
        <div>
          <DevCard
            discription="I'm software ingeener in java"
            name="MUGABO"
            languages="Javascript"
          />
        </div>
        <div>
          <DevCard
            discription="I'm software ingeener in java"
            name="MUGABO"
            languages="Javascript"
          />
        </div>
        <div>
          <DevCard
            discription="I'm software ingeener in java"
            name="MUGABO"
            languages="Javascript"
          />
        </div>
        <div>
          <DevCard
            discription="I'm software ingeener in java"
            name="MUGABO"
            languages="Javascript"
          />
        </div>
        <div>
          <DevCard
            discription="I'm software ingeener in java"
            name="MUGABO"
            languages="Javascript"
          />
        </div>
        <div>
          <DevCard
            discription="I'm software ingeener in java"
            name="MUGABO"
            languages="Javascript"
          />
        </div>
        <div>
          <DevCard
            discription="I'm software ingeener in java"
            name="MUGABO"
            languages="Javascript"
          />
        </div>
        <div>
          <DevCard
            discription="I'm software ingeener in java"
            name="MUGABO"
            languages="Javascript"
          />
        </div>
        <div>
          <DevCard
            discription="I'm software ingeener in java"
            name="MUGABO"
            languages="Javascript"
          />
        </div>
        <div>
          <DevCard
            discription="I'm software ingeener in java"
            name="MUGABO"
            languages="Javascript"
          />
        </div>
      </div>
    </div>
  )
}

export default DevsList
