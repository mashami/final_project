import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getApi } from "@/services/api"
import { getUser } from "@/services/user"
import { Api, Prisma } from "@prisma/client"
import { getServerSession } from "next-auth"
import PaymentWidget from "../Widget"

interface PageProps {
  params: {
    id: string
  }
}

export type UserWithRelations = Prisma.UserGetPayload<{
  include: { apis: true }
}>

const page = async ({ params: { id } }: PageProps) => {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id as string
  const data = await getUser(userId)
  const user = data.user as UserWithRelations

  const apiPromise = await getApi(id)
  const api = apiPromise.api as Api
  const amount = api.price

  return (
    <div>
      <PaymentWidget
        amounts={amount ?? ""}
        number={user.phone ?? ""}
        apiId={api.id}
        email={user.email}
      />
    </div>
  )
}

export default page
