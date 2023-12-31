import { createApi } from "@/utils/types"

export const create = async ({
  ownerId,
  title,
  price,
  languages,
  discription,
  apiUrl,
  apiCategory,
  apiDocumentationLink,
  accessToken
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
      price,
      accessToken
    })
  })

  const result = await response.json()

  return result
}

export const getUnActiveAPis = async () => {
  const response = await fetch(process.env.APP_URL + `/api/apise/get_unctive`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store"
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
    body: JSON.stringify({ apiId, message }),
    cache: "no-store"
  })

  const result = await response.json()

  return result
}

export const changeAPIActive = async ({ apiId }: { apiId: string }) => {
  const response = await fetch(`/api/apise/update-api-active`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apiId }),
    cache: "no-store"
  })

  const result = await response.json()

  return result
}

export const getPublicApis = async () => {
  const response = await fetch(process.env.APP_URL + `/api/apise/get-public`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store"
  })

  const result = await response.json()

  return result
}

export const getPrivateApis = async () => {
  const response = await fetch(process.env.APP_URL + `/api/apise/get-private`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store"
  })

  const result = await response.json()

  return result
}

export const getApisUser = async (userId: string) => {
  const response = await fetch(
    process.env.APP_URL + `/api/apise/get_apis_user`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
      cache: "no-store"
    }
  )

  const result = await response.json()

  return result
}

export const get_4_apis_active = async () => {
  const response = await fetch(
    process.env.APP_URL + `/api/apise/get_active_4`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store"
    }
  )

  const result = await response.json()

  return result
}

export const getApi = async (apiId: string) => {
  const response = await fetch(process.env.APP_URL + `/api/apise/getApi`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apiId }),
    cache: "no-store"
  })
  const result = await response.json()
  return result
}

export const getDoc = async (url: string) => {
  const response = await fetch(`${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store"
  })

  const result = await response.text()

  return result
}

export const deleteApi = async ({
  apiId,
  userId
}: {
  apiId: string
  userId: string
}) => {
  const response = await fetch(`/api/apise/delete_api`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apiId, userId }),
    cache: "no-store"
  })
  const result = await response.json()

  return result
}

export const requestApi = async ({
  email,
  phoneNumber,
  numberPay,
  camponyName,
  description,
  problemStatment,
  amount
}: {
  email: string
  numberPay: string
  phoneNumber: string
  camponyName: string
  description: string
  problemStatment: string
  amount: number
}) => {
  console.log("My statment===>", problemStatment)

  const response = await fetch(`/api/apise/request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      phoneNumber,
      numberPay,
      camponyName,
      description,
      problemStatment,
      amount
    }),
    cache: "no-store"
  })

  const result = await response.json()

  return result
}

export const getRequests = async () => {
  const response = await fetch(
    process.env.APP_URL + `/api/apise/get-requests`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store"
    }
  )

  const result = await response.json()

  return result
}

export const getRequest = async (requestId: string) => {
  const response = await fetch(process.env.APP_URL + `/api/apise/get-request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ requestId }),
    cache: "no-store"
  })
  const result = await response.json()
  return result
}

export const getRequestActive = async () => {
  const response = await fetch(
    process.env.APP_URL + `/api/apise/get-requests-active`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store"
    }
  )
  const result = await response.json()
  return result
}

export const changeRequestUnctive = async ({
  requestId
}: {
  requestId: string
}) => {
  const response = await fetch(`/api/apise/update-request-unctive`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ requestId }),
    cache: "no-store"
  })
  const result = await response.json()
  return result
}

export const RequestActiveUpdate = async ({
  requestId
}: {
  requestId: string
}) => {
  const response = await fetch(`/api/apise/update-request-active`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ requestId }),
    cache: "no-store"
  })
  const result = await response.json()
  return result
}

export const privateAPIPay = async ({
  email,
  phoneNumber,
  apiId,
  amount
}: {
  email: string
  phoneNumber: string
  apiId: string
  amount: number
}) => {
  const response = await fetch(`/api/apise/private-api-pay`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      phoneNumber,
      apiId,
      amount
    }),
    cache: "no-store"
  })

  const result = await response.json()

  return result
}

export const AddContributors = async ({
  requestId,
  userId
}: {
  requestId: string
  userId: string
}) => {
  const response = await fetch(`/api/apise/update-contribute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ requestId, userId }),
    cache: "no-store"
  })
  const result = await response.json()
  return result
}
