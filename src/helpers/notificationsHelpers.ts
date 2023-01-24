import { INotification } from '../models/Notification.model';

export function sortedNotificationsByDate(notifications: INotification[]) {
  return [...notifications].sort(
    (first, second) => Date.parse(first.datetime) - Date.parse(second.datetime),
  );
}

export function datesIsDifferent(first: string, second: string) {
  const f = new Date(first);
  const s = new Date(second);

  return (
    f.getDate() !== s.getDate()
    || f.getMonth() !== s.getMonth()
    || f.getFullYear() !== s.getFullYear()
  );
}
