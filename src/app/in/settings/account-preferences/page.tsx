import React from 'react';
import ConfigTile from '../components/ConfigTile';
import DarkModeConfig from './DarkModeConfig';
import SoundEffectsConfig from './SoundEffectsConfig';
import OnlineUsersCountLimitConfig from './OnlineUsersCountLimitConfig';

export default function AccountPreferencesPage() {

  // TODO: fetch accountPreferencesSettings by user id
  const accountPreferencesSettings = {
    imageProfile: "all"
  }

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