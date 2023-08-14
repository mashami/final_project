"use client"

import { Loader } from "@/components/Loader"
import NavBar from "@/components/NavBar/NavBar"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { changeDevActive, changeDevUnActive } from "@/services/user"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { UserWithRelations } from "./page"

interface AdminDashboardProps {
  unctiveUser: UserWithRelations[]
}

export const AdminDashboard = ({ unctiveUser }: AdminDashboardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const ChangeDevActive = async (userId: string) => {
    if (!userId) {
      toast({
        variant: "destructive",
        description: "Id must be provided"
      })
    }
    setIsLoading(true)
    try {
      const data = await changeDevActive({ userId })

      if (data.error) {
        toast({
          variant: "destructive",
          description: data.message
        })

        setIsLoading(false)

        return
      }
      startTransition(() => {
        router.refresh()

        toast({
          description: data.message
        })

        setIsLoading(false)
      })
    } catch (error) {
      toast({
        variant: "destructive",
        description: "An error occured. Please try again."
      })

      setIsLoading(false)
    }
  }

  const denyDev = async (userId: string) => {
    if (!userId) {
      toast({
        variant: "destructive",
        description: "Id must be provided"
      })
    }
    setIsLoading(true)
    try {
      const data = await changeDevUnActive({ userId })

      if (data.error) {
        toast({
          variant: "destructive",
          description: data.message
        })

        setIsLoading(false)

        return
      }
      startTransition(() => {
        router.refresh()

        toast({
          description: data.message
        })

        setIsLoading(false)
      })
    } catch (error) {
      toast({
        variant: "destructive",
        description: "An error occured. Please try again."
      })

      setIsLoading(false)
    }
  }
  return (
    <div className="space-y-8">
      <NavBar />
      <div className=" min-w-screen px-4  space-y-12 ">
        <div className=" space-y-4  ">
          <h1 className="font-medium text-[20px] leading-6 ">APIS REQUEST</h1>
          <Table className=" rounded-lg border">
            <TableBody>
              <TableRow className="text-center text-base font-semibold">
                <TableCell>user Name</TableCell>
                <TableCell>API Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Change status</TableCell>
              </TableRow>
              <TableRow className=" text-center  ">
                <TableCell>Mashami</TableCell>
                <TableCell>Payment API</TableCell>
                <TableCell>Public</TableCell>
                <TableCell>
                  <Button
                    text="Details"
                    className="rounded-lg cursor-pointer hover:opacity-70 transition"
                  />
                </TableCell>

                <TableCell className="space-x-4">
                  <Button text="Approved" className="rounded-lg" />
                  <Button
                    text="Denied"
                    variant={"destructive"}
                    className="bg-red-500 rounded-lg hover:bg-red-400"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className=" space-y-4 ">
          <h1 className="font-medium text-[20px] leading-6 ">
            Developers REQUEST
          </h1>
          {unctiveUser.length ? (
            <Table className=" rounded-md border">
              <TableBody>
                <TableRow className="text-center text-base font-semibold">
                  <TableCell>Email</TableCell>
                  <TableCell>Github Profile</TableCell>
                  <TableCell>LinkdIn Profile</TableCell>
                  <TableCell>Hosted project link</TableCell>
                  <TableCell>Change Status</TableCell>
                </TableRow>

                {unctiveUser.map((user) => (
                  // eslint-disable-next-line react/jsx-key
                  <TableRow className=" text-center  ">
                    <TableCell key={user.id}>{user.email ?? ""}</TableCell>
                    <TableCell key={user.id}>
                      <Link href={`${user.github}`}>{user.github ?? ""}</Link>
                    </TableCell>
                    <TableCell key={user.id}>
                      <Link href={`${user.linkedin}`}>
                        {user.linkedin ?? ""}
                      </Link>
                    </TableCell>
                    <TableCell key={user.id}>
                      <Link href={`${user.hostedlink}`}>
                        {user.hostedlink ?? ""}
                      </Link>
                    </TableCell>
                    <TableCell className="flex items-center justify-center space-x-4">
                      {isLoading ? (
                        <Loader />
                      ) : (
                        <Button
                          text="Approved"
                          className="rounded-lg"
                          onClick={() => ChangeDevActive(user.id)}
                        />
                      )}

                      <Button
                        text="Denied"
                        variant={"destructive"}
                        className="bg-red-500 rounded-lg hover:bg-red-400"
                        onClick={() => denyDev(user.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>There is not requst yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
