import { promises as fsPromises } from "fs"
import marked from "marked" // A library to parse Markdown into HTML
import path from "path"

export default function MarkdownPage({ markdownContent }) {
  return <div dangerouslySetInnerHTML={{ __html: markdownContent }} />
}

export async function getStaticProps() {
  const mdFilePath = path.join(process.cwd(), "public", "sample.md")
  const mdContent = await fsPromises.readFile(mdFilePath, "utf-8")
  const markdownContent = marked(mdContent)

  return {
    props: {
      markdownContent
    }
  }
}
