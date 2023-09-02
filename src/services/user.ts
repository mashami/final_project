import { SigninType, SignupType } from "@/utils/types"

export const signUp = async ({
  email,
  password,
  retypedPassword
}: SignupType) => {
  const response = await fetch(`/api/user/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, retypedPassword }),
    cache: "no-store"
  })

  const result = await response.json()

  return result
}

export const logIn = async ({ email, password }: SigninType) => {
  const response = await fetch(process.env.APP_URL + `/api/user/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store"
  })

  const result = await response.json()

  return result
}

export const signUpDev = async ({
  email,
  phoneNumber,
  linkedin,
  github,
  hostedlink,
  password,
  retypedPassword
}: SignupType) => {
  const response = await fetch(`/api/user/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      phoneNumber,
      linkedin,
      github,
      hostedlink,
      password,
      retypedPassword
    }),
    cache: "no-store"
  })

  const result = await response.json()

  return result
}

export const getUser = async (userId: string) => {
  const response = await fetch(process.env.APP_URL + `/api/user/get`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
    cache: "no-store"
  })

  const result = await response.json()

  return result
}

export const updateName = async ({
  userId,
  name
}: {
  userId: string
  name: string
}) => {
  const response = await fetch(`/api/user/update-name`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, name }),
    cache: "no-store"
  })

  const result = await response.json()

  return result
}

export const updateLanguage = async ({
  userId,
  language
}: {
  userId: string
  language: string
}) => {
  const response = await fetch(`/api/user/update-language`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, language }),
    cache: "no-store"
  })

  const result = await response.json()

  return result
}

export const updateDescription = async ({
  userId,
  description
}: {
  userId: string
  description: string
}) => {
  const response = await fetch(`/api/user/update-description`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, description }),
    cache: "no-store"
  })

  const result = await response.json()

  return result
}

export const getUnctiveDev = async (userId: string) => {
  const response = await fetch(process.env.APP_URL + `/api/user/get_unctive`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
    cache: "no-store"
  })

  const result = await response.json()

  return result
}

export const changeDevActive = async ({ userId }: { userId: string }) => {
  const response = await fetch(`/api/user/update-dev_active`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
    cache: "no-store"
  })

  const result = await response.json()

  return result
}

export const changeDevUnActive = async ({
  userId,
  message
}: {
  userId: string
  message: string
}) => {
  const response = await fetch(`/api/user/update-dev_unctive`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, message }),
    cache: "no-store"
  })

  const result = await response.json()

  return result
}

export const updateProfileImage = async ({
  userId,
  profile_image
}: {
  userId: string
  profile_image: string
}) => {
  const response = await fetch(`/api/user/update-image`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, profile_image }),
    cache: "no-store"
  })

  const result = await response.json()

  return result
}

export const getActiveDev = async () => {
  const response = await fetch(process.env.APP_URL + `/api/user/get_active`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store"
  })

  const result = await response.json()

  return result
}
