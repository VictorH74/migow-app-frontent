
// temp 

import { URL } from "url"
import { UserEventEnum } from "./enums"
import { MessageInterface } from "./interfaces/Message"
import { UserInterface } from "./interfaces/User"
import { ChatInterface } from "./interfaces/Chat"
import { ActivityInterface } from "./interfaces/Activity"
import { NotificationInterface } from "./interfaces/Notification"
import { PostInterface } from "./interfaces/Post"


export const usersMock: UserInterface[] = [
  {
    id: "aaa",
    email: "email@email.com",
    name: "Kent Dodds",
    username: "kent_D88",
    friendships: [
      {
        id: "bbb",
        email: "email@email.com",
        name: "Jed Watson",
        username: "j_N77",
        friendships: [],
        createdAt: "2024-03-19T22:50:00.098Z"
      },
      {
        id: "ccc",
        email: "email@email.com",
        name: "Tim Neutkens",
        username: "tim_N76",
        friendships: [],
        createdAt: "2020-07-14T22:50:00.098Z"
      },
      {
        id: "ddd",
        email: "email@email.com",
        name: "Nikolas Teslas",
        username: "nickT778",
        friendships: [],
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
    friendships: [],
    createdAt: "2024-03-19T22:50:00.098Z"
  },
  {
    id: "ccc",
    email: "email@email.com",
    name: "Tim Neutkens",
    username: "tim_N76",
    friendships: [],
    createdAt: "2020-07-14T22:50:00.098Z"
  },
  {
    id: "ddd",
    email: "email@email.com",
    name: "Nikolas Teslas",
    username: "nickT778",
    friendships: [],
    createdAt: "2020-07-14T22:50:00.098Z"
  },
]


export const chatsMock: ChatInterface[] = [
  {
    createdAt: "",
    id: "vvv-aaa",
    users: ["vvv", "aaa"],
  },
  {
    createdAt: "",
    id: "vvv-bbb",
    users: ["vvv", "bbb"],
    recentMessage: {
      chatId: "vvv-bbb",
      sender: "bbb",
      sentAt: "",
      replyMsg: null,
      content: "Hello!"
    }
  },
  {
    createdAt: "",
    id: "vvv-ccc",
    users: ["vvv", "ccc"],
  },
  {
    createdAt: "",
    id: "vvv-ddd",
    users: ["vvv", "ddd"],
  },
]

export const messagesMock: MessageInterface[] = [
  {
    chatId: "vvv-bbb",
    sender: "bbb",
    replyMsg: null,
    sentAt: "",
    content: "Hello!",
    id: 0
  }
]

export const peoplesModalUserMock: UserInterface.RetrievedType[] = [
  {
    profileImageUrl: "https://th.bing.com/th/id/OIP.h04o3WE6Gle5wjqYLzhATwHaHa?pid=ImgDet&w=198&h=198&c=7",
    id: "aaa",
    name: "Kent Dodds",
    username: "kent_D88",
    isFriend: true
  },
  {
    profileImageUrl: "https://th.bing.com/th/id/OIP.kLuVl7_2soHqjgecM56X2AHaLL?w=202&h=305&c=7&r=0&o=5&pid=1.7",
    id: "bbb",
    name: "Jed Watson",
    username: "j_N77",
    isFriend: false
  },
  {
    id: "ccc",
    name: "Tim Neutkens",
    username: "tim_N76",
    isFriend: false
  },
  {
    id: "ddd",
    profileImageUrl: "https://fastly.picsum.photos/id/454/200/200.jpg?hmac=N13wDge6Ku6Eg_LxRRsrfzC1A4ZkpCScOEp-hH-PwHg",
    name: "Nikolas Teslas",
    username: "nickT778",
    isFriend: true
  },
  {
    id: "eee",
    name: "Nikolas Teslas",
    username: "nickT778",
    isFriend: true
  },
  {
    profileImageUrl: "https://th.bing.com/th/id/R.da2e546841da40cdcf60061743233500?rik=IeO7Sr%2fkUW54wQ&riu=http%3a%2f%2fwww.venmond.com%2fdemo%2fvendroid%2fimg%2favatar%2fbig.jpg&ehk=JihI5nQ0BOd0W%2bZVhtIWmqwac0NMyRMOV7%2bzryywg%2fg%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1",
    id: "fff",
    name: "Nikolas Teslas",
    username: "nickT778",
    isFriend: false
  },
  {
    id: "ggg",
    name: "Nikolas Teslas",
    username: "nickT778",
    isFriend: false
  },
  {
    id: "hhh",
    name: "Nikolas Teslas",
    username: "nickT778",
    isFriend: false
  },
]

export const onlineUsersMock: UserInterface.OnlineUserType[] = [
  {
    profileImageUrl: "https://th.bing.com/th/id/OIP.h04o3WE6Gle5wjqYLzhATwHaHa?pid=ImgDet&w=198&h=198&c=7",
    id: "aaa",
    name: "Kent Dodds",
    username: "kent_D88",
  },
  {
    profileImageUrl: "https://th.bing.com/th/id/OIP.kLuVl7_2soHqjgecM56X2AHaLL?w=202&h=305&c=7&r=0&o=5&pid=1.7",
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
    profileImageUrl: "https://fastly.picsum.photos/id/454/200/200.jpg?hmac=N13wDge6Ku6Eg_LxRRsrfzC1A4ZkpCScOEp-hH-PwHg",
    name: "Nikolas Teslas",
    username: "nickT778",
  },
  {
    id: "eee",
    name: "Nikolas Teslas",
    username: "nickT778",
  },
  {
    profileImageUrl: "https://th.bing.com/th/id/R.da2e546841da40cdcf60061743233500?rik=IeO7Sr%2fkUW54wQ&riu=http%3a%2f%2fwww.venmond.com%2fdemo%2fvendroid%2fimg%2favatar%2fbig.jpg&ehk=JihI5nQ0BOd0W%2bZVhtIWmqwac0NMyRMOV7%2bzryywg%2fg%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1",
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

// export const activitiesMock: ActivityInterface[] = [
//   {
//     id: "bbb",
//     post: postsMock[2],
//     user: usersMock[1],
//     userEvent: UserEventEnum.NEW_POST,
//     createdAt: '2024-05-14T22:50:00.098Z',
//   },
//   {
//     id: "aaa",
//     post: postsMock[0],
//     user: usersMock[1],
//     userEvent: UserEventEnum.SHARE_POST,
//     createdAt: '2024-05-15T23:50:10.436Z',
//   },
//   {
//     id: "ccc",
//     post: postsMock[0],
//     user: usersMock[1],
//     userEvent: UserEventEnum.COMMENT_POST,
//     comment: commentsMock[0],
//     createdAt: "2024-05-14T22:55:00.098Z",
//   },
//   {
//     id: "ddd",
//     post: postsMock[0],
//     user: usersMock[1],
//     userEvent: UserEventEnum.COMMENT_REPLAY,
//     commentReply: commentRepliesMock[0],
//     createdAt: "2024-05-14T22:55:00.098Z",
//   },
// ]

export const postsMock: PostInterface[] = [
  {
    id: "mjmjmjmjm",
    owner: usersMock[1],
    createdAt: '2024-05-15T23:50:10.436Z',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime doloribus dicta.',
    reactCount: 0,
    commentCount: 12,
    shareCount: 0,
    reactionTypeCounts: {
      cuteReaction: 0,
      funnyReaction: 0,
      likeReaction: 0,
      loveReaction: 0,
      sadReaction: 0,
      scaryReaction: 0,
    },
    sharedPost: {
      id: "sadf3g",
      owner: usersMock[0],
      createdAt: '2024-05-15T23:44:10.436Z',
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime doloribus dicta, impedit inventore voluptates et dolores mollitia atque molestiae fugit qui eaque repellendus. Quos, distinctio adipisci soluta nemo amet a!',
      reactCount: 0,
      commentCount: 3,
      shareCount: 0,
      reactionTypeCounts: {
        cuteReaction: 0,
        funnyReaction: 0,
        likeReaction: 0,
        loveReaction: 0,
        sadReaction: 0,
        scaryReaction: 0,
      },
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
    reactCount: 0,
    commentCount: 3,
    reactionTypeCounts: {
      cuteReaction: 0,
      funnyReaction: 0,
      likeReaction: 0,
      loveReaction: 0,
      sadReaction: 0,
      scaryReaction: 0,
    },
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
    reactCount: 0,
    commentCount: 0,
    reactionTypeCounts: {
      cuteReaction: 0,
      funnyReaction: 0,
      likeReaction: 0,
      loveReaction: 0,
      sadReaction: 0,
      scaryReaction: 0,
    },
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
    reactCount: 0,
    commentCount: 0,
    reactionTypeCounts: {
      cuteReaction: 0,
      funnyReaction: 0,
      likeReaction: 0,
      loveReaction: 0,
      sadReaction: 0,
      scaryReaction: 0,
    },
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