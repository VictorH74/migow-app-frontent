import React from 'react';
import ConfigTile from '../components/ConfigTile';
import DarkModeConfig from './DarkModeConfig';
import SoundEffectsConfig from './SoundEffectsConfig';
import OnlineUsersCountLimitConfig from './OnlineUsersCountLimitConfig';
import { AccountPreferenceSettingsInterface } from '@/interfaces/AccountPreferenceSettings';
import { serverFetch } from '@/lib/actions';

export default async function AccountPreferencesPage() {

  const ownerAPSettings = await serverFetch<AccountPreferenceSettingsInterface>(`/u-s/settings/account-preference`)

  return (
    <div className='w-full'>
      <main className='bg-white shadow-lg mx-auto h-full w-[780px] divide-y-[2px] divide-gray-500'>
        <DarkModeConfig />
        <SoundEffectsConfig />
        <OnlineUsersCountLimitConfig />
      </main>
    </div>
  );
}