import React from 'react';
import { twMerge } from 'tailwind-merge';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@/components/Avatar';
import {
    closedChatBoxHeight,
    closedChatBoxWidth,
    openChatBoxHeight,
    openChatBoxWidth,
} from '@/components/ClientSideInLayout/components/ChatRelatedComponent/useChatRelatedComponent';
import { ChatMetadataInterface } from '@/interfaces/Chat';
import Loading from '@/components/Loading';
import {
    collection,
    orderBy,
    query,
    onSnapshot,
    setDoc,
    doc,
    addDoc,
    Unsubscribe,
    getDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { MessageInterface } from '@/interfaces/Message';
import { getCurrentUser } from '@/lib/actions';
import { UserInterface } from '@/interfaces/User';
import TextArea from '@/components/TextArea';
import { useChatboxList } from '@/hooks/useChatboxList';
import { MessageList } from './components/MessageList';

interface ChatBoxProps {
    chatBox: ChatMetadataInterface.ChatBoxType;
}

const generateChatMetadataId = (emails: string[]) =>
    [...emails]
        .sort()
        .map((id) => id)
        .join('+');

const createUpdateChatMetadata = async (
    chatMetadataId: string,
    chatMetadataObj: Partial<ChatMetadataInterface>
) => {
    const newCMetadataDoc = doc(db, 'chat-metadata', chatMetadataId);
    await setDoc(newCMetadataDoc, chatMetadataObj, {
        merge: true,
    });
};

export default function ChatBox({ chatBox, ...props }: ChatBoxProps) {
    const [currentUserId, setCurrentUserId] =
        React.useState<UserInterface.SimpleType['id']>();
    const [msgInputValue, setMsgInputValue] = React.useState('');
    const [error, setError] = React.useState<string | undefined>();
    const [submittingMsg, setSubmittingMsg] = React.useState(false);

    const chatBoxContainerRef = React.useRef<HTMLLIElement>(null);

    const { removeChatBox, closeChatBox, openChatBox, updateChatboxByUserId } =
        useChatboxList();

    React.useEffect(() => {
        (async () => {
            const user = await getCurrentUser();
            if (!user) {
                alert('undefined current user');
                console.error('undefined current user');
                return;
            }
            if (!chatBox.fromChatMetadataList) {
                const generatedId = generateChatMetadataId([
                    chatBox.user.id,
                    user.id,
                ]);
                console.log('fetching chat metadata: ', generatedId, ' ⚠️');
                const cMetadataDocRef = doc(db, 'chat-metadata', generatedId);
                const cMetadataDoc = await getDoc(cMetadataDocRef);
                if (cMetadataDoc.exists()) {
                    console.log(
                        'existing chat metadata ✅',
                        cMetadataDoc.data()
                    );
                    updateChatboxByUserId(chatBox.user.id, {
                        chatMetadata:
                            cMetadataDoc.data() as ChatMetadataInterface,
                    });
                }
            }
            setCurrentUserId(user.id);
        })();
    }, []);

    React.useEffect(() => {
        if (!chatBoxContainerRef.current) return;
        const ref = chatBoxContainerRef.current!;

        ref.style.width =
            (chatBox.isOpen ? openChatBoxWidth : closedChatBoxWidth) + 'px';
        ref.style.height =
            (chatBox.isOpen ? openChatBoxHeight : closedChatBoxHeight) + 'px';
        ref.style.overflow = 'auto';
    }, [chatBox.isOpen]);

    const handleRemove = () => {
        const ref = chatBoxContainerRef.current!;
        ref.style.overflow = 'hidden';
        ref.style.width = '0px';
        ref.style.height = '0px';
        setTimeout(() => removeChatBox(chatBox.user.id), 100);
    };

    const submitMessage = async () => {
        console.log('submitMessage', 'currentUserId: ', currentUserId);
        if (!currentUserId) return;

        try {
            setSubmittingMsg(true);
            const formatedMsg = msgInputValue.replaceAll('\n', '<br>');

            // TODO test
            const newMsg: Omit<MessageInterface, 'id'> = {
                replyMsg: null,
                sender: currentUserId,
                sentAt: new Date().toISOString(),
                content: formatedMsg,
            };

            let chatMetadataId = chatBox.chatMetadata?.id;
            let chatMetadataObj: Partial<ChatMetadataInterface> = {
                recentMessage: newMsg,
            };

            const promises: Promise<void>[] = [];

            // if (replyMsg) setReplyMsg(null);

            console.log('submitMessage', 'creatting message...', newMsg);

            if (!chatMetadataId) {
                console.log('submitMessage', 'without chat metadata ⚠️');

                const users = [chatBox.user.id, currentUserId] as [
                    string,
                    string
                ];

                chatMetadataId = generateChatMetadataId(users);

                Object.assign(chatMetadataObj, {
                    id: chatMetadataId,
                    createdAt: new Date().toISOString(),
                    users,
                });

                // create chat metadata
                await createUpdateChatMetadata(chatMetadataId, chatMetadataObj);
                updateChatboxByUserId(chatBox.user.id, {
                    chatMetadata: chatMetadataObj as ChatMetadataInterface,
                });
                console.log('submitMessage', 'chat metadata created ✅');

                const newChatDoc = doc(db, 'chat', chatMetadataId);
                await setDoc(newChatDoc, {}); // create chat
                console.log('submitMessage', 'chat created ✅');
            } else {
                // update chat metadata
                promises.push(
                    createUpdateChatMetadata(chatMetadataId, chatMetadataObj)
                );
            }

            const msgCollection = collection(
                db,
                `/chat/${chatMetadataId}/message`
            );

            promises.push(
                (async () => {
                    await addDoc(msgCollection, newMsg);
                })()
            );
            console.log('submitMessage', 'message created ✅');

            await Promise.all(promises);

            setMsgInputValue('');
        } catch (err) {
        } finally {
            setSubmittingMsg(false);
        }
    };

    return (
        <li
            ref={chatBoxContainerRef}
            // className="rounded-md bg-white shadow-md pointer-events-auto duration-200 flex flex-col"
            className={twMerge(
                'rounded-md bg-white shrink-0 shadow-md pointer-events-auto duration-200',
                chatBox.isOpen ? '' : '',
                error ? 'grid place-items-center' : ''
            )}
        >
            {error ? (
                <>
                    <button
                        className="absolute top-3 right-3"
                        onClick={handleRemove}
                    >
                        {/* Close Icon */}
                    </button>
                    <p className="py-1 px-5 rounded-md border border-red-500 text-red-500 font-semibold text-center">
                        Error
                    </p>
                </>
            ) : (
                <div className="flex flex-col h-full">
                    <header
                        style={{
                            height: closedChatBoxHeight,
                        }}
                        className="bg-gradient text-white duration-200 py-2 px-3 flex w-full rounded-t-md items-center"
                        onClick={() =>
                            (chatBox.isOpen ? closeChatBox : openChatBox)(
                                chatBox.user.id
                            )
                        }
                    >
                        <Avatar
                            image={
                                chatBox.user.profileImageUrl ||
                                chatBox.user.name
                            }
                            avatarSxProps={{
                                height: 40,
                                width: 40,
                                fontSize: 15,
                            }}
                        />
                        <p className="truncate grow shrink min-w-5 text-sm font-semibold">
                            {chatBox.user.username}
                        </p>
                        <button
                            className=""
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemove();
                            }}
                        >
                            <CloseIcon />
                        </button>
                    </header>

                    <div className="flex flex-col h-full overflow-hidden px-4 py-2">
                        {/* Chatbox Body */}
                        <ul className="grow overflow-y-auto">
                            {currentUserId && chatBox.chatMetadata && (
                                <MessageList
                                    currentUserId={currentUserId}
                                    chatMetadataId={chatBox.chatMetadata.id}
                                />
                            )}
                        </ul>

                        {/* Chatbox Input */}
                        <div className="flex items-center">
                            <TextArea
                                className="w-full m-1 p-2"
                                placeholder="Type a message..."
                                onChange={(v) => setMsgInputValue(v)}
                                value={msgInputValue}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                className={twMerge(
                                    'py-2 px-5 bg-gray-600 text-white rounded-md',
                                    !!msgInputValue && 'bg-blue-400'
                                )}
                                onClick={submitMessage}
                                disabled={submittingMsg}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </li>
    );
}
