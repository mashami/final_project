/* eslint-disable react/jsx-key */
"use client"
import Card from "@/components/Card/Card"
import { Icon } from "@/components/Icon"
import { Loader } from "@/components/Loader"
import { Logo } from "@/components/Logo"
import NavBar from "@/components/NavBar/NavBar"
import { ProfileImageUpload } from "@/components/ProfileImageUpload"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { AddContributors, create, deleteApi } from "@/services/api"
import { updateDescription, updateLanguage, updateName } from "@/services/user"
import { fileToDataURI2, truncateDescription } from "@/utils/helpers"
import { Api, Request } from "@prisma/client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { UserWithRelations } from "./page"

interface DevProfileWidgetProps {
  user: UserWithRelations
  getApiUser: Api[]
  requests: Request[]
}

const DevProfileWidget = ({
  user,
  getApiUser,
  requests
}: DevProfileWidgetProps) => {
  const [isEditingName, setIsEditingName] = useState<boolean>(false)
  const [isEditingLang, setIsEditingLang] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [name, setName] = useState<string>(user.name ?? "")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [languanges, setLanguanges] = useState<string>(user.languages ?? "")
  const [description, setDescription] = useState<string>(user.discription ?? "")
  const [price, setPrice] = useState<string>("")
  const [isPending, startTransition] = useTransition()
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [accessToken, setAccessToken] = useState<string>("")
  const [discription, setDiscription] = useState<string>("")
  const [language, setLanguange] = useState<string>("")
  const [hostedLink, setHostedLink] = useState<string>("")
  const [uploadedFile, setUploadedFile] = useState<string>("")
  const [isPrivate, setIsPrivate] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const router = useRouter()

  const isMutating = isLoading || isPending

  const onCancel = () => {
    if (isMutating) return

    setName(user.name ?? "")
    setIsEditingName(false)
  }

  const SelectHandle = (value: string) => {
    if (value == "Private") {
      return setIsPrivate(true)
    }
    return setIsPrivate(false)
  }

  const onCanceltolanguage = () => {
    if (isMutating) return

    setName(user.languages ?? "")
    setIsEditingLang(false)
  }
  const onCancelDescription = () => {
    if (isMutating) return

    setDescription(user.discription ?? "")
    setIsEditing(false)
  }

  const changeName = async (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()

    if (name === user.name) {
      onCancel()

      return
    }

    if (!name) {
      toast({
        variant: "destructive",
        description: "Name must be provided"
      })
    }
    setIsLoading(true)
    try {
      const data = await updateName({ userId: user.id, name })

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
        setIsEditingName(false)
      })
    } catch (error) {
      toast({
        variant: "destructive",
        description: "An error occured. Please try again."
      })

      setIsLoading(false)
    }
  }

  const changeLanguangeHandler = async (
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
    e.stopPropagation()

    if (languanges === user.languages) {
      onCanceltolanguage()
      return
    }

    if (!languanges) {
      toast({
        variant: "destructive",
        description: "languange must be provided"
      })
    }
    setIsLoading(true)
    try {
      const data = await updateLanguage({
        userId: user.id,
        language: languanges
      })

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
        setIsEditingLang(false)
      })
    } catch (error) {
      toast({
        variant: "destructive",
        description: "An error occured. Please try again."
      })

      setIsLoading(false)
    }
  }

  const changeDescriptionHandler = async (
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
    e.stopPropagation()

    if (description === user.discription) {
      onCancelDescription()
      return
    }

    if (!description) {
      toast({
        variant: "destructive",
        description: "description must be provided"
      })
    }
    setIsLoading(true)
    try {
      const data = await updateDescription({
        userId: user.id,
        description
      })

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
        setIsEditing(false)
      })
    } catch (error) {
      toast({
        variant: "destructive",
        description: "An error occured. Please try again."
      })

      setIsLoading(false)
    }
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.stopPropagation()
    const file = event.target.files?.[0]

    if (!file) {
      return null
    }

    if (!file.name.endsWith(".mdx")) {
      return toast({
        variant: "destructive",
        description: "You must provide an MDX file only."
      })
    }

    const uri = (await fileToDataURI2(file)) as any

    if (uri?.error) return console.log(uri.error)

    setUploadedFile(uri)
  }

  const addApiHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (
      !title ||
      !discription ||
      !language ||
      !hostedLink ||
      !uploadedFile ||
      !selectedCategory
    ) {
      return toast({
        variant: "destructive",
        description: "All field required"
      })
    }

    if (isPrivate) {
      if (!accessToken || !price) {
        return toast({
          variant: "destructive",
          description: "Price and Accesstoken required"
        })
      }
    }

    setIsLoading(true)

    try {
      const data = await create({
        ownerId: user.id,
        apiCategory: selectedCategory,
        apiDocumentationLink: hostedLink,
        apiUrl: uploadedFile,
        discription: discription,
        title,
        languages: language,
        price,
        accessToken
      })

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
        setAccessToken("")
        setDescription("")
        setHostedLink("")
        setIsEditing(false)
        setLanguange("")
        setIsPrivate(false)
        setName("")
        setPrice("")
        setTitle("")
        setIsDialogOpen(false)
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

  const deleteHandler = async (apiId: string) => {
    if (!user.id || !apiId) {
      toast({
        variant: "destructive",
        description: "user Id and api Id must be provided"
      })
    }

    setIsLoading(true)

    try {
      const data = await deleteApi({
        userId: user.id,
        apiId
      })

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
        setIsEditing(false)
      })
    } catch (error) {
      toast({
        variant: "destructive",
        description: "An error occured. Please try again."
      })

      setIsLoading(false)
    }
  }

  const addContributorHandle = async (requestId: string) => {
    console.log("hello")

    if (!requestId) {
      return toast({
        variant: "destructive",
        description: "request Id should be provided"
      })
    }

    console.log("userId===>", user.id, "requestId====>", requestId)

    setIsLoading(true)

    try {
      const data = await AddContributors({
        requestId,
        userId: user.id
      })

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
    <>
      <div className="relative">
        <div className="">
          <NavBar />
        </div>

        <div className="py-8 px-4 flex justify-between  ">
          <div className=" w-96 h-full grid place-items-center py-8 space-y-4">
            <div className="grid gap-2 place-items-center w-full">
              <ProfileImageUpload
                profileImage={user.profile_image ?? ""}
                userId={user.id}
              />

              <span className="space-y-8 font-serif text-center w-full">
                {isEditingName ? (
                  <span className="flex items-start justify-center space-x-4">
                    <Input
                      value={name}
                      placeholder="Enter you name"
                      onChange={(e) => setName(e.target.value)}
                    />
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <span
                        className="cursor-pointer hover:opacity-75 transition"
                        onClick={changeName}
                      >
                        <svg
                          className="fill-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width={22}
                          height={22}
                          viewBox="0 0 256 256"
                        >
                          <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
                        </svg>
                      </span>
                    )}
                  </span>
                ) : (
                  <div className="flex justify-center   items-center w-full relative">
                    {user.name ? (
                      <p className=" font-semibold">{user.name}</p>
                    ) : (
                      <p>Add user name</p>
                    )}

                    <span
                      key={user.name}
                      className=" flex-wrap flex-none absolute right-16"
                      onClick={() => setIsEditingName(true)}
                    >
                      <Icon title="edit" />
                    </span>
                  </div>
                )}
                {isEditingLang ? (
                  <span className="flex items-start justify-center space-x-4">
                    <Input
                      value={languanges}
                      placeholder="Enter you name"
                      onChange={(e) => setLanguanges(e.target.value)}
                    />
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <span
                        className="cursor-pointer hover:opacity-75 transition"
                        onClick={changeLanguangeHandler}
                      >
                        <svg
                          className="fill-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width={22}
                          height={22}
                          viewBox="0 0 256 256"
                        >
                          <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
                        </svg>
                      </span>
                    )}
                  </span>
                ) : (
                  <div className="flex justify-center   items-center w-full relative">
                    {user.languages ? (
                      <p className="opacity-60">{user.languages}</p>
                    ) : (
                      <p>Add Langueges</p>
                    )}

                    <span
                      key={user.languages}
                      className=" flex-wrap flex-none absolute right-16"
                      onClick={() => setIsEditingLang(true)}
                    >
                      <Icon title="edit" />
                    </span>
                  </div>
                )}
              </span>
            </div>
            <div className="space-y-4 ">
              <p className="font-serif font-bold text-center">Your Socials</p>
              <div className="space-y-4">
                <span className="flex gap-2 justify-start px-4">
                  <p>LinkdIn: </p>
                  <a
                    className="text-sm text-purple-400"
                    href={`${user.linkedin}`}
                  >
                    {user.linkedin}
                  </a>
                </span>
                <span className="flex gap-2 justify-start px-4">
                  <p>GitHub:</p>
                  <a
                    className="text-sm text-purple-400"
                    href={`${user.github}`}
                  >
                    {user.github}
                  </a>
                </span>
                <span className="flex gap-2 justify-start px-4">
                  <p>Email:</p>
                  <a className="text-sm text-purple-400" href={`${user.email}`}>
                    {user.email}
                  </a>
                </span>
              </div>
            </div>
          </div>

          <div className="z-0 space-y-12 px-4">
            <span className="text-center space-y-4 ">
              <h1>Description</h1>
              {isEditing ? (
                <div className="w-full flex justify-center items-center">
                  <textarea
                    value={description}
                    placeholder="Describe youself"
                    className="mx-4 py-12 w-full flex items-center justify-center flex-1 outline-none  bg-transparent"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <span
                      className="cursor-pointer hover:opacity-75 transition"
                      onClick={changeDescriptionHandler}
                    >
                      <svg
                        className="fill-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        width={22}
                        height={22}
                        viewBox="0 0 256 256"
                      >
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
                      </svg>
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex gap-6">
                  <p className="px-20"> {user.discription}</p>
                  <span
                    key={user.languages}
                    className=" flex-wrap flex-none absolute right-16"
                    onClick={() => setIsEditing(true)}
                  >
                    <Icon title="edit" />
                  </span>
                </div>
              )}
            </span>
            <div className="flex-grow-0 flex justify-between items-center ">
              <h1>APIs</h1>
              <Button text="Add API" className="rounded-lg" />
            </div>

            <div className=" grid grid-cols-3 gap-2 relative">
              {getApiUser.length ? (
                getApiUser.map((api) => {
                  const randomIndex = Math.floor(Math.random() * svgs.length)

                  return (
                    <Link
                      href={`/getApi/[id]`}
                      as={`getApi/${api.id}`}
                      className="bg-transparent border-b-1 relative group"
                    >
                      <Card
                        title={api.title}
                        desc={api.discription}
                        svg={svgs[randomIndex]}
                      />
                      {isLoading ? (
                        <div className="px-4 py-4 flex justify-center absolute bottom-0 right-8 bg-red-300 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Loader />
                        </div>
                      ) : (
                        <Button
                          text="Delete"
                          className="absolute bottom-0 right-8 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-300"
                          onClick={() => deleteHandler(api.id)}
                          loading={isLoading}
                        />
                      )}
                    </Link>
                  )
                })
              ) : (
                <p>You do not have API added yet</p>
              )}
            </div>
            <div className="space-y-5">
              <h1 className="mt-12">List of Request APIs</h1>
              <Table className=" rounded-md border">
                <TableBody>
                  <TableRow className="text-center text-base font-semibold text-purple-500">
                    <TableCell>Company</TableCell>
                    <TableCell>Descriptions</TableCell>
                    <TableCell>Contributors</TableCell>
                  </TableRow>

                  {requests.map((request) => (
                    // eslint-disable-next-line react/jsx-key
                    <TableRow key={request.id} className=" text-center  ">
                      <TableCell key={request.id}>{request.company}</TableCell>
                      <TableCell key={request.id}>
                        <Link
                          href={`/getRequest/[id]`}
                          as={`getRequest/${request.id}`}
                        >
                          {truncateDescription(`${request.description}`, 20)}{" "}
                        </Link>
                      </TableCell>
                      <TableCell key={request.id}>
                        {request.contributors.length}
                      </TableCell>
                      <TableCell
                        key={request.id}
                        className="flex items-center justify-center space-x-4"
                      >
                        <Button
                          text={cn(
                            isLoading ? "Contributing..." : "Contribute"
                          )}
                          variant={"destructive"}
                          className="bg-purple-500 rounded-lg hover:bg-purple-300"
                          loading={isLoading}
                          onClick={() => addContributorHandle(request.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="absolute bottom-0 right-[30%] -z-10">
              <svg
                width={184}
                height={17}
                viewBox="0 0 184 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx={8} cy="8.5" r={8} fill="#2639ED" />
                <circle cx={50} cy="8.5" r={8} fill="#E7F0FC" />
                <circle cx={92} cy="8.5" r={8} fill="#E7F0FC" />
                <circle cx={134} cy="8.5" r={8} fill="#E7F0FC" />
                <circle cx={176} cy="8.5" r={8} fill="#E7F0FC" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger></DialogTrigger>

        <DialogContent className="Background">
          <Logo />
          <DialogHeader className="flex w-full items-center justify-center space-y-8">
            <DialogTitle className="text-black font-serif leading-4">
              Add API
            </DialogTitle>
            <DialogDescription>
              <form
                onSubmit={addApiHandler}
                className="flex flex-col space-y-4 "
              >
                <span className="space-y-2">
                  <Label>API Title</Label>
                  <Input
                    type="text"
                    id="title"
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a title of your API"
                  />
                </span>
                <span className="space-y-2">
                  <Label>API discription</Label>
                  <Textarea
                    id="title"
                    onChange={(e) => setDiscription(e.target.value)}
                    placeholder="Enter a simple description"
                  />
                </span>
                <span className="space-y-2">
                  <Label>API Language</Label>
                  <Input
                    type="text"
                    onChange={(e) => setLanguange(e.target.value)}
                    id="language"
                    placeholder="Enter the language used for this API"
                  />
                </span>
                <Select
                  onValueChange={(value) => {
                    setSelectedCategory(value)
                    SelectHandle(value)
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white  ">
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      {options.map((item) => (
                        <SelectItem
                          className="text-sm hover:bg-purple-50 "
                          key={item.value}
                          value={item.value}
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {isPrivate && (
                  <div className="space-y-2">
                    <Label>Price</Label>
                    <Input
                      type="text"
                      id="price"
                      placeholder="Enter the price"
                      value={price}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "")
                        setPrice(Number(value).toLocaleString())
                      }}
                    />
                  </div>
                )}

                {isPrivate && (
                  <div className="space-y-2">
                    <Label>Access Token</Label>
                    <Input
                      type="text"
                      id="accessToken"
                      value={accessToken}
                      placeholder="Enter the access token"
                      onChange={(e) => setAccessToken(e.target.value)}
                    />
                  </div>
                )}

                <span className="space-y-2">
                  <Label>Api Documentation Link </Label>
                  <Input
                    type="text"
                    onChange={(e) => setHostedLink(e.target.value)}
                    id="link"
                    placeholder="Enter hosted Link"
                  />
                </span>

                <span className="space-y-2">
                  <Label>API description md file</Label>
                  <Input
                    id="description"
                    type="file"
                    accept=".mdx"
                    onChange={handleFileChange}
                    max={1}
                  />
                </span>

                <span className="flex-grow-0 self-end">
                  {isLoading ? (
                    <div className="bg-purple-400 w-14 px-12 py-3 grid place-content-center rounded-lg">
                      {" "}
                      <Loader />
                    </div>
                  ) : (
                    <Button
                      text="Add API"
                      loading={isLoading}
                      className="rounded-lg"
                    />
                  )}
                </span>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DevProfileWidget

const options = [
  {
    label: "Private",
    value: "Private"
  },
  {
    label: "Public",
    value: "Public"
  }
]

export const svgs = [
  <svg viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M41 7.5H8C7.20435 7.5 6.44129 7.81607 5.87868 8.37868C5.31607 8.94129 5 9.70435 5 10.5V37.5C5 38.2956 5.31607 39.0587 5.87868 39.6213C6.44129 40.1839 7.20435 40.5 8 40.5H41C41.7957 40.5 42.5587 40.1839 43.1213 39.6213C43.6839 39.0587 44 38.2956 44 37.5V10.5C44 9.70435 43.6839 8.94129 43.1213 8.37868C42.5587 7.81607 41.7957 7.5 41 7.5ZM24.5 30C22.1138 29.9975 19.8261 29.0485 18.1388 27.3612C16.4515 25.6739 15.5025 23.3862 15.5 21C15.5 20.6022 15.658 20.2206 15.9393 19.9393C16.2206 19.658 16.6022 19.5 17 19.5C17.3978 19.5 17.7794 19.658 18.0607 19.9393C18.342 20.2206 18.5 20.6022 18.5 21C18.5 22.5913 19.1321 24.1174 20.2574 25.2426C21.3826 26.3679 22.9087 27 24.5 27C26.0913 27 27.6174 26.3679 28.7426 25.2426C29.8679 24.1174 30.5 22.5913 30.5 21C30.5 20.6022 30.658 20.2206 30.9393 19.9393C31.2206 19.658 31.6022 19.5 32 19.5C32.3978 19.5 32.7794 19.658 33.0607 19.9393C33.342 20.2206 33.5 20.6022 33.5 21C33.4975 23.3862 32.5485 25.6739 30.8612 27.3612C29.1739 29.0485 26.8862 29.9975 24.5 30ZM8 13.5V10.5H41V13.5H8Z"
      fill="#4ABEFF"
    />
  </svg>,

  <svg
    width={74}
    height={74}
    viewBox="0 0 74 74"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M64.5072 19.7777L59.8822 10.5277C59.6899 10.1435 59.3945 9.82041 59.0289 9.59474C58.6633 9.36907 58.2421 9.24969 57.8125 9.25H16.1875C15.7579 9.24969 15.3367 9.36907 14.9711 9.59474C14.6055 9.82041 14.3101 10.1435 14.1178 10.5277L9.49281 19.7777C9.33341 20.0994 9.25033 20.4535 9.25 20.8125V60.125C9.25 61.3516 9.73728 62.528 10.6046 63.3954C11.472 64.2627 12.6484 64.75 13.875 64.75H60.125C61.3516 64.75 62.528 64.2627 63.3954 63.3954C64.2627 62.528 64.75 61.3516 64.75 60.125V20.8125C64.7497 20.4535 64.6666 20.0994 64.5072 19.7777ZM17.6155 13.875H56.3845L58.697 18.5H15.303L17.6155 13.875ZM60.125 60.125H13.875V23.125H60.125V60.125ZM47.8861 42.3014C48.1011 42.5162 48.2717 42.7712 48.388 43.052C48.5044 43.3327 48.5643 43.6336 48.5643 43.9375C48.5643 44.2414 48.5044 44.5423 48.388 44.823C48.2717 45.1038 48.1011 45.3588 47.8861 45.5736L38.6361 54.8236C38.4213 55.0386 38.1663 55.2092 37.8855 55.3255C37.6048 55.4419 37.3039 55.5018 37 55.5018C36.6961 55.5018 36.3952 55.4419 36.1145 55.3255C35.8337 55.2092 35.5787 55.0386 35.3639 54.8236L26.1139 45.5736C25.68 45.1397 25.4362 44.5512 25.4362 43.9375C25.4362 43.3238 25.68 42.7353 26.1139 42.3014C26.5478 41.8675 27.1363 41.6237 27.75 41.6237C28.3637 41.6237 28.9522 41.8675 29.3861 42.3014L34.6875 47.6057V30.0625C34.6875 29.4492 34.9311 28.861 35.3648 28.4273C35.7985 27.9936 36.3867 27.75 37 27.75C37.6133 27.75 38.2015 27.9936 38.6352 28.4273C39.0689 28.861 39.3125 29.4492 39.3125 30.0625V47.6057L44.6139 42.3014C44.8287 42.0864 45.0837 41.9158 45.3645 41.7995C45.6452 41.6831 45.9461 41.6232 46.25 41.6232C46.5539 41.6232 46.8548 41.6831 47.1355 41.7995C47.4163 41.9158 47.6713 42.0864 47.8861 42.3014Z"
      fill="black"
    />
  </svg>,

  <svg
    width={74}
    height={74}
    viewBox="0 0 74 74"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M60.125 9.25H13.875C12.6484 9.25 11.472 9.73728 10.6046 10.6046C9.73728 11.472 9.25 12.6484 9.25 13.875V60.125C9.25 61.3516 9.73728 62.528 10.6046 63.3954C11.472 64.2627 12.6484 64.75 13.875 64.75H60.125C61.3516 64.75 62.528 64.2627 63.3954 63.3954C64.2627 62.528 64.75 61.3516 64.75 60.125V13.875C64.75 12.6484 64.2627 11.472 63.3954 10.6046C62.528 9.73728 61.3516 9.25 60.125 9.25ZM60.125 13.875V43.9375H51.8289C51.2218 43.9359 50.6204 44.055 50.0597 44.2877C49.499 44.5204 48.9901 44.8622 48.5625 45.2932L42.9807 50.875H31.0193L25.4375 45.2932C25.0096 44.8619 24.5002 44.5199 23.9389 44.2871C23.3777 44.0544 22.7758 43.9356 22.1682 43.9375H13.875V13.875H60.125ZM60.125 60.125H13.875V48.5625H22.1682L27.75 54.1443C28.1779 54.5756 28.6873 54.9176 29.2486 55.1504C29.8098 55.3831 30.4117 55.5019 31.0193 55.5H42.9807C43.5883 55.5019 44.1902 55.3831 44.7514 55.1504C45.3127 54.9176 45.8221 54.5756 46.25 54.1443L51.8318 48.5625H60.125V60.125ZM26.1139 36.3236C25.68 35.8897 25.4362 35.3012 25.4362 34.6875C25.4362 34.0738 25.68 33.4853 26.1139 33.0514C26.5478 32.6175 27.1363 32.3737 27.75 32.3737C28.3637 32.3737 28.9522 32.6175 29.3861 33.0514L34.6875 38.3557V20.8125C34.6875 20.1992 34.9311 19.611 35.3648 19.1773C35.7985 18.7436 36.3867 18.5 37 18.5C37.6133 18.5 38.2015 18.7436 38.6352 19.1773C39.0689 19.611 39.3125 20.1992 39.3125 20.8125V38.3557L44.6139 33.0514C44.8288 32.8366 45.0838 32.6661 45.3646 32.5498C45.6453 32.4336 45.9461 32.3737 46.25 32.3737C46.5539 32.3737 46.8547 32.4336 47.1354 32.5498C47.4162 32.6661 47.6712 32.8366 47.8861 33.0514C48.1009 33.2663 48.2714 33.5213 48.3877 33.8021C48.5039 34.0828 48.5638 34.3836 48.5638 34.6875C48.5638 34.9914 48.5039 35.2922 48.3877 35.5729C48.2714 35.8537 48.1009 36.1087 47.8861 36.3236L38.6361 45.5736C38.4213 45.7886 38.1663 45.9592 37.8855 46.0755C37.6048 46.1919 37.3039 46.2518 37 46.2518C36.6961 46.2518 36.3952 46.1919 36.1145 46.0755C35.8337 45.9592 35.5787 45.7886 35.3639 45.5736L26.1139 36.3236Z"
      fill="black"
    />
  </svg>,

  <svg
    width={74}
    height={74}
    viewBox="0 0 74 74"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M51.4994 53.1874H32.1785C31.8285 55.2587 31.0127 57.2234 29.7928 58.9335C28.5728 60.6435 26.9805 62.0543 25.1359 63.0593C23.2914 64.0644 21.2427 64.6375 19.1443 64.7354C17.046 64.8333 14.9528 64.4536 13.0227 63.6247C11.0925 62.7958 9.3757 61.5395 8.00177 59.9506C6.62785 58.3616 5.63265 56.4813 5.09123 54.4517C4.54981 52.4221 4.4763 50.296 4.87624 48.2338C5.27618 46.1716 6.13914 44.2271 7.40003 42.547C7.58243 42.3041 7.81089 42.0995 8.07238 41.9448C8.33386 41.7902 8.62325 41.6885 8.92401 41.6457C9.22478 41.6029 9.53103 41.6197 9.82528 41.6953C10.1195 41.7708 10.396 41.9036 10.639 42.086C10.8819 42.2684 11.0866 42.4968 11.2412 42.7583C11.3959 43.0198 11.4975 43.3092 11.5403 43.61C11.5831 43.9107 11.5663 44.217 11.4907 44.5112C11.4152 44.8055 11.2824 45.082 11.1 45.3249C9.89332 46.923 9.2435 48.8725 9.25003 50.8749C9.25003 53.3282 10.2246 55.681 11.9593 57.4157C13.694 59.1504 16.0468 60.1249 18.5 60.1249C20.9533 60.1249 23.3061 59.1504 25.0408 57.4157C26.7755 55.681 27.75 53.3282 27.75 50.8749C27.75 50.2616 27.9937 49.6734 28.4273 49.2397C28.861 48.8061 29.4492 48.5624 30.0625 48.5624H51.4994C52.0085 47.6807 52.7942 46.9916 53.7349 46.602C54.6755 46.2124 55.7184 46.144 56.7018 46.4075C57.6852 46.671 58.5542 47.2517 59.174 48.0594C59.7938 48.8671 60.1298 49.8568 60.1298 50.8749C60.1298 51.8931 59.7938 52.8827 59.174 53.6905C58.5542 54.4982 57.6852 55.0788 56.7018 55.3423C55.7184 55.6058 54.6755 55.5375 53.7349 55.1479C52.7942 54.7583 52.0085 54.0691 51.4994 53.1874ZM18.5 55.4999C19.3011 55.5002 20.0885 55.2924 20.7851 54.8969C21.4817 54.5015 22.0636 53.9318 22.4739 53.2438C22.8842 52.5558 23.1088 51.7731 23.1256 50.9722C23.1425 50.1713 22.951 49.3798 22.57 48.6752L32.9098 31.8691C33.2307 31.3469 33.3312 30.7187 33.1892 30.1225C33.0472 29.5263 32.6743 29.0108 32.1525 28.6894C30.9164 27.9285 29.8768 26.8874 29.1177 25.6502C28.3586 24.4131 27.9012 23.0147 27.7826 21.5681C27.664 20.1215 27.8876 18.6673 28.4351 17.3231C28.9826 15.9788 29.8388 14.7823 30.9344 13.8303C32.03 12.8782 33.3342 12.1973 34.7417 11.8427C36.1492 11.4881 37.6204 11.4697 39.0363 11.7889C40.4522 12.1082 41.7731 12.7561 42.8922 13.6804C44.0113 14.6048 44.8972 15.7794 45.4782 17.1095C45.7236 17.6719 46.1822 18.1137 46.7533 18.3379C47.3244 18.562 47.9612 18.5501 48.5235 18.3048C49.0858 18.0595 49.5277 17.6008 49.7518 17.0297C49.976 16.4586 49.9641 15.8219 49.7188 15.2595C48.8858 13.3553 47.6356 11.6625 46.0606 10.3062C44.4855 8.94997 42.6259 7.9649 40.6191 7.42378C38.6123 6.88266 36.5095 6.79931 34.4662 7.17991C32.4228 7.5605 30.4911 8.3953 28.8137 9.62265C27.1363 10.85 25.756 12.4385 24.7749 14.2709C23.7938 16.1032 23.2369 18.1326 23.1453 20.2091C23.0537 22.2856 23.4299 24.3561 24.2459 26.2677C25.0619 28.1793 26.297 29.8831 27.8599 31.2534L18.6272 46.2499C18.5839 46.2499 18.5434 46.2499 18.5 46.2499C17.2734 46.2499 16.097 46.7372 15.2297 47.6046C14.3623 48.4719 13.875 49.6483 13.875 50.8749C13.875 52.1016 14.3623 53.2779 15.2297 54.1453C16.097 55.0127 17.2734 55.4999 18.5 55.4999ZM55.5 36.9999C53.7171 37.0001 51.9507 37.3425 50.2969 38.0088L41.07 23.0093C41.5509 22.1184 41.7262 21.0942 41.569 20.0941C41.4117 19.0939 40.9306 18.173 40.1995 17.4726C39.4684 16.7722 38.5276 16.3311 37.5216 16.2169C36.5157 16.1028 35.5 16.3218 34.6305 16.8406C33.761 17.3593 33.0858 18.149 32.7084 19.0885C32.331 20.0279 32.2723 21.0653 32.5414 22.0414C32.8104 23.0174 33.3923 23.8782 34.1977 24.4917C35.0031 25.1052 35.9876 25.4374 37 25.4374H37.1272L47.4699 42.2464C47.7918 42.7678 48.3075 43.14 48.9036 43.2815C49.4998 43.4229 50.1277 43.322 50.6496 43.0009C51.8671 42.2503 53.242 41.7923 54.6664 41.6629C56.0908 41.5334 57.5258 41.7361 58.8586 42.2548C60.1915 42.7736 61.3859 43.5943 62.348 44.6526C63.3101 45.7109 64.0137 46.9779 64.4035 48.354C64.7932 49.7301 64.8586 51.1779 64.5944 52.5835C64.3302 53.9891 63.7437 55.3144 62.8809 56.4551C62.0181 57.5957 60.9025 58.5208 59.6218 59.1576C58.3412 59.7944 56.9303 60.1255 55.5 60.1249C54.8867 60.1249 54.2985 60.3686 53.8648 60.8022C53.4312 61.2359 53.1875 61.8241 53.1875 62.4374C53.1875 63.0507 53.4312 63.6389 53.8648 64.0726C54.2985 64.5063 54.8867 64.7499 55.5 64.7499C59.1799 64.7499 62.7091 63.2881 65.3111 60.686C67.9132 58.084 69.375 54.5548 69.375 50.8749C69.375 47.1951 67.9132 43.6659 65.3111 41.0638C62.7091 38.4618 59.1799 36.9999 55.5 36.9999Z"
      fill="black"
    />
  </svg>,

  <svg
    width={74}
    height={74}
    viewBox="0 0 74 74"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M62.4375 11.5625H11.5625C10.3359 11.5625 9.15949 12.0498 8.29213 12.9171C7.42478 13.7845 6.9375 14.9609 6.9375 16.1875V57.8125C6.9375 59.0391 7.42478 60.2155 8.29213 61.0829C9.15949 61.9502 10.3359 62.4375 11.5625 62.4375H62.4375C63.6641 62.4375 64.8405 61.9502 65.7079 61.0829C66.5752 60.2155 67.0625 59.0391 67.0625 57.8125V16.1875C67.0625 14.9609 66.5752 13.7845 65.7079 12.9171C64.8405 12.0498 63.6641 11.5625 62.4375 11.5625ZM62.4375 57.8125H11.5625V16.1875H62.4375V57.8125ZM23.125 24.2812C23.125 24.9673 22.9216 25.638 22.5404 26.2084C22.1593 26.7788 21.6175 27.2234 20.9837 27.486C20.3499 27.7485 19.6524 27.8172 18.9795 27.6833C18.3067 27.5495 17.6886 27.2191 17.2035 26.734C16.7184 26.2489 16.388 25.6308 16.2542 24.958C16.1203 24.2851 16.189 23.5876 16.4515 22.9538C16.7141 22.32 17.1587 21.7782 17.7291 21.3971C18.2995 21.0159 18.9702 20.8125 19.6562 20.8125C20.5762 20.8125 21.4585 21.178 22.109 21.8285C22.7595 22.479 23.125 23.3613 23.125 24.2812ZM34.6875 24.2812C34.6875 24.9673 34.4841 25.638 34.1029 26.2084C33.7218 26.7788 33.18 27.2234 32.5462 27.486C31.9124 27.7485 31.2149 27.8172 30.542 27.6833C29.8692 27.5495 29.2511 27.2191 28.766 26.734C28.2809 26.2489 27.9505 25.6308 27.8167 24.958C27.6828 24.2851 27.7515 23.5876 28.014 22.9538C28.2766 22.32 28.7212 21.7782 29.2916 21.3971C29.862 21.0159 30.5327 20.8125 31.2188 20.8125C32.1387 20.8125 33.021 21.178 33.6715 21.8285C34.322 22.479 34.6875 23.3613 34.6875 24.2812Z"
      fill="black"
    />
  </svg>,
  <svg viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M27.7529 54.7289C27.4137 54.7289 27.0437 54.6364 26.7354 54.4822C24.3612 53.2797 22.3262 51.4914 20.8462 49.2714C19.6129 47.4214 19.6129 45.0472 20.8462 43.1972C22.3262 40.9772 24.3612 39.1889 26.7354 38.0172C27.8762 37.4314 29.2637 37.9247 29.8496 39.0656C30.4354 40.2064 29.9729 41.5939 28.8012 42.1797C27.1362 43.0122 25.7179 44.2764 24.7004 45.8181C24.5154 46.0956 24.5154 46.4656 24.7004 46.7739C25.7179 48.3156 27.1362 49.5797 28.8012 50.4122C29.9421 50.9981 30.4046 52.3856 29.8496 53.5264C29.4179 54.2664 28.5854 54.7289 27.7529 54.7289Z"
      fill="#FF007A"
    />
    <path
      d="M46.895 54.7288C46.0317 54.7288 45.23 54.2663 44.8292 53.4647C44.2434 52.3238 44.7059 50.9363 45.8775 50.3505C47.5425 49.518 48.9609 48.2538 49.9784 46.7122C50.1634 46.4347 50.1634 46.0647 49.9784 45.7563C48.9609 44.2147 47.5425 42.9505 45.8775 42.118C44.7367 41.5322 44.2742 40.1447 44.8292 39.0038C45.415 37.863 46.8025 37.4005 47.9434 37.9555C50.3175 39.158 52.3525 40.9463 53.8325 43.1663C55.0659 45.0163 55.0659 47.3905 53.8325 49.2405C52.3525 51.4605 50.3175 53.2488 47.9434 54.4205C47.5734 54.6363 47.2342 54.7288 46.895 54.7288Z"
      fill="#FF007A"
    />
    <path
      d="M46.25 70.1458H27.75C11.0075 70.1458 3.85416 62.9925 3.85416 46.25V27.75C3.85416 11.0075 11.0075 3.85413 27.75 3.85413H46.25C62.9925 3.85413 70.1458 11.0075 70.1458 27.75V46.25C70.1458 62.9925 62.9925 70.1458 46.25 70.1458ZM27.75 8.47913C13.5358 8.47913 8.47916 13.5358 8.47916 27.75V46.25C8.47916 60.4641 13.5358 65.5208 27.75 65.5208H46.25C60.4642 65.5208 65.5208 60.4641 65.5208 46.25V27.75C65.5208 13.5358 60.4642 8.47913 46.25 8.47913H27.75Z"
      fill="#FF007A"
    />
    <path
      d="M6.87728 27.01C5.61311 27.01 4.56478 25.9616 4.56478 24.6975C4.56478 23.4333 5.58228 22.385 6.87728 22.385L66.139 22.3541C67.4032 22.3541 68.4515 23.4025 68.4515 24.6666C68.4515 25.9308 67.434 26.9791 66.139 26.9791L6.87728 27.01Z"
      fill="#FF007A"
    />
  </svg>,
  <svg viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M54.6983 70.1459H19.3017C11.6242 70.1459 5.39583 63.9175 5.39583 56.24V35.4892C5.39583 27.8117 11.6242 21.5834 19.3017 21.5834H54.6983C62.3758 21.5834 68.6042 27.8117 68.6042 35.4892V39.9292C68.6042 41.1934 67.5558 42.2417 66.2917 42.2417H60.0633C58.9842 42.2417 57.9975 42.6425 57.2883 43.3825L57.2575 43.4134C56.3942 44.2459 55.9933 45.3867 56.0858 46.5584C56.2708 48.5934 58.2133 50.2275 60.4333 50.2275H66.2917C67.5558 50.2275 68.6042 51.2759 68.6042 52.54V56.2092C68.6042 63.9175 62.3758 70.1459 54.6983 70.1459ZM19.3017 26.2084C14.1833 26.2084 10.0208 30.3709 10.0208 35.4892V56.24C10.0208 61.3584 14.1833 65.5209 19.3017 65.5209H54.6983C59.8167 65.5209 63.9792 61.3584 63.9792 56.24V54.8834H60.4333C55.7775 54.8834 51.8308 51.43 51.4608 46.99C51.2142 44.4617 52.1392 41.9642 53.9892 40.145C55.5925 38.5109 57.7508 37.6167 60.0633 37.6167H63.9792V35.4892C63.9792 30.3709 59.8167 26.2084 54.6983 26.2084H19.3017Z"
      fill="#FF9900"
    />
    <path
      d="M7.70833 40.5766C6.44416 40.5766 5.39583 39.5283 5.39583 38.2641V24.1735C5.39583 19.5793 8.29416 15.4167 12.58 13.7825L37.0617 4.53248C39.59 3.57665 42.3958 3.91594 44.585 5.45761C46.805 6.99927 48.1 9.49677 48.1 12.1793V23.8959C48.1 25.16 47.0517 26.2084 45.7875 26.2084C44.5233 26.2084 43.475 25.16 43.475 23.8959V12.1793C43.475 11.0076 42.92 9.92838 41.9333 9.25005C40.9467 8.57171 39.775 8.41755 38.665 8.84921L14.1833 18.0992C11.6858 19.055 9.99 21.491 9.99 24.1735V38.2641C10.0208 39.5591 8.9725 40.5766 7.70833 40.5766Z"
      fill="#FF9900"
    />
    <path
      d="M60.4349 54.884C55.779 54.884 51.8324 51.4306 51.4624 46.9906C51.2157 44.4315 52.1407 41.934 53.9907 40.1148C55.5632 38.5115 57.7215 37.6173 60.034 37.6173H66.4474C69.4999 37.7098 71.8432 40.1148 71.8432 43.0748V49.4265C71.8432 52.3865 69.4999 54.7915 66.5399 54.884H60.4349ZM66.3857 42.2423H60.0649C58.9857 42.2423 57.999 42.6431 57.2899 43.3831C56.3957 44.2465 55.964 45.4181 56.0874 46.5898C56.2724 48.6248 58.2149 50.259 60.4349 50.259H66.4782C66.879 50.259 67.249 49.889 67.249 49.4265V43.0748C67.249 42.6123 66.879 42.2731 66.3857 42.2423Z"
      fill="#FF9900"
    />
    <path
      d="M43.1667 39.3125H21.5833C20.3192 39.3125 19.2708 38.2642 19.2708 37C19.2708 35.7358 20.3192 34.6875 21.5833 34.6875H43.1667C44.4308 34.6875 45.4792 35.7358 45.4792 37C45.4792 38.2642 44.4308 39.3125 43.1667 39.3125Z"
      fill="#FF9900"
    />
  </svg>,
  <svg
    width={74}
    height={74}
    viewBox="0 0 74 74"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M31.1734 55.9615H19.4876C18.2235 55.9615 17.1751 54.9132 17.1751 53.649V37.8624C17.1751 34.6557 19.7959 32.0345 23.0026 32.0345H31.1734C32.4376 32.0345 33.4859 33.0829 33.4859 34.347V53.6179C33.4859 54.9129 32.4376 55.9615 31.1734 55.9615ZM21.8001 51.3365H28.8609V36.6907H23.0026C22.3551 36.6907 21.8001 37.2145 21.8001 37.8929V51.3365Z"
      fill="#00DA71"
    />
    <path
      d="M42.8263 55.9615H31.1404C29.8763 55.9615 28.828 54.9132 28.828 53.649V23.8638C28.828 20.6571 31.4488 18.0363 34.6554 18.0363H39.3421C42.5488 18.0363 45.1696 20.6571 45.1696 23.8638V53.649C45.1388 54.9132 44.1213 55.9615 42.8263 55.9615ZM33.4838 51.3365H40.5446V23.8638C40.5446 23.2163 40.0204 22.6613 39.3421 22.6613H34.6554C34.0079 22.6613 33.4529 23.1855 33.4529 23.8638V51.3365H33.4838Z"
      fill="#00DA71"
    />
    <path
      d="M54.5152 55.9616H42.8293C41.5652 55.9616 40.5168 54.9133 40.5168 53.6491V39.6196C40.5168 38.3555 41.5652 37.3071 42.8293 37.3071H51.0002C54.2068 37.3071 56.8277 39.928 56.8277 43.1346V53.6491C56.8277 54.9133 55.8102 55.9616 54.5152 55.9616ZM45.1418 51.3366H52.2027V43.1346C52.2027 42.4871 51.6785 41.9321 51.0002 41.9321H45.1418V51.3366Z"
      fill="#00DA71"
    />
    <path
      d="M46.25 70.1458H27.75C11.0075 70.1458 3.85417 62.9925 3.85417 46.25V27.75C3.85417 11.0075 11.0075 3.85413 27.75 3.85413H46.25C62.9925 3.85413 70.1458 11.0075 70.1458 27.75V46.25C70.1458 62.9925 62.9925 70.1458 46.25 70.1458ZM27.75 8.47913C13.5358 8.47913 8.47917 13.5358 8.47917 27.75V46.25C8.47917 60.4641 13.5358 65.5208 27.75 65.5208H46.25C60.4642 65.5208 65.5208 60.4641 65.5208 46.25V27.75C65.5208 13.5358 60.4642 8.47913 46.25 8.47913H27.75Z"
      fill="#00DA71"
    />
  </svg>
]
