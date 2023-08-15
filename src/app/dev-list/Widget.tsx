"use client"

import DevsList from "@/components/DevsList/DevsList"
import NavBar from "@/components/NavBar/NavBar"
import { User } from "@prisma/client"

interface Devs_listWidget {
  usersActiveted: User[]
}

const Devs_listWidget = ({ usersActiveted }: Devs_listWidget) => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className=" pt-2">
        <DevsList devs={usersActiveted} />
      </div>
    </div>
  )
}

export default Devs_listWidget
