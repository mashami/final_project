import { getUnctiveDev, getUser } from "@/services/user"
import { Prisma } from "@prisma/client"
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

  if (user.status === "Dev" && user.dev_status === "Active") {
    return <DevProfileWidget user={user} />
  } else if (user.status === "Admin") {
    return <AdminDashboard unctiveUser={usersUctive} />
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
