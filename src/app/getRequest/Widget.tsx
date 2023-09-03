"use client"
import NavBar from "@/components/NavBar/NavBar"
import { Request } from "@prisma/client"
interface ApiWidgetProps {
  request: Request
  file: string
}

const RequestWidget = ({ request, file }: ApiWidgetProps) => {
  function downloadContent(content: BlobPart, fileName: string) {
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="">
      <NavBar />
      <span className="w-full flex justify-end px-24 relative z-10 ">
        <button
          className="text-purple-500"
          onClick={() => downloadContent(file, "downloaded_content.txt")}
        >
          Download
        </button>
      </span>
      <div className="container px-12 [&<p]:text-green-700  py-8 grid place-content-center space-y-8">
        {/* <div className="container ">{renderedContent}</div> */}

        <div className="mdx-div container px-12 [&<p]:text-green-700 py-8 grid place-content-center space-y-8">
          <h1 className="text-center">{request.company}</h1>
          <div
            className="max-w-screen-lg"
            dangerouslySetInnerHTML={{ __html: file }}
          />
        </div>
        {/* <div
          className="mdx-div max-w-screen-lg bg-red-500"
          dangerouslySetInnerHTML={{ __html: markdownHtml }}
        /> */}
      </div>
    </div>
  )
}

export default RequestWidget
