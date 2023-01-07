import { INotification } from '../models/Notification.model';

export function sortedNotificationsByDate(notifications: INotification[]) {
  return [...notifications].sort((first, second) => first.date.getTime() - second.date.getTime());
}

export function datesIsDifferent(first: Date, second: Date) {
  return first.getDate() !== second.getDate()
  || first.getMonth() !== second.getMonth()
  || first.getFullYear() !== second.getFullYear();
}
