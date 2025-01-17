// dayjs 기능을 모듈화

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export function formatTime(time: string | Date, format = 'YYYY-MM-DD') {
  return dayjs(time).format(format);
}

// 현재 시간 기준으로 얼마나 흘렀는 지(XX분 전)
export function fromNow(time: string | Date) {
  return dayjs(time).fromNow();
}

//1월 7일
export function planCardDay(time: string | Date, format = 'M월 D일') {
  return dayjs(time).format(format);
}
//17:30
export function planCardTime(time: string | Date, format = 'HH:mm') {
  return dayjs(time).format(format);
}
/*사용예시
  const dateTime = '2025-01-15T17:00:00'; 
  console.log(formatTime(dateTime));
  console.log(fromNow(dateTime));  

  // */
