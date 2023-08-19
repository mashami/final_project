import { getApisUser, getUnActiveAPis } from "@/services/api"
import { getUnctiveDev, getUser } from "@/services/user"
import { Api, Prisma } from "@prisma/client"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"
import AdminDashboard from "./Admin_widget"
import DevProfileWidget from "./Widget"

export type UserWithRelations = Prisma.UserGetPayload<{
  include: { apis: true }
}>
const Profile = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return redirect("/signin")
  }
  const userId = session?.user?.id as string

  const data = await getUser(userId)
  const user = data.user as UserWithRelations

  const unctiveUser = await getUnctiveDev(userId)
  const usersUctive = unctiveUser.users as UserWithRelations[]

  const apiData = await getUnActiveAPis()
  const apiUnctive = apiData.apis as Api[]

  const apisUser = await getApisUser(userId)
  const getApiUser = apisUser.apis as Api[]

  // const u = await getUser(apiData.apis.ownerId)
  // console.log("uuuuuu====>", u)

  // const userWithApi = u.user as UserWithRelations
  // console.log("The Name ===>", userWithApi)

  if (user.status === "Dev" && user.dev_status === "Active") {
    return <DevProfileWidget user={user} getApiUser={getApiUser} />
  } else if (user.status === "Admin") {
    return <AdminDashboard unctiveUser={usersUctive} apiUnctive={apiUnctive} />
  } else if (user.status === "Dev" && user.dev_status === "Unctive") {
    return (
      <div className="w-screen h-screen grid place-content-center text-center space-y-4">
        <p className="text-[20px]">Wait for admin for approved you</p>
        <Link href={"/Home"} className="text-purple-500">
          Click here to containue
        </Link>
      </div>
    )
  } else return redirect("/Home")
}

export default Profile
