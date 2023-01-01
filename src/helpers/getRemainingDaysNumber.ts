import dayjs from 'dayjs';

export const getRemainingDaysNumber = (
  startDate: string,
  endDate: string,
):
[string, string, boolean] => {
  const dateNow = new Date(Date.now());

  const currentDay = dayjs(dateNow).diff(startDate, 'days') + 1;
  const remainingDays = dayjs(endDate).diff(dateNow, 'days') + 1;

  if (dayjs(dateNow).isBefore(startDate) || dayjs(dateNow).isAfter(endDate)) {
    const daysToStart = dayjs(startDate).diff(dateNow, 'days') + 1;

    return [
      daysToStart.toString().padStart(2, '0'),
      remainingDays.toString().padStart(2, '0'),
      false,
    ];
  }

  return [
    currentDay.toString().padStart(2, '0'),
    remainingDays.toString().padStart(2, '0'),
    true,
  ];
};
