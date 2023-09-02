import { getApi } from "@/services/api"
import { Api, Prisma } from "@prisma/client"
import { remark } from "remark"
import html from "remark-html"
import ApiWidget from "../Widget"

interface PageProps {
  params: {
    id: string
  }
}
export type UserWithRelations = Prisma.UserGetPayload<{
  include: { apis: true }
}>
const page = async ({ params: { id } }: PageProps) => {
  const data = await getApi(id)
  const api = data.api as Api

  const res = await fetch(`${api.apiUrl}`)
  const markdown = await res.text()

  const processedContent = await remark().use(html).process(markdown)
  const markdownHtml = processedContent.toString()

  // console.log(String(compiled))
  // console.log("my markdown   =>>>>", markdown)

  return (
    <div>
      <ApiWidget api={api} markdownHtml={markdownHtml} />
    </div>
  )
}

export default page
