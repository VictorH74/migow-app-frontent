import React from 'react';
import useNotificationsDialog from "./useNotificationsDialog"


export default function NotificationsDialog() {
  const hook = useNotificationsDialog();

  return (
    <div>
      Notificationsdialog component
    </div>
  );
}