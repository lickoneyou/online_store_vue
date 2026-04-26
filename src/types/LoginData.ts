import type { User } from "./User"

export interface LoginData {
  access_token: string
  user: User
}