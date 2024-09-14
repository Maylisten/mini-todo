import dayjs from 'dayjs';

export function getBeginTimestamp(date: Date) {
  return dayjs(date).hour(0).minute(0).second(0).millisecond(0).toDate().getTime();
}

export function getCNDay(num: number) {
  const dayArr = ['天', '一', '二', '三', '四', '五', '六'];
  return dayArr[num];
}

export function getDateStr(date: Date): string;
export function getDateStr(date: number): string;
export function getDateStr(date: Date | number): string {
  const timestamp = typeof date === 'number' ? date : date.getTime();
  const dateMoment = dayjs(timestamp);
  const dateStr = dateMoment.format("YYYY年MM月DD日");
  const weekStr = ` 星期${getCNDay(dateMoment.day())}`;
  const todayBeginTimestamp = dayjs(new Date()).hour(0).minute(0).second(0).millisecond(0).toDate().getTime();
  const oneDayMilliseconds = 24 * 60 * 60 * 1000;
  let specialStr = "";
  if (timestamp >= todayBeginTimestamp && timestamp < todayBeginTimestamp + oneDayMilliseconds) {
    specialStr = " 今天";
  } else if (timestamp >= todayBeginTimestamp + oneDayMilliseconds && timestamp < todayBeginTimestamp + 2 * oneDayMilliseconds) {
    specialStr = " 明天";
  } else if (timestamp >= todayBeginTimestamp + 2 * oneDayMilliseconds && timestamp < todayBeginTimestamp + 3 * oneDayMilliseconds) {
    specialStr = " 后天";
  } else if (timestamp < todayBeginTimestamp && timestamp >= todayBeginTimestamp - oneDayMilliseconds) {
    specialStr = " 昨天";
  } else if (timestamp < todayBeginTimestamp - oneDayMilliseconds && timestamp >= todayBeginTimestamp - 2 * oneDayMilliseconds) {
    specialStr = " 前天";
  } else {
    specialStr = "";
  }
  return `${dateStr}${weekStr}${specialStr}`;
}

