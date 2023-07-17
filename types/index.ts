import { Report } from "@prisma/client"

export type SafeReport = Omit<
  Report,
  "listCanceled"
> & {
  listCanceled: []
}