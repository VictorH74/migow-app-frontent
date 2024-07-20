import React from 'react';
import UserActivities from './components/UserActivities';
import SendIcon from '@mui/icons-material/Send';
import { ProfileSettingsInterface, UserInterface } from '@/interfaces';
import { VisibilityEnum } from '@/enums';
import { cookies } from "next/headers"
import { ProfileUserType, SimpleUserType } from '@/types';
import Avatar from '@/components/Avatar';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { customFetch } from '@/lib/actions';


const getOwnerUser = async (username: string) =>
  customFetch<ProfileUserType>(`/u-s/users/username/${username}`)

const getCommonFriendship = async (currentUserId: string, profileOwnerUserId: string) =>
  customFetch<{ count: number; firstsTwoFriends: [SimpleUserType, SimpleUserType] }>
    (`/u-s/friendships/common?userId=${currentUserId}&targetId=${profileOwnerUserId}`)

const checkIfHasFriendshipBetweenBoth = async (currentUserId: string, profileOwnerUserId: string) =>
  customFetch<{ isFriend: boolean; }>(`/u-s/friendships/${currentUserId}/friendship-with/${profileOwnerUserId}`)

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const ownerToken = cookies().get("accessToken");
  const decoded = jwtDecode(ownerToken!.value);
  const currentUser = { id: decoded.sub as string }

  // Unique data aproach
  // const profileData = await clientHTTP.getProfileData(visitorId=currentUser.id)
  // const {ownerUser, hasFriendshipBetweenBoth, commonFollowersCount, firstTwoFollowers, profileSettings } = profileData

  // TODO: fetch owner user from api
  // WITH FETCH
  const ownerUser = await getOwnerUser(params.username);

  if (!ownerUser) return <div>User not found</div>

  // TODO: check if is owner
  const isOwner = currentUser.id === ownerUser.id

  // TODO: if !isOwner -> check if user has been blocked from the isOwner
  // WITH CLIENTHTTP
  // const currentUserBlocked = (await clientHTTP.checkUserBlock(ownerUser.id, currentUser.id)).status
  // if (currentUserBlocked) <div>{ownerUser.username has blobked you!}</div>


  // WITH CLIENTHTTP
  // const profileSettings = await clientHTTP.getProfileSettings(ownerUser.id)
  // temp
  const profileSettings: ProfileSettingsInterface = {
    id: "aaa",
    activityVisibility: VisibilityEnum.PUBLIC,
    friendshipsVisibility: VisibilityEnum.PUBLIC,
    nameVisibility: VisibilityEnum.PUBLIC,
  }

  // TODO: if !isOwner AND 1+ user friendships in ownerUser friendships -> fetch the firsts two folllowers profile img and friendships count - 2
  const hasFriendshipBetweenBoth = !isOwner && ((await checkIfHasFriendshipBetweenBoth(currentUser.id, ownerUser.id)).isFriend)

  // TODO: Create Follow table and indexes to performance query
  // WITH FETCH
  const commonFriendship = (await getCommonFriendship(currentUser.id, ownerUser.id));

  // TODO: fetch user profile settings to check privacy conditions and some profile configs

  // TODO: if profileSettings.activityVisibility.PUBLIC OR (!isOwner AND activityVisibility.FOLLOWERS AND ownerUser.friendships.includes(user.id))


  return (
    <div className='mt-2'>
      <main className=' w-full max-w-[1400px] m-auto'>

        {/* User BG Image */}
        <div className='bg-blue-400 rounded-lg w-full h-48 my-8'></div>

        <div className=' flex gap-2'>
          {/* User IMG */}
          {/* <div className='size-44 bg-blue-400 rounded-full'></div> */}
          <Avatar image={ownerUser.profileImageUrl || ownerUser.name} avatarSxProps={{ width: 176, height: 176, fontSize: 12 }} />

          <div className='flex flex-col grow justify-center'>
            <div className='w-full'>
              <p className='text-2xl'>{ownerUser.name} <span className='text-1xl text-gray-600'> - {ownerUser.username}</span></p>
            </div>
            {/* TODO: include bio collumn */}
            {/* {ownerUser.bio && (<div className='w-full'>{ownerUser.bio}</div>)} */}

            <div className='w-full flex justify-between items-center'>
              <p>
                {/* {ownerUser.friendships.length} friendships */}
                0 friendships
              </p>
              {isOwner ?
                (
                  <button className='py-2 px-4 rounded-2xl bg-gray-500 text-white' >
                    Edit profile
                  </button>
                )
                : (
                  <div>
                    {/* TODO: conditionate 'Send Message' btn display by owner privacy settings */}
                    <button className='py-2 px-4 rounded-2xl bg-gray-500 text-white'>
                      <SendIcon /> Send Message
                    </button>
                    {!hasFriendshipBetweenBoth && (
                      <button className='py-2 px-4 rounded-2xl bg-blue-400 text-white ml-2'>
                        Send friendship request
                      </button>
                    )}

                  </div>
                )}
            </div>

            {!isOwner && (
              commonFriendship.count > 2 ?
                (
                  <div className='flex items-center gap-6'>

                    <div className='relative'>
                      {commonFriendship.firstsTwoFriends.map((f, i) => (
                        <div key={f.id} className={i === 1 ? 'absolute top-0 -right-5' : ""}>
                          <Avatar image={f.profileImageUrl || f.name} avatarSxProps={{ width: 30, height: 30, fontSize: 12 }} />
                        </div>
                      ))}
                    </div>

                    <button className='hover:underline hover:underline-offset-2'>
                      and {commonFriendship.count - 2} other common friendships
                    </button>

                  </div>
                )
                : (<p>{commonFriendship.count} common friendships</p>)
            )}

            <div className='w-full'></div>
          </div>
        </div>

        {/* diviser */}
        <div className='bg-gray-600 w-[85%] m-auto h-[2px] my-9' />

        {/* <UserActivities userId={ownerUser.id} /> */}

      </main>
    </div>
  );
}