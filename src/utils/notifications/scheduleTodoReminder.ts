import NativeNotifications from '../../../specs/NativeNotifications';

export const scheduleTodoReminder = (
  id: string,
  title: string,
  timeStamp: number,
) => {
  NativeNotifications.scheduleNotification(
    id,
    title,
    `Don't forget to complete ${title}`,
    timeStamp,
  );
};

export const cancelNotification = (id: string) => {
  NativeNotifications.cancelNotification(id);
};
