import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect(`/profile`)
  }
  console.log(session)

  return (
    <div className="">
      <>{children}</>
    </div>
  )
}

export default AuthLayout
