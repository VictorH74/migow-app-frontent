import React from 'react';
import UserActivities from './components/UserActivities';
import SendIcon from '@mui/icons-material/Send';
import { usersMock } from '@/mockData';
import Avatar from '@mui/material/Avatar';
import { stringAvatar } from '@/util/functions';
import { ProfileSettingsInterface, UserInterface } from '@/interfaces';
import { VisibilityEnum } from '@/enums';

// const fetchUser = async (id: string) => {
//   return new Promise((res) => {

//   })
// }

// temp
const currentUser: UserInterface = {
  createdAt: "",
  email: "",
  followers: [usersMock[0], usersMock[1], usersMock[2], usersMock[3]],
  id: "vvv",
  name: "",
  username: "",
}

export default function ProfilePage({ params }: { params: { username: string } }) {

  // Unique data aproach
  // const profileData = await api.getProfileData(visitorId=currentUser.id)
  // const {ownerUser, ownerUserFollowed, commonFollowersCount, firstTwoFollowers, profileSettings } = profileData

  // TODO: fetch owner user from api
  // WITH CLIENTHTTP
  // const ownerUser = await api.getOwnerUser(params.username)
  const ownerUser = usersMock.find(user => user.username === params.username)

  if (!ownerUser) return <div>User not found</div>

  // TODO: check if is owner
  const isOwner = currentUser.id === ownerUser.id

  // TODO: if !isOwner -> check if user has been blocked from the isOwner
  // WITH CLIENTHTTP
  // const currentUserBlocked = (await api.checkUserBlock(ownerUser.id, currentUser.id)).status
  // if (currentUserBlocked) <div>{ownerUser.username has blobked you!}</div>


  // WITH CLIENTHTTP
  // const profileSettings = await api.getProfileSettings(ownerUser.id)
  // temp
  const profileSettings: ProfileSettingsInterface = {
    id: "aaa",
    activityVisibility: VisibilityEnum.PUBLIC,
    followersVisibility: VisibilityEnum.PUBLIC,
    nameVisibility: VisibilityEnum.PUBLIC,
  }

  // TODO: if !isOwner AND 1+ user followers in ownerUser followers -> fetch the firsts two folllowers profile img and followers count - 2
  // WITH CLIENTHTTP
  // const ownerUserFollowed = !isOwner ? false : (await api.userFollowedBy(ownerUser.id, currentUser.id)).followed
  // temp
  const ownerUserFollowed = !isOwner && !!currentUser.followers.find(u => u.id === ownerUser.id)
  
  const firstTwoFollowers: UserInterface[] = []

  // TODO: Create Follow table and indexes to performance query
  // WITH CLIENTHTTP
  // const commonFollowersCount = await api.getCommonFollowers(currentUser.id, ownerUser.id)
  // temp
  const commonFollowersCount = currentUser.followers.reduce((total, u, index) => {
    if (index < 2) {
      firstTwoFollowers.push(u)
    }
    return total + (!!ownerUser.followers.find(us => us.id === u.id) ? 1 : 0)
  }, 0)

  // TODO: fetch user profile settings to check privacy conditions and some profile configs

  // TODO: if profileSettings.activityVisibility.PUBLIC OR (!isOwner AND activityVisibility.FOLLOWERS AND ownerUser.followers.includes(user.id))


  return (
    <div className='mt-2'>
      <main className=' w-full max-w-[1400px] m-auto'>

        {/* User BG Image */}
        <div className='bg-blue-400 rounded-lg w-full h-48 my-8'></div>

        <div className=' flex gap-2'>
          {/* User IMG */}
          <div className='size-44 bg-blue-400 rounded-full'></div>

          <div className='flex flex-col grow justify-center'>
            <div className='w-full'>
              <p className='text-2xl'>{ownerUser.name} <span className='text-1xl text-gray-600'> - {ownerUser.username}</span></p>
            </div>
            {ownerUser.bio && (<div className='w-full'>{ownerUser.bio}</div>)}

            <div className='w-full flex justify-between items-center'>
              <p>
                {ownerUser.followers.length} followers
              </p>
              {isOwner ?
                (
                  <button className='py-2 px-4 rounded-2xl bg-gray-500 text-white' >
                    Edit profile
                  </button>
                )
                : (
                  <div>
                    <button className='py-2 px-4 rounded-2xl bg-gray-500 text-white'>
                      <SendIcon /> Send Message
                    </button>
                    {!ownerUserFollowed && (
                      <button className='py-2 px-4 rounded-2xl bg-blue-400 text-white ml-2'>
                        Follow User
                      </button>
                    )}

                  </div>
                )}
            </div>

            {!isOwner && (
              commonFollowersCount > 2 ?
                (
                  <div className='flex items-center gap-6'>

                    <div className='relative'>
                      {firstTwoFollowers.map((f, i) => (
                        <div key={f.id} className={i === 1 ? 'absolute top-0 -right-5' : ""}>
                          <Avatar {...stringAvatar(f.name, { width: 30, height: 30, fontSize: 12 })} />
                        </div>
                      ))}
                    </div>

                    <button className='hover:underline hover:underline-offset-2'>
                      and {commonFollowersCount - 2} other common followers
                    </button>

                  </div>
                )
                : (<p>{commonFollowersCount} common followers</p>)
            )}

            <div className='w-full'></div>
          </div>
        </div>

        {/* diviser */}
        <div className='bg-gray-600 w-[85%] m-auto h-[2px] my-9' />

        <UserActivities userId={ownerUser.id} />

      </main>
    </div>
  );
}