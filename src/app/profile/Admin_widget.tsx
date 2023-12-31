"use client"

import { Loader } from "@/components/Loader"
import NavBar from "@/components/NavBar/NavBar"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { changeDevActive, changeDevUnActive } from "@/services/user"
import { Api, Request } from "@prisma/client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { UserWithRelations } from "./page"

import { Logo } from "@/components/Logo"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import {
  RequestActiveUpdate,
  changeAPIActive,
  changeAPIUnActive,
  changeRequestUnctive
} from "@/services/api"

import { truncateDescription } from "@/utils/helpers"

interface AdminDashboardProps {
  unctiveUser: UserWithRelations[]
  apiUnctive: Api[]
  usersActiveted: UserWithRelations[]
  requests: Request[]
}

export const AdminDashboard = ({
  unctiveUser,
  apiUnctive,
  usersActiveted,
  requests
}: AdminDashboardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<string>("")

  const router = useRouter()
  const isMutating = isLoading || isPending

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
  const ChangeAPIActive = async (apiId: string) => {
    if (!apiId) {
      toast({
        variant: "destructive",
        description: "Id must be provided"
      })
    }
    setIsLoading(true)
    try {
      const data = await changeAPIActive({ apiId })

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
      return toast({
        variant: "destructive",
        description: "Id must be provided"
      })
    }
    setIsLoading(true)
    try {
      const data = await changeDevUnActive({ userId, message })

      if (data.error) {
        setIsLoading(false)
        return toast({
          variant: "destructive",
          description: data.message
        })
      }
      startTransition(() => {
        router.refresh()

        toast({
          description: data.message
        })

        setIsLoading(false)
      })
    } catch (error) {
      return toast({
        variant: "destructive",
        description: "An error occured. Please try again."
      })
    }
  }

  const denyAPI = async (apiId: string) => {
    if (!apiId) {
      return toast({
        variant: "destructive",
        description: "API id must be provided"
      })
    }
    setIsLoading(true)
    try {
      const data = await changeAPIUnActive({ apiId, message })

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

  const ChangeRequestUnctive = async (requestId: string) => {
    if (!requestId) {
      toast({
        variant: "destructive",
        description: "Request Id must be provided"
      })
    }
    setIsLoading(true)
    try {
      const data = await changeRequestUnctive({ requestId })

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

  const ChangeRequestActive = async (requestId: string) => {
    if (!requestId) {
      toast({
        variant: "destructive",
        description: "Request Id must be provided"
      })
    }
    setIsLoading(true)
    try {
      const data = await RequestActiveUpdate({ requestId })

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
      <div>
        <h1></h1>
      </div>
      <div className=" m-w-screen px-4  space-y-12 ">
        <div className=" space-y-4  ">
          <h1 className="font-medium text-[20px] leading-6">APIS REQUEST</h1>
          {apiUnctive.length ? (
            <Table className=" rounded-lg border">
              <TableBody>
                <TableRow className="text-center text-base font-semibold text-purple-500">
                  <TableCell>API Title</TableCell>
                  <TableCell>API Discription </TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Change status</TableCell>
                </TableRow>
                {apiUnctive.map((api) => (
                  // eslint-disable-next-line react/jsx-key
                  <TableRow className=" text-center  ">
                    <TableCell key={api.id}>{api.title ?? ""}</TableCell>

                    <TableCell key={api.id}>{api.discription ?? ""}</TableCell>

                    <TableCell key={api.id}>{api.apiCategory}</TableCell>

                    <TableCell key={api.id}>
                      <Link
                        href={`/getApi/[id]`}
                        as={`getApi/${api.id}`}
                        className="text-purple-500"
                      >
                        Click here for Detail
                      </Link>
                    </TableCell>

                    <TableCell className="flex items-center justify-center space-x-4">
                      {isLoading ? (
                        <Loader />
                      ) : (
                        <Button
                          text="Approved"
                          className="rounded-lg"
                          onClick={() => ChangeAPIActive(api.id)}
                        />
                      )}
                      <Dialog>
                        <DialogTrigger>
                          <Button
                            text="Denied"
                            variant={"destructive"}
                            className="bg-red-500 rounded-lg hover:bg-red-400"
                          />
                        </DialogTrigger>

                        <DialogContent className="Background">
                          <Logo />
                          <DialogHeader className="flex w-full px-8 justify-start space-y-8">
                            <DialogTitle className="text-black font-serif leading-4">
                              Provide the message of deny
                            </DialogTitle>
                            <DialogDescription>
                              <form
                                onSubmit={() => denyAPI(api.id)}
                                className="flex flex-col space-y-4 "
                              >
                                <span className="space-y-2 flex-1">
                                  <Label>Message</Label>
                                  <Textarea
                                    id="title"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Enter message here"
                                  />
                                </span>
                                {isMutating ? (
                                  <div className="bg-purple-500 rounded-lg px-12 grid place-items-center py-4 w-full">
                                    <Loader />
                                  </div>
                                ) : (
                                  <Button text="Submit" variant={"default"} />
                                )}
                              </form>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>There is Api request yet</p>
          )}
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
                      <Dialog>
                        <DialogTrigger>
                          <Button
                            text="Denied"
                            variant={"destructive"}
                            className="bg-red-500 rounded-lg hover:bg-red-400"
                          />
                        </DialogTrigger>

                        <DialogContent className="Background">
                          <Logo />
                          <DialogHeader className="flex w-full px-8 justify-start space-y-8">
                            <DialogTitle className="text-black font-serif leading-4">
                              Provide the message of deny
                            </DialogTitle>
                            <DialogDescription>
                              <form
                                onSubmit={() => denyDev(user.id)}
                                className="flex flex-col space-y-4 mt-12"
                              >
                                <span className="space-y-2 flex-1">
                                  <Label>Message</Label>
                                  <Textarea
                                    id="title"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Enter message here"
                                  />
                                </span>
                                {isLoading ? (
                                  <div className="bg-purple-500 px-12 grid place-items-center py-4 w-full">
                                    <Loader />
                                  </div>
                                ) : (
                                  <Button
                                    text="Submit"
                                    variant={"default"}
                                    loading
                                  />
                                )}
                              </form>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>There is not request yet</p>
          )}
        </div>
        <div>
          {usersActiveted.length && (
            <div className="space-y-5">
              <h1 className="mt-12">List of the Developers</h1>
              <Table className=" rounded-md border">
                <TableBody>
                  <TableRow className="text-center text-base font-semibold">
                    <TableCell>ID</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>User Name</TableCell>
                  </TableRow>

                  {usersActiveted.map((user) => (
                    // eslint-disable-next-line react/jsx-key
                    <TableRow className=" text-center  ">
                      <TableCell key={user.id}>{user.id}</TableCell>
                      <TableCell key={user.id}>{user.email}</TableCell>
                      <TableCell key={user.id}>{user.name ?? ""}</TableCell>
                      <TableCell className="flex items-center justify-center space-x-4">
                        <Dialog>
                          <DialogTrigger>
                            <Button
                              text="Delete"
                              variant={"destructive"}
                              className="bg-red-500 rounded-lg hover:bg-red-400"
                            />
                          </DialogTrigger>

                          <DialogContent className="Background">
                            <Logo />
                            <DialogHeader className="flex w-full px-8 justify-start space-y-8">
                              <DialogTitle className="text-black font-serif leading-4">
                                Provide the message for Delete a User
                              </DialogTitle>
                              <DialogDescription>
                                <form
                                  onSubmit={() => denyDev(user.id)}
                                  className="flex flex-col space-y-4 mt-12"
                                >
                                  <span className="space-y-2 flex-1">
                                    <Label>Message</Label>
                                    <Textarea
                                      id="title"
                                      value={message}
                                      onChange={(e) =>
                                        setMessage(e.target.value)
                                      }
                                      placeholder="Enter message here"
                                    />
                                  </span>

                                  <Button
                                    text="Submit"
                                    variant={"default"}
                                    loading={isLoading}
                                  />
                                </form>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
        <div>
          {requests.length && (
            <div className="space-y-5">
              <h1 className="mt-12">List of Request APIs</h1>
              <Table className=" rounded-md border">
                <TableBody>
                  <TableRow className="text-center text-base font-semibold text-purple-500">
                    <TableCell>Company</TableCell>
                    <TableCell>Descriptions</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>

                  {requests.map((request) => (
                    // eslint-disable-next-line react/jsx-key
                    <TableRow className=" text-center  ">
                      <TableCell key={request.id}>{request.company}</TableCell>
                      <TableCell key={request.id}>
                        <Link
                          href={`/getRequest/[id]`}
                          as={`getRequest/${request.id}`}
                        >
                          {truncateDescription(`${request.description}`, 20)}{" "}
                        </Link>
                      </TableCell>
                      <TableCell
                        key={request.id}
                        className={cn(
                          request.status === "Unctive" && "text-red-500"
                        )}
                      >
                        {request.status}
                      </TableCell>
                      <TableCell className="flex items-center justify-center space-x-4">
                        {request.status === "Active" ? (
                          <Button
                            text="Inactive"
                            variant={"destructive"}
                            className="bg-red-500 rounded-lg hover:bg-red-400"
                            loading={isLoading}
                            onClick={() => ChangeRequestUnctive(request.id)}
                          />
                        ) : (
                          <Button
                            text="Active"
                            variant={"destructive"}
                            className="bg-purple-500 rounded-lg hover:bg-purple-300"
                            loading={isLoading}
                            onClick={() => ChangeRequestActive(request.id)}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
