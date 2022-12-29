import dayjs from 'dayjs';

export const getRemainingDaysNumber = (
  startDate: string,
  endDate: string,
):
[string, string] | string => {
  const dateNow = new Date(Date.now());

  if (dayjs(dateNow).isBefore(startDate) || dayjs(dateNow).isAfter(endDate)) {
    return 'X';
  }

  const currentDay = dayjs(dateNow).diff(startDate, 'days') + 1;
  const remainingDays = dayjs(endDate).diff(dateNow, 'days') + 1;

  return [
    currentDay.toString().padStart(2, '0'),
    remainingDays.toString().padStart(2, '0'),
  ];
};
