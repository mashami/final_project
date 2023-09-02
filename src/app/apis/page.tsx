import { getPrivateApis, getPublicApis } from "@/services/api"
import { Api } from "@prisma/client"
import ApisWidget from "./Widget"

const page = async () => {
  const apiData = await getPublicApis()

  const apisPublic = apiData.apis as Api[]

  const apiDataPrivate = await getPrivateApis()

  const apisPrivate = apiDataPrivate.apis as Api[]

  return (
    <div>
      <ApisWidget apisPublic={apisPublic} apisPrivate={apisPrivate} />
    </div>
  )
}

export default page
