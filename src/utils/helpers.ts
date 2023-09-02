import { toast } from "@/components/ui/use-toast"

export function fileToDataURI(file: File) {
  const maxSizeInBytes = 5 * 1024 * 1024

  if (file && !file.type.startsWith("image/")) {
    // Valid image file selected, handle it here
    toast({
      variant: "destructive",
      description: "File selected is not an image"
    })

    return { error: true }
  }

  if (file && file.size >= maxSizeInBytes) {
    toast({
      variant: "destructive",
      description: "Selected image exceeds the maximum file size (5MB)"
    })

    return { error: true }
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const dataURI = reader.result
      resolve(dataURI)
    }

    reader.onerror = (error) => {
      reject(error)
    }

    reader.readAsDataURL(file)
  })
}

export function fileToDataURI2(file: File) {
  const maxSizeInBytes = 5 * 1024 * 1024

  if (file && file.size >= maxSizeInBytes) {
    toast({
      variant: "destructive",
      description: "Selected file exceeds the maximum file size (5MB)"
    })

    return { error: true }
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const dataURI = reader.result
      resolve(dataURI)
    }

    reader.onerror = (error) => {
      reject(error)
    }

    reader.readAsDataURL(file)
  })
}

export function truncateDescription(description: string, maxLength: number) {
  if (description.length > maxLength) {
    return description.slice(0, maxLength) + "..."
  }
  return description
}

export const copyLinkHandler = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)

    toast({
      description: "Link copied"
    })
  } catch (error) {
    toast({
      variant: "destructive",
      description: "An error occured. Please try again"
    })
  }
}
