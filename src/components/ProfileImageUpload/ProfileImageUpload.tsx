"use client"

import { cn } from "@/lib/utils"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { fileToDataURI } from "@/utils/helpers"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { Logo } from "../Logo"
import { Button } from "../ui/button"

interface ProfileImageUploadProps {
  className?: string
  userId: string
  profileImage?: string
}

const ProfileImageUpload = ({
  userId,
  profileImage,
  className
}: ProfileImageUploadProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [updatedLogo, setUpdatedLogo] = useState<string>(profileImage ?? "")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [isPending, startTransition] = useTransition()

  const isMutating = isLoading || isPending

  const router = useRouter()

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    if (!file) {
      return null
    }

    const uri = (await fileToDataURI(file)) as any

    if (uri?.error) return

    setUpdatedLogo(uri)
    setIsDialogOpen(true)
  }

  const handleDialogOpen = (open: boolean) => {
    if (!open) {
      setUpdatedLogo(profileImage ?? "")
    }

    setIsDialogOpen(open)
  }
  const uploadLogoHandler = () => {
    return
  }

  return (
    <>
      <div
        className={cn(
          "relative w-[100px] h-[100px] rounded-full overflow-hidden bg-brand border-[3px] border-white cursor-pointer group",
          className
        )}
      >
        <Image
          src="/paccyImage.png"
          fill
          priority
          style={{ objectFit: "cover" }}
          alt="cover-image"
        />

        <div className="h-[40%] bg-black/30 absolute bottom-0 w-full flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-in-out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-white w-6 h-6 z-10"
            viewBox="0 0 256 256"
          >
            <path d="M208,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.71,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H80a8,8,0,0,0,6.66-3.56L100.28,48h55.43l13.63,20.44A8,8,0,0,0,176,72h32a8,8,0,0,1,8,8ZM128,88a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,88Zm0,72a28,28,0,1,1,28-28A28,28,0,0,1,128,160Z" />
          </svg>
        </div>

        <label
          className="absolute w-full h-full top-0 left-0 z-20 cursor-pointer"
          htmlFor="upload-logo"
        >
          <input
            className="hidden"
            type="file"
            id="upload-logo"
            onChange={handleFileChange}
            accept="image/*"
            max={1}
          />
        </label>
      </div>

      <AlertDialog

      // onOpenChange={(open) => handleDialogOpen(open)}
      >
        <AlertDialogContent className="max-w-[300px] p-6 bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center justify-center">
              <Logo />
            </AlertDialogTitle>
          </AlertDialogHeader>

          <div className="my-8 h-px bg-[#F0F0F0] w-full"></div>

          <div className="w-[250px] h-[250px] rounded-full mx-auto mb-8 overflow-hidden relative border border-primary">
            {updatedLogo && (
              <Image
                src="/paccyImage.png"
                fill
                priority
                style={{ objectFit: "contain" }}
                alt="cover-image"
              />
            )}
          </div>

          <AlertDialogFooter>
            <div className="grid grid-cols-2 gap-[10px] w-full">
              <AlertDialogCancel className="h-10" disabled={isMutating}>
                Cancel
              </AlertDialogCancel>
              <Button
                className="h-10"
                loading={isMutating}
                // onClick={uploadLogoHandler}
              >
                Confirm
              </Button>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ProfileImageUpload
