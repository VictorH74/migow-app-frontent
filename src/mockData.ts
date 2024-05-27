
// temp 

import { URL } from "url"
import { ActivityInterface, CommentInterface, ReplayCommentInterface, NotificationInterface, PostInterface, UserInterface, OnlineUserInterface } from "./interfaces"
import { UserEventEnum } from "./enums"


export const usersMock: UserInterface[] = [
  {
    id: "aaa",
    email: "email@email.com",
    name: "Kent Dodds",
    username: "kent_D88",
    followers: [
      {
        id: "bbb",
        email: "email@email.com",
        name: "Jed Watson",
        username: "j_N77",
        followers: [],
        createdAt: "2024-03-19T22:50:00.098Z"
      },
      {
        id: "ccc",
        email: "email@email.com",
        name: "Tim Neutkens",
        username: "tim_N76",
        followers: [],
        createdAt: "2020-07-14T22:50:00.098Z"
      },
      {
        id: "ddd",
        email: "email@email.com",
        name: "Nikolas Teslas",
        username: "nickT778",
        followers: [],
        createdAt: "2020-07-14T22:50:00.098Z"
      },
    ],
    createdAt: "2023-02-11T22:50:00.098Z"
  },
  {
    id: "bbb",
    email: "email@email.com",
    name: "Jed Watson",
    username: "j_N77",
    followers: [],
    createdAt: "2024-03-19T22:50:00.098Z"
  },
  {
    id: "ccc",
    email: "email@email.com",
    name: "Tim Neutkens",
    username: "tim_N76",
    followers: [],
    createdAt: "2020-07-14T22:50:00.098Z"
  },
  {
    id: "ddd",
    email: "email@email.com",
    name: "Nikolas Teslas",
    username: "nickT778",
    followers: [],
    createdAt: "2020-07-14T22:50:00.098Z"
  },
]

export const onlineUsersMock: OnlineUserInterface[] = [
  {
    id: "aaa",
    name: "Kent Dodds",
    username: "kent_D88",
  },
  {
    id: "bbb",
    name: "Jed Watson",
    username: "j_N77",
  },
  {
    id: "ccc",
    name: "Tim Neutkens",
    username: "tim_N76",
  },
  {
    id: "ddd",
    name: "Nikolas Teslas",
    username: "nickT778",
  },
  {
    id: "eee",
    name: "Nikolas Teslas",
    username: "nickT778",
  },
  {
    id: "fff",
    name: "Nikolas Teslas",
    username: "nickT778",
  },
  {
    id: "ggg",
    name: "Nikolas Teslas",
    username: "nickT778",
  },
  {
    id: "hhh",
    name: "Nikolas Teslas",
    username: "nickT778",
  },
]


export const postsMock: PostInterface[] = [
  {
    id: "mjmjmjmjm",
    owner: usersMock[1],
    createdAt: '2024-05-15T23:50:10.436Z',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime doloribus dicta.',
    reactionCount: 0,
    commentCount: 12,
    shareCount: 0,
    sharedPost: {
      id: "sadf3g",
      owner: usersMock[0],
      createdAt: '2024-05-15T23:44:10.436Z',
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime doloribus dicta, impedit inventore voluptates et dolores mollitia atque molestiae fugit qui eaque repellendus. Quos, distinctio adipisci soluta nemo amet a!',
      reactionCount: 0,
      commentCount: 3,
      shareCount: 0,
      mediaURLs: [
        {
          id: 7,
          name: "aaa",
          src: "https://picsum.photos/1080/1920?random=2",
          type: "image/jpeg"
        },
      ],
    },
  },
  {
    id: "sadf3g",
    owner: usersMock[0],
    createdAt: '2024-05-15T23:44:10.436Z',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime doloribus dicta, impedit inventore voluptates et dolores mollitia atque molestiae fugit qui eaque repellendus. Quos, distinctio adipisci soluta nemo amet a!',
    reactionCount: 0,
    commentCount: 3,
    shareCount: 0,
    mediaURLs: [
      {
        id: 7,
        name: "aaa",
        src: "https://picsum.photos/1080/1920?random=2",
        type: "image/jpeg"
      },
    ],
  },
  {
    id: "dkgnmd4",
    owner: usersMock[1],
    createdAt: '2024-05-14T22:50:00.098Z',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime doloribus dicta, impedit inventore voluptates et dolores mollitia atque molestiae fugit qui eaque repellendus. Quos, distinctio adipisci soluta nemo amet a!',
    reactionCount: 0,
    commentCount: 0,
    shareCount: 0,
    mediaURLs: [
      {
        id: 0,
        name: "aaa",
        src: "https://picsum.photos/1920/1920?random=10",
        type: "image/jpeg"
      },
      {
        id: 1,
        name: "aaa",
        src: "https://picsum.photos/1920/1080?random=3",
        type: "image/jpeg"
      },
      {
        id: 2,
        name: "aaa",
        src: "https://picsum.photos/1920/1080?random=4",
        type: "image/jpeg"
      },
      {
        id: 3,
        name: "aaa",
        src: "https://picsum.photos/1920/1080?random=5",
        type: "image/jpeg"
      },
    ],
  },
  {
    id: "sf9sj4",
    owner: usersMock[2],
    reactionCount: 0,
    commentCount: 0,
    shareCount: 0,
    createdAt: '2023-05-15T22:51:00.098Z',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime doloribus dicta, impedit inventore voluptates et dolores mollitia atque molestiae fugit qui eaque repellendus. Quos, distinctio adipisci soluta nemo amet a!',
    mediaURLs: [
      {
        id: 4,
        name: "aaa",
        src: "https://picsum.photos/1920/1080?random=6",
        type: "image/jpeg"
      },
      {
        id: 5,
        name: "aaa",
        src: "https://picsum.photos/1920/1080?random=7",
        type: "image/jpeg"
      },
    ],
  },
]

export const commentsMock: CommentInterface[] = [
  {
    id: "aaa",
    content: "nice bro!!",
    post: postsMock[0],
    createdAt: "2024-05-14T22:55:00.098Z",
    user: usersMock[1]
  },
  {
    id: "xxx",
    content: "yes",
    post: postsMock[0],
    createdAt: "2024-05-14T22:55:00.098Z",
    user: usersMock[3]
  },
  {
    id: "bbb",
    content: "very good",
    post: postsMock[0],
    createdAt: "2024-05-14T23:01:00.098Z",
    user: usersMock[3]
  },
  {
    id: "ccc",
    content: "nice!!!",
    post: postsMock[0],
    createdAt: "2024-05-14T24:55:00.098Z",
    user: usersMock[2]
  },
  {
    id: "hhh",
    content: "nice bro!!",
    post: postsMock[0],
    createdAt: "2024-05-14T22:55:00.098Z",
    user: usersMock[1]
  },
  {
    id: "iii",
    content: "yes",
    post: postsMock[0],
    createdAt: "2024-05-14T22:55:00.098Z",
    user: usersMock[3]
  },
  {
    id: "jjj",
    content: "very good",
    post: postsMock[0],
    createdAt: "2024-05-14T23:01:00.098Z",
    user: usersMock[3]
  },
  {
    id: "kkk",
    content: "nice!!!",
    post: postsMock[0],
    createdAt: "2024-05-14T24:55:00.098Z",
    user: usersMock[2]
  },
  {
    id: "lll",
    content: "nice bro!!",
    post: postsMock[0],
    createdAt: "2024-05-14T22:55:00.098Z",
    user: usersMock[1]
  },
  {
    id: "mmm",
    content: "yes",
    post: postsMock[0],
    createdAt: "2024-05-14T22:55:00.098Z",
    user: usersMock[3]
  },
  {
    id: "nnn",
    content: "very good",
    post: postsMock[0],
    createdAt: "2024-05-14T23:01:00.098Z",
    user: usersMock[3]
  },
  {
    id: "ooo",
    content: "nice!!!",
    post: postsMock[0],
    createdAt: "2024-05-14T24:55:00.098Z",
    user: usersMock[2]
  },
  {
    id: "ddd",
    content: "awnsome!",
    post: postsMock[1],
    createdAt: "2024-05-14T24:55:00.098Z",
    user: usersMock[0],
  },
  {
    id: "eee",
    content: "fascinant",
    post: postsMock[1],
    createdAt: "2024-05-14T24:55:00.098Z",
    user: usersMock[3]
  },
  {
    id: "fff",
    content: "GG",
    post: postsMock[1],
    createdAt: "2024-05-14T24:55:00.098Z",
    user: usersMock[2]
  },
]

export const commentRepliesMock: ReplayCommentInterface[] = [
  {
    id: "aaa",
    user: usersMock[1],
    comment: commentsMock[0],
    createdAt: "2024-05-14T22:55:00.098Z",
    content: "Comentário de resposta"
  },
]

export const activitiesMock: ActivityInterface[] = [
  {
    id: "bbb",
    post: postsMock[2],
    user: usersMock[1],
    userEvent: UserEventEnum.NEW_POST,
    createdAt: '2024-05-14T22:50:00.098Z',
  },
  {
    id: "aaa",
    post: postsMock[0],
    user: usersMock[1],
    userEvent: UserEventEnum.SHARE_POST,
    createdAt: '2024-05-15T23:50:10.436Z',
  },
  {
    id: "ccc",
    post: postsMock[0],
    user: usersMock[1],
    userEvent: UserEventEnum.COMMENT_POST,
    comment: commentsMock[0],
    createdAt: "2024-05-14T22:55:00.098Z",
  },
  {
    id: "ddd",
    post: postsMock[0],
    user: usersMock[1],
    userEvent: UserEventEnum.COMMENT_REPLAY,
    commentReply: commentRepliesMock[0],
    createdAt: "2024-05-14T22:55:00.098Z",
  },
]

export const notificationsMock: NotificationInterface[] = [
  {
    id: "aa",
    createdAt: '2024-05-15T23:44:10.436Z',
    userEvent: UserEventEnum.NEW_POST,
    owner: usersMock[0],
    relatedTargetId: postsMock[0]
  },
  {
    id: "bb",
    createdAt: '2024-05-14T22:50:00.098Z',
    userEvent: UserEventEnum.NEW_POST,
    owner: usersMock[1],
    relatedTargetId: postsMock[1]
  },
  {
    id: "cc",
    createdAt: '2023-05-15T22:51:00.098Z',
    userEvent: UserEventEnum.NEW_POST,
    owner: usersMock[2],
    relatedTargetId: postsMock[2]
  },

  {
    id: "dd",
    createdAt: '2024-05-14T22:55:00.098Z',
    userEvent: UserEventEnum.COMMENT_POST,
    owner: usersMock[1],
    relatedTargetId: postsMock[0]
  },
  {
    id: "ee",
    createdAt: '2024-05-14T23:01:00.098Z',
    userEvent: UserEventEnum.COMMENT_POST,
    owner: usersMock[3],
    relatedTargetId: postsMock[0]
  },
  {
    id: "ff",
    createdAt: '2024-05-14T22:55:00.098Z',
    userEvent: UserEventEnum.COMMENT_POST,
    owner: usersMock[2],
    relatedTargetId: postsMock[0]
  },

  {
    id: "gg",
    createdAt: '2024-05-14T22:55:00.098Z',
    userEvent: UserEventEnum.COMMENT_POST,
    owner: usersMock[0],
    relatedTargetId: postsMock[1]
  },
  {
    id: "hh",
    createdAt: '2024-05-14T23:01:00.098Z',
    userEvent: UserEventEnum.COMMENT_POST,
    owner: usersMock[3],
    relatedTargetId: postsMock[1]
  },
  {
    id: "ii",
    createdAt: '2024-05-14T00:55:00.098Z',
    userEvent: UserEventEnum.COMMENT_POST,
    owner: usersMock[2],
    relatedTargetId: postsMock[1]
  },
]