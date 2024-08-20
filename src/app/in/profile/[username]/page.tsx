import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import { FriendshipStatusEnum, VisibilityEnum } from '@/enums';
import { cookies } from "next/headers"
import Avatar from '@/components/Avatar';
import { jwtDecode } from "jwt-decode";
import { serverFetch } from '@/lib/actions';
import { UserInterface } from '@/interfaces/User';
import EditProfileBtn from './components/EditProfileBtn';
import { PrivacySettingsInterface } from '@/interfaces/PrivacySettings';


const getOwnerUser = async (username: string) =>
  serverFetch<UserInterface.ProfileType>(`/u-s/users/username/${username}`)

const getCommonFriendship = async (currentUserId: string, profileOwnerUserId: string) =>
  serverFetch<{ count: number; firstsTwoFriends: [UserInterface.SimpleType, UserInterface.SimpleType] }>
    (`/u-s/friendships/common?userId=${currentUserId}&targetId=${profileOwnerUserId}`)

const checkIfHasFriendshipBetweenBoth = async (currentUserId: string, profileOwnerUserId: string) =>
  serverFetch<{ friendshipStatus: FriendshipStatusEnum; }>(`/u-s/friendships/${currentUserId}/friendship-with/${profileOwnerUserId}`)

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const ownerToken = cookies().get("accessToken");
  const decoded = jwtDecode(ownerToken!.value);
  const currentUser = { id: decoded.sub as string }

  // Unique data aproach
  // const profileData = await clientHTTP.getProfileData(visitorId=currentUser.id)
  // const {ownerUser, hasFriendshipBetweenBoth, commonFriendsCount, firstTwoFriends, profileSettings } = profileData

  const ownerUser = await getOwnerUser(params.username);

  if (!ownerUser) return <div>User not found</div>

  const isOwner = currentUser.id === ownerUser.id

  // TODO: if !isOwner -> check if user has been blocked from the isOwner
  // WITH CLIENTHTTP
  // const currentUserBlocked = (await clientHTTP.checkUserBlock(ownerUser.id, currentUser.id)).status
  // if (currentUserBlocked) <div>{ownerUser.username has blobked you!}</div>

  const ownerPrivacySettings = await serverFetch<PrivacySettingsInterface>(`/u-s/settings/${ownerUser.id}/privacy`)

  const hasFriendshipBetweenBoth = !isOwner && ((await checkIfHasFriendshipBetweenBoth(currentUser.id, ownerUser.id)).friendshipStatus == FriendshipStatusEnum.IS_FRIEND)

  const commonFriendship = (await getCommonFriendship(currentUser.id, ownerUser.id));

  return (
    <div className='mt-2'>
      <main className=' w-full max-w-[1200px] m-auto'>

        {/* User BG Image */}
        <div className='bg-blue-400 rounded-lg w-full h-48 my-8'></div>

        <div className=' flex gap-2'>
          {/* User IMG */}
          <Avatar image={ownerUser.profileImageUrl || ownerUser.name} avatarSxProps={{ width: 176, height: 176, fontSize: 50 }} />

          <div className='flex flex-col grow justify-center'>
            <div className='w-full'>
              <p className='text-2xl'>{ownerUser.name} <span className='text-1xl text-gray-600'> - {ownerUser.username}</span></p>
            </div>
            {/* TODO: include bio collumn */}
            {
              (
                ownerPrivacySettings.bioVisibility === VisibilityEnum.PUBLIC
                ||
                (ownerPrivacySettings.bioVisibility === VisibilityEnum.FRIENDS && hasFriendshipBetweenBoth)
              ) && (
                <div className='w-full'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quo id aspernatur voluptatum, eum adipisci debitis enim non illum quasi possimus iusto libero eos consequuntur commodi inventore sequi veritatis quaerat.
                </div>
              )
            }


            <div className='w-full flex justify-between items-center'>
              <p>
                {/* {ownerUser.friendships.length} friendships */}
                0 friendships
              </p>
              {isOwner ?
                (
                  <EditProfileBtn />
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