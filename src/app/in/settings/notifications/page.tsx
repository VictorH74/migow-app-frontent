import { NotificationInterface } from '@/interfaces/Notification';
import { serverFetch } from '@/lib/actions';
import React from 'react';

export default async function NotificationsPage() {

  const ownerNSettings = await serverFetch<NotificationInterface>(`/u-s/settings/notification`)

  return (
    <div className='w-full'>
      <main className='bg-white shadow-lg mx-auto h-full w-[780px]'>
        notifications
      </main>
    </div>
  );
}