export interface SignupType {
  email: string
  phoneNumber?: string
  linkedin?: string
  github?: string
  hostedlink?: string
  password: string
  retypedPassword: string
}

export interface SigninType {
  email: string
  password: string
}

export interface updatePasswordType {
  userId: string
  currentPassword: string
  newPassword: string
  retypedNewPassword: string
}

export interface SocialsName {
  title:
    | "twitter"
    | "facebook"
    | "snapchat"
    | "instagram"
    | "tiktok"
    | "mail"
    | "edit"
}

export interface createApi {
  ownerId: String
  title: String
  discription: String
  languages: String
  price?: String
  apiDocumentationLink: String
  apiUrl: String
  apiCategory: String
  accessToken: String
}
