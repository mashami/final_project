import { getActiveDev } from "@/services/user"
import { User } from "@prisma/client"
import Devs_listWidget from "./Widget"

const devs_list = async () => {
  const ActiveUser = await getActiveDev()
  const usersActiveted = ActiveUser.users as User[]
  return (
    <div>
      <Devs_listWidget usersActiveted={usersActiveted} />
    </div>
  )
}

export default devs_list
