export type NotificationTypes = 'badge' | 'info' | 'complete';

export interface INotification {
  id?: string;
  title: string;
  text: string;
  icon: NotificationTypes;
  date: Date
}
