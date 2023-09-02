import { Toaster } from "@/components/ui/toaster"
import "@/styles/globals.scss"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import NextAuthSessionProvider from "./providers/NextAuthSessionProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IHUZO",
  description: "Ihuzo API collection"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="Background min-h-full w-screen">
      <body className={inter.className}>
        <main>
          <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
        </main>

        <Toaster />
      </body>
    </html>
  )
}
