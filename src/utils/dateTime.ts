import dayjs, { Dayjs } from "dayjs"
import duration from "dayjs/plugin/duration"
import localizedFormat from "dayjs/plugin/localizedFormat"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(localizedFormat)

export type Posix = number

type DurationMinutes = number

export const durationToString = (duration: DurationMinutes): string => {
  return dayjs.duration({ minutes: duration }).humanize(false)
}

export const isToday = (date: Posix): boolean => {
  const now = Date.now()
  const beginningOfToday = beginningOfDay(now)
  const endOfToday = dayjs(now).endOf("day").valueOf()
  return beginningOfToday <= date && endOfToday >= date
}

export const daysAgo = (days: number): Posix => {
  return dayjs(Date.now()).subtract(days, "day").valueOf()
}

export const beginningOfDay = (date: Posix): Posix => {
  return dayjs(date).startOf("day").valueOf()
}

export const isInFuture = (date: Posix): boolean => {
  return date > Date.now()
}

export const posixToDayjs = (posixDate: Posix): Dayjs | null => {
  const dayJsDate = dayjs(posixDate)
  return dayJsDate.isValid() ? dayJsDate : null
}

export const timeAgoInWords = (posix: Posix): string => {
  const day = posixToDayjs(posix)
  return day ? day.fromNow() : ""
}