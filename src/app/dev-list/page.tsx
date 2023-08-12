"use client"

import DevsList from "@/components/DevsList/DevsList"
import NavBar from "@/components/NavBar/NavBar"

const devs_list = () => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className=" pt-2">
        <DevsList />
      </div>
    </div>
  )
}

export default devs_list
