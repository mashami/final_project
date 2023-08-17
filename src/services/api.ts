import { createApi } from "@/utils/types"

export const create = async ({
  ownerId,
  title,
  price,
  languages,
  discription,
  apiUrl,
  apiCategory,
  apiDocumentationLink
}: createApi) => {
  const response = await fetch(`/api/apise/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ownerId,
      title,
      discription,
      apiDocumentationLink,
      apiCategory,
      languages,
      apiUrl,
      price
    })
  })

  const result = await response.json()

  return result
}

export const getUnActiveAPis = async () => {
  const response = await fetch(process.env.APP_URL + `/api/apise/get_unctive`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  })

  const result = await response.json()

  return result
}

export const changeAPIUnActive = async ({
  apiId,
  message
}: {
  apiId: string
  message: string
}) => {
  const response = await fetch(`/api/apise/update-api_unctive`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apiId, message })
  })

  const result = await response.json()

  return result
}

export const changeAPIActive = async ({ apiId }: { apiId: string }) => {
  const response = await fetch(`/api/apise/update-api-active`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apiId })
  })

  const result = await response.json()

  return result
}
