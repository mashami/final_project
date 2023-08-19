import { get_4_apis_active } from "@/services/api"
import { Api } from "@prisma/client"
import HomeWidget from "./Widget"

const page = async () => {
  const apiData = await get_4_apis_active()

  const apis = apiData.apis as Api[]
  return (
    <div>
      <HomeWidget apis={apis} />
    </div>
  )
}

export default page
