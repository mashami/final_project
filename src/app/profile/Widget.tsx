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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { create } from "@/services/api"
import { updateDescription, updateLanguage, updateName } from "@/services/user"
import { fileToDataURI2 } from "@/utils/helpers"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { UserWithRelations } from "./page"

interface DevProfileWidgetProps {
  user: UserWithRelations
}

const DevProfileWidget = ({ user }: DevProfileWidgetProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [name, setName] = useState<string>(user.name ?? "")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [languanges, setLanguanges] = useState<string>(user.languages ?? "")
  const [description, setDescription] = useState<string>(user.discription ?? "")
  const [isPending, startTransition] = useTransition()
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [discription, setDiscription] = useState<string>("")
  const [language, setLanguange] = useState<string>("")
  const [hostedLink, setHostedLink] = useState<string>("")
  const [uploadedFile, setUploadedFile] = useState<string>("")
  const router = useRouter()

  const isMutating = isLoading || isPending

  const onCancel = () => {
    if (isMutating) return

    setName(user.name ?? "")
    setIsEditing(false)
  }

  const onCanceltolanguage = () => {
    if (isMutating) return

    setName(user.languages ?? "")
    setIsEditing(false)
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
    const file = event.target.files?.[0]

    if (!file) {
      return null
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
    setIsLoading(true)
    try {
      const data = await create({
        ownerId: user.id,
        apiCategory: selectedCategory,
        apiDocumentationLink: hostedLink,
        apiUrl: uploadedFile,
        discription: discription,
        title,
        languages: language
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
    <div>
      <div className="">
        <NavBar />
      </div>

      <div className="py-8 px-4 flex justify-between  ">
        <div className=" w-96 h-full grid place-items-center py-8 space-y-4">
          <div className="grid gap-2 place-items-center">
            <ProfileImageUpload
              profileImage={user.profile_image ?? ""}
              userId={user.id}
            />

            <span className="space-y-1 font-serif text-center">
              {!user.name ? (
                <div className=" w-full flex items-center justify-between">
                  {isEditing ? (
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
                    <span className="flex items-center justify-between space-x-4">
                      <p>Add your name</p>{" "}
                      <span onClick={() => setIsEditing(true)}>
                        <Icon title="edit" />
                      </span>
                    </span>
                  )}
                </div>
              ) : (
                <p className=" font-semibold">{user.name}</p>
              )}
              {!user.languages ? (
                <div className=" w-full flex items-center justify-between">
                  {isEditing ? (
                    <span className="flex items-start justify-center space-x-4">
                      <Input
                        value={languanges}
                        placeholder="Enter you all languanges"
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
                    <span className="flex items-center justify-between space-x-4">
                      <p>Add your languanges</p>{" "}
                      <span onClick={() => setIsEditing(true)}>
                        <Icon title="edit" />
                      </span>
                    </span>
                  )}
                </div>
              ) : (
                <p className=" text-gray-500">{user.languages}</p>
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
                <a className="text-sm text-purple-400" href={`${user.github}`}>
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
            {!user.discription ? (
              <div className="">
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
              <p className="px-20"> {user.discription}</p>
            )}
          </span>
          <div className="flex-grow-0 flex justify-between items-center ">
            <h1>APIs</h1>
            <Dialog>
              <DialogTrigger>
                <Button text="Add API" className="rounded-lg" />
              </DialogTrigger>

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
                        onValueChange={(value) => setSelectedCategory(value)}
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

                      {selectedCategory === "private" && (
                        <div className="space-y-2">
                          <Label>Price</Label>
                          <Input
                            type="number"
                            id="price"
                            placeholder="Enter the price"
                          />
                        </div>
                      )}

                      {selectedCategory === "private" && (
                        <div className="space-y-2">
                          <Label>Access Token</Label>
                          <Input
                            type="text"
                            id="accessToken"
                            placeholder="Enter the access token"
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
                          // accept=".mdx"
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
          </div>

          <div className=" grid grid-cols-3 gap-2 relative">
            <Link href={""}>
              <Card
                className="h-20"
                title="APi"
                desc="A simple discriptions of API"
                svg={
                  <svg
                    width={75}
                    height={75}
                    viewBox="0 0 75 75"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1_146)">
                      <path
                        d="M32.6863 9.67557C35.774 8.44034 39.2186 8.44034 42.3063 9.67557L63.6072 18.2004C65.7162 19.0403 67.0963 21.0827 67.0963 23.3508V51.641C67.0965 52.7504 66.7642 53.8344 66.1422 54.7531C65.5203 55.6719 64.6373 56.3831 63.6072 56.7951L42.3063 65.3162C40.5531 66.0176 38.6676 66.327 36.7822 66.2227C36.5345 65.7837 36.2283 65.3804 35.872 65.0239L35.6463 64.8019V33.2002L11.5963 23.5802V33.9032C10.3347 34.0416 9.09321 34.3247 7.8963 34.7468V23.3508C7.89685 22.242 8.22951 21.1587 8.8514 20.2408C9.47328 19.3228 10.3559 18.6121 11.3854 18.2004L32.6863 9.67557ZM40.9336 13.1166C38.7282 12.2344 36.268 12.2344 34.0627 13.1166L29.0677 15.1146L51.8338 24.2166L60.2661 20.8496L40.9336 13.1166ZM46.8536 26.2146L24.0838 17.1015L14.7265 20.8459L37.4963 29.9553L46.8536 26.2146ZM63.3963 23.5765L39.3463 33.1965V62.3525C39.8865 62.2415 40.4156 62.0824 40.9299 61.8789L62.2345 53.3578C62.578 53.2201 62.8724 52.9826 63.0795 52.6758C63.2866 52.3691 63.397 52.0074 63.3963 51.6373V23.5765ZM13.4463 63.3996C16.3545 63.3996 19.0407 62.4376 21.2015 60.8207L30.6365 70.2557C30.8083 70.4277 31.0122 70.5642 31.2367 70.6573C31.4612 70.7505 31.7019 70.7986 31.945 70.7987C32.1881 70.7989 32.4288 70.7512 32.6534 70.6583C32.8781 70.5655 33.0822 70.4293 33.2542 70.2575C33.4263 70.0858 33.5627 69.8818 33.6559 69.6573C33.7491 69.4328 33.7972 69.1921 33.7973 68.949C33.7975 68.7059 33.7498 68.4652 33.6569 68.2406C33.5641 68.0159 33.4279 67.8118 33.2561 67.6398L23.8211 58.2048C25.5675 55.8692 26.4745 53.0126 26.3952 50.0974C26.3159 47.1822 25.2549 44.3791 23.3841 42.142C21.5133 39.9048 18.9421 38.3647 16.0869 37.7709C13.2317 37.1771 10.2597 37.5644 7.65199 38.87C5.04433 40.1757 2.95371 42.3234 1.71866 44.9652C0.483611 47.6071 0.17643 50.5885 0.846859 53.4267C1.51729 56.2648 3.12607 58.7936 5.41272 60.6036C7.69937 62.4136 10.53 63.3987 13.4463 63.3996ZM13.4463 59.6996C10.993 59.6996 8.64027 58.725 6.90556 56.9903C5.17085 55.2556 4.1963 52.9028 4.1963 50.4496C4.1963 47.9963 5.17085 45.6435 6.90556 43.9088C8.64027 42.1741 10.993 41.1996 13.4463 41.1996C15.8995 41.1996 18.2523 42.1741 19.987 43.9088C21.7217 45.6435 22.6963 47.9963 22.6963 50.4496C22.6963 52.9028 21.7217 55.2556 19.987 56.9903C18.2523 58.725 15.8995 59.6996 13.4463 59.6996Z"
                        fill="#2639ED"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_146">
                        <rect
                          width={74}
                          height={74}
                          fill="white"
                          transform="translate(0.5 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                }
              />
            </Link>
            <Link href={""}>
              <Card
                className="h-20"
                title="APi"
                desc="A simple discriptions of API"
                svg={
                  <svg
                    width={75}
                    height={75}
                    viewBox="0 0 75 75"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1_146)">
                      <path
                        d="M32.6863 9.67557C35.774 8.44034 39.2186 8.44034 42.3063 9.67557L63.6072 18.2004C65.7162 19.0403 67.0963 21.0827 67.0963 23.3508V51.641C67.0965 52.7504 66.7642 53.8344 66.1422 54.7531C65.5203 55.6719 64.6373 56.3831 63.6072 56.7951L42.3063 65.3162C40.5531 66.0176 38.6676 66.327 36.7822 66.2227C36.5345 65.7837 36.2283 65.3804 35.872 65.0239L35.6463 64.8019V33.2002L11.5963 23.5802V33.9032C10.3347 34.0416 9.09321 34.3247 7.8963 34.7468V23.3508C7.89685 22.242 8.22951 21.1587 8.8514 20.2408C9.47328 19.3228 10.3559 18.6121 11.3854 18.2004L32.6863 9.67557ZM40.9336 13.1166C38.7282 12.2344 36.268 12.2344 34.0627 13.1166L29.0677 15.1146L51.8338 24.2166L60.2661 20.8496L40.9336 13.1166ZM46.8536 26.2146L24.0838 17.1015L14.7265 20.8459L37.4963 29.9553L46.8536 26.2146ZM63.3963 23.5765L39.3463 33.1965V62.3525C39.8865 62.2415 40.4156 62.0824 40.9299 61.8789L62.2345 53.3578C62.578 53.2201 62.8724 52.9826 63.0795 52.6758C63.2866 52.3691 63.397 52.0074 63.3963 51.6373V23.5765ZM13.4463 63.3996C16.3545 63.3996 19.0407 62.4376 21.2015 60.8207L30.6365 70.2557C30.8083 70.4277 31.0122 70.5642 31.2367 70.6573C31.4612 70.7505 31.7019 70.7986 31.945 70.7987C32.1881 70.7989 32.4288 70.7512 32.6534 70.6583C32.8781 70.5655 33.0822 70.4293 33.2542 70.2575C33.4263 70.0858 33.5627 69.8818 33.6559 69.6573C33.7491 69.4328 33.7972 69.1921 33.7973 68.949C33.7975 68.7059 33.7498 68.4652 33.6569 68.2406C33.5641 68.0159 33.4279 67.8118 33.2561 67.6398L23.8211 58.2048C25.5675 55.8692 26.4745 53.0126 26.3952 50.0974C26.3159 47.1822 25.2549 44.3791 23.3841 42.142C21.5133 39.9048 18.9421 38.3647 16.0869 37.7709C13.2317 37.1771 10.2597 37.5644 7.65199 38.87C5.04433 40.1757 2.95371 42.3234 1.71866 44.9652C0.483611 47.6071 0.17643 50.5885 0.846859 53.4267C1.51729 56.2648 3.12607 58.7936 5.41272 60.6036C7.69937 62.4136 10.53 63.3987 13.4463 63.3996ZM13.4463 59.6996C10.993 59.6996 8.64027 58.725 6.90556 56.9903C5.17085 55.2556 4.1963 52.9028 4.1963 50.4496C4.1963 47.9963 5.17085 45.6435 6.90556 43.9088C8.64027 42.1741 10.993 41.1996 13.4463 41.1996C15.8995 41.1996 18.2523 42.1741 19.987 43.9088C21.7217 45.6435 22.6963 47.9963 22.6963 50.4496C22.6963 52.9028 21.7217 55.2556 19.987 56.9903C18.2523 58.725 15.8995 59.6996 13.4463 59.6996Z"
                        fill="#2639ED"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_146">
                        <rect
                          width={74}
                          height={74}
                          fill="white"
                          transform="translate(0.5 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                }
              />
            </Link>
            <Link href={""}>
              <Card
                className="h-20"
                title="APi"
                desc="A simple discriptions of API"
                svg={
                  <svg
                    width={75}
                    height={75}
                    viewBox="0 0 75 75"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1_146)">
                      <path
                        d="M32.6863 9.67557C35.774 8.44034 39.2186 8.44034 42.3063 9.67557L63.6072 18.2004C65.7162 19.0403 67.0963 21.0827 67.0963 23.3508V51.641C67.0965 52.7504 66.7642 53.8344 66.1422 54.7531C65.5203 55.6719 64.6373 56.3831 63.6072 56.7951L42.3063 65.3162C40.5531 66.0176 38.6676 66.327 36.7822 66.2227C36.5345 65.7837 36.2283 65.3804 35.872 65.0239L35.6463 64.8019V33.2002L11.5963 23.5802V33.9032C10.3347 34.0416 9.09321 34.3247 7.8963 34.7468V23.3508C7.89685 22.242 8.22951 21.1587 8.8514 20.2408C9.47328 19.3228 10.3559 18.6121 11.3854 18.2004L32.6863 9.67557ZM40.9336 13.1166C38.7282 12.2344 36.268 12.2344 34.0627 13.1166L29.0677 15.1146L51.8338 24.2166L60.2661 20.8496L40.9336 13.1166ZM46.8536 26.2146L24.0838 17.1015L14.7265 20.8459L37.4963 29.9553L46.8536 26.2146ZM63.3963 23.5765L39.3463 33.1965V62.3525C39.8865 62.2415 40.4156 62.0824 40.9299 61.8789L62.2345 53.3578C62.578 53.2201 62.8724 52.9826 63.0795 52.6758C63.2866 52.3691 63.397 52.0074 63.3963 51.6373V23.5765ZM13.4463 63.3996C16.3545 63.3996 19.0407 62.4376 21.2015 60.8207L30.6365 70.2557C30.8083 70.4277 31.0122 70.5642 31.2367 70.6573C31.4612 70.7505 31.7019 70.7986 31.945 70.7987C32.1881 70.7989 32.4288 70.7512 32.6534 70.6583C32.8781 70.5655 33.0822 70.4293 33.2542 70.2575C33.4263 70.0858 33.5627 69.8818 33.6559 69.6573C33.7491 69.4328 33.7972 69.1921 33.7973 68.949C33.7975 68.7059 33.7498 68.4652 33.6569 68.2406C33.5641 68.0159 33.4279 67.8118 33.2561 67.6398L23.8211 58.2048C25.5675 55.8692 26.4745 53.0126 26.3952 50.0974C26.3159 47.1822 25.2549 44.3791 23.3841 42.142C21.5133 39.9048 18.9421 38.3647 16.0869 37.7709C13.2317 37.1771 10.2597 37.5644 7.65199 38.87C5.04433 40.1757 2.95371 42.3234 1.71866 44.9652C0.483611 47.6071 0.17643 50.5885 0.846859 53.4267C1.51729 56.2648 3.12607 58.7936 5.41272 60.6036C7.69937 62.4136 10.53 63.3987 13.4463 63.3996ZM13.4463 59.6996C10.993 59.6996 8.64027 58.725 6.90556 56.9903C5.17085 55.2556 4.1963 52.9028 4.1963 50.4496C4.1963 47.9963 5.17085 45.6435 6.90556 43.9088C8.64027 42.1741 10.993 41.1996 13.4463 41.1996C15.8995 41.1996 18.2523 42.1741 19.987 43.9088C21.7217 45.6435 22.6963 47.9963 22.6963 50.4496C22.6963 52.9028 21.7217 55.2556 19.987 56.9903C18.2523 58.725 15.8995 59.6996 13.4463 59.6996Z"
                        fill="#2639ED"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_146">
                        <rect
                          width={74}
                          height={74}
                          fill="white"
                          transform="translate(0.5 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                }
              />
            </Link>
          </div>
          <div className="absolute bottom-3 right-[30%] -z-10">
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
