/* eslint-disable jsx-a11y/alt-text */
import { getRequest } from "@/services/api"
import { Prisma, Request } from "@prisma/client"
import { remark } from "remark"
import html from "remark-html"
import RequestWidget from "../Widget"

interface PageProps {
  params: {
    id: string
  }
}
export type UserWithRelations = Prisma.UserGetPayload<{
  include: { apis: true }
}>
const page = async ({ params: { id } }: PageProps) => {
  const data = await getRequest(id)

  const request = data.request as Request

  const res = await fetch(`${request.probleStatmentUrl}`)

  const file = await res.text()

  const processedContent = await remark().use(html).process(file)

  const fileHtml = processedContent.toString()

  // console.log(String(compiled))

  return (
    <div>
      <RequestWidget request={request} file={fileHtml} />
    </div>
  )
}

export default page
