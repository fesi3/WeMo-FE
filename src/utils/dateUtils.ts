// dayjs 기능을 모듈화

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { CalendarPlanData } from '@/types/mypageType';

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

// 날짜 문자열 => Date 객체로 변환
export const parseDateString = (dateString: string | Date): Date => {
  return new Date(dateString);
};

// 선택한 날짜 or 현재 날짜(default)에서 연, 월, 일 반환
export function getDateInfo(date?: Date | string | null) {
  const dateObj = dayjs(date || new Date()); // null일 경우 현재 날짜 사용
  return {
    year: dateObj.year(),
    month: dateObj.month() + 1,
    day: dateObj.date(),
  };
}

// 특정 월의 일정만 필터링
export function getFilteredSchedulesByMonth(
  schedules: CalendarPlanData[], // 서버에서 받아오는 일정 배열
  targetDate: Date | string, // 필터링할 기준 날짜(달력 날짜 기준)
) {
  const { year, month } = getDateInfo(targetDate); // 달력의 연, 월
  return schedules.filter((schedule) => {
    const { year: scheduleYear, month: scheduleMonth } = getDateInfo(
      schedule.dateTime,
    );
    return scheduleYear === year && scheduleMonth === month;
  });
}

// 특정 월의 첫째 날 - 마지막 날 반환
export function getFirstAndLastDayOfMonth(year: number, month: number) {
  const startDate = dayjs()
    .year(year)
    .month(month - 1)
    .startOf('month')
    .format('YYYY-MM-DD'); // month는 0부터 시작
  const endDate = dayjs()
    .year(year)
    .month(month - 1)
    .endOf('month')
    .format('YYYY-MM-DD'); // month는 0부터 시작
  return { startDate, endDate };
}
