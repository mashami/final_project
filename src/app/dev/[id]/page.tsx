import { getUser } from "@/services/user"
import { Prisma } from "@prisma/client"
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
  console.log("my url id ==>", id)

  const data = await getUser(id)
  const user = data.user as UserWithRelations
  console.log("my user", user)

  return (
    <div>
      <DevProfileWidget user={user} />
    </div>
  )
}

export default page
