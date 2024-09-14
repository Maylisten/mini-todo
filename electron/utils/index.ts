import dayjs from "dayjs";

export function getBeginTimestamp(date: Date) {
  return dayjs(date).hour(0).minute(0).second(0).millisecond(0).toDate().getTime();
}
