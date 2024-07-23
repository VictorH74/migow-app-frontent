import React from 'react';
import UserProfileImgConfig from './UserProfileImgConfig';
import UserNameConfig from './UserNameConfig';
import UserBioConfig from './UserBioConfig';
import UserFriendsConfig from './UserFollowersConfig';
import UserActivitiesConfig from './UserActivitiesConfig';
import UserOnlineStatusConfig from './UserOnlineStatusConfig';
import MessageReadConfirmationConfig from './MessageReadConfirmationConfig';
import BlockedUserList from './BlockedUserList';
import { PrivacySettingsInterface } from '@/interfaces/PrivacySettings';
import { serverFetch } from '@/lib/actions';

export default async function PrivacyPage() {

  const ownerPSettings = await serverFetch<PrivacySettingsInterface>(`/u-s/settings/privacy`)

  return (
    <div className='w-full'>
      <main className='bg-white shadow-lg mx-auto h-full w-[780px] pt-4'>
        <h2 className="text-xl text-gray-700 ml-5 font-semibold">Who can see my</h2>
        <div className=' divide-y-[2px] divide-gray-500'>
          <UserProfileImgConfig />
          <UserNameConfig />
          <UserBioConfig />
          <UserFriendsConfig />
          <UserActivitiesConfig />
          <UserOnlineStatusConfig />
        </div>

        <h2 className="text-xl text-gray-700 mt-2 ml-5 font-semibold">Messages</h2>
        <div className=' divide-y-[2px] divide-gray-500'>
          <MessageReadConfirmationConfig />
        </div>

        <h2 className="text-xl text-gray-700 mt-2 ml-5 font-semibold">Others</h2>
        <div className=' divide-y-[2px] divide-gray-500'>
          <BlockedUserList />
        </div>

      </main>
    </div>
  );
}