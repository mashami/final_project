import { getRequestActive } from "@/services/api"
import { Request } from "@prisma/client"
import RequestWidget from "./Widget"

const page = async () => {
  const requestData = await getRequestActive()

  const requests = requestData.requests as Request[]

  return (
    <div>
      <RequestWidget requests={requests} />
    </div>
  )
}

export default page
