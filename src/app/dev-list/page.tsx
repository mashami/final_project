"use client"

import DevsList from "@/components/DevsList/DevsList"
import NavBar from "@/components/NavBar/NavBar"

const devs_list = () => {
  return (
    <div>
      <div className="fixed w-full top-0">
        <NavBar />
      </div>
      <div className="mt-32 ">
        <DevsList />
      </div>
    </div>
  )
}

export default devs_list
