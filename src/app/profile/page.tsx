import {
  getApisUser,
  getRequestActive,
  getRequests,
  getUnActiveAPis
} from "@/services/api"
import { getActiveDev, getUnctiveDev, getUser } from "@/services/user"
import { Api, Prisma, Request } from "@prisma/client"
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

  const ActiveUser = await getActiveDev()
  const usersActiveted = ActiveUser.users as UserWithRelations[]

  const requestData = await getRequests()

  const requests = requestData.requests as Request[]

  const requestDataActive = await getRequestActive()

  const requestsActive = requestData.requests as Request[]

  if (user.status === "Dev" && user.dev_status === "Active") {
    return (
      <DevProfileWidget
        user={user}
        getApiUser={getApiUser}
        requests={requestsActive}
      />
    )
  } else if (user.status === "Admin") {
    return (
      <AdminDashboard
        unctiveUser={usersUctive}
        apiUnctive={apiUnctive}
        usersActiveted={usersActiveted}
        requests={requests}
      />
    )
  } else if (user.status === "Dev" && user.dev_status === "Unctive") {
    return (
      <div className="w-screen h-screen grid place-content-center text-center space-y-4">
        <div className="flex justify-center items-center space-x-4">
          <svg
            width={54}
            height={64}
            viewBox="0 0 158 139"
            className="fill-red-400 "
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_48_33)">
              <path d="M79 8.6875C83.3821 8.6875 87.4246 10.7236 89.6465 14.0629L156.303 113.969C158.555 117.336 158.556 121.489 156.364 124.856C154.173 128.222 150.069 130.312 145.656 130.312H12.3438C7.93088 130.312 3.82659 128.222 1.63557 124.856C-0.555445 121.489 -0.524586 117.308 1.69729 113.969L68.3535 14.0629C70.5754 10.7236 74.618 8.6875 79 8.6875ZM79 43.4375C74.8957 43.4375 71.5938 46.3424 71.5938 49.9531V80.3594C71.5938 83.9701 74.8957 86.875 79 86.875C83.1043 86.875 86.4063 83.9701 86.4063 80.3594V49.9531C86.4063 46.3424 83.1043 43.4375 79 43.4375ZM88.875 104.25C88.875 101.946 87.8346 99.7362 85.9827 98.107C84.1308 96.4778 81.619 95.5625 79 95.5625C76.381 95.5625 73.8693 96.4778 72.0173 98.107C70.1654 99.7362 69.125 101.946 69.125 104.25C69.125 106.554 70.1654 108.764 72.0173 110.393C73.8693 112.022 76.381 112.938 79 112.938C81.619 112.938 84.1308 112.022 85.9827 110.393C87.8346 108.764 88.875 106.554 88.875 104.25Z" />
            </g>
            <defs>
              <clipPath id="clip0_48_33">
                <rect width={158} height={139} fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p className="text-[20px]">Wait for admin for approved you</p>
        </div>
        <Link href={"/Home"} className="text-purple-500">
          Click here to containue
        </Link>
      </div>
    )
  } else return redirect("/Home")
}

export default Profile
