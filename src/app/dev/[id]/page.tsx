import { getApisUser } from "@/services/api"
import { getUser } from "@/services/user"
import { Api, Prisma } from "@prisma/client"
import DevProfileWidget from "../Widget"

interface PageProps {
  params: {
    id: string
  }
}
export type UserWithRelations = Prisma.UserGetPayload<{
  include: { apis: true }
}>
const page = async ({ params: { id } }: PageProps) => {
  const data = await getUser(id)
  const user = data.user as UserWithRelations

  const apisUser = await getApisUser(id as string)
  const getApiUser = (await apisUser.apis) as Api[]

  return (
    <div>
      <DevProfileWidget user={user} getApiUser={getApiUser} />
    </div>
  )
}

export default page
