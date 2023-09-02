"use client"
import { components } from "@/components/Mdx-components"
import NavBar from "@/components/NavBar/NavBar"
import { Api } from "@prisma/client"
import { createElement } from "react"
import parse from "rehype-parse"
import rehype2react from "rehype-react"
import { unified } from "unified"
interface ApiWidgetProps {
  api: Api
  markdownHtml: string
}

const ApiWidget = ({ api, markdownHtml }: ApiWidgetProps) => {
  function renderMarkdownHtml(markdownHtml: string) {
    const processor = unified().use(parse).use(rehype2react, {
      createElement,
      components
    })

    return processor.processSync(markdownHtml).result
  }
  const renderedContent = renderMarkdownHtml(markdownHtml)
  return (
    <div>
      <NavBar />
      <div className="container px-12 [&<p]:text-green-700  py-8 grid place-content-center space-y-8">
        <h1 className="text-center">{api.title}</h1>

        {/* {JSON.stringify(doc)} */}
        {/* <div className="container ">{renderedContent}</div> */}

        <div
          className="mdx-div"
          dangerouslySetInnerHTML={{ __html: markdownHtml }}
        />
        {/* <Mdx code={markdownHtml} components={markdownHtml} /> */}
      </div>
    </div>
  )
}

export default ApiWidget
