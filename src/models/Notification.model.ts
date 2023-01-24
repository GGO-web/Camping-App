export type NotificationTypes = 'badge' | 'info' | 'success';

export interface INotification {
  id?: string;
  title: string;
  message: string;
  type: NotificationTypes;
  datetime?: Date
}
