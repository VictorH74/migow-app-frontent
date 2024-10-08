'use client';
import Avatar from '@/components/Avatar';
import TextArea from '@/components/TextArea';
import { UserInterface } from '@/interfaces/User';
import { getCurrentUser } from '@/lib/actions';
import MuiAvatar from '@mui/material/Avatar';
import { SxProps } from '@mui/material';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CreateCommentInputProps {
    containerClassname?: string;
    avatarSxProps?: SxProps;
    onSubmit(content: string): Promise<void>;
}

const AvatarComponent = React.memo(function AvatarComponent(
    avatarSxProps?: SxProps
) {
    const currentUser = React.use<UserInterface.SimpleType | undefined>(
        getCurrentUser()
    );

    if (!currentUser) return <MuiAvatar className="mr-2" sx={avatarSxProps} />;

    return (
        <Avatar
            image={currentUser.profileImageUrl || currentUser.name}
            avatarSxProps={{
                width: 35,
                height: 35,
                fontSize: 15,
                ...avatarSxProps,
            }}
        />
    );
});

export default React.memo(
    React.forwardRef<HTMLTextAreaElement, CreateCommentInputProps>(
        function CreateCommentInput(props: CreateCommentInputProps, ref) {
            const [commentInputValue, setCommentInputValue] =
                React.useState('');

            const handleSubmit = async () => {
                const formattedContent = commentInputValue
                    .split('\n')
                    .join('<br>');
                await props.onSubmit(formattedContent);
                setCommentInputValue('');
            };

            return (
                <div className={twMerge('flex', props.containerClassname)}>
                    <React.Suspense
                        fallback={
                            <MuiAvatar
                                className="mr-2"
                                sx={props.avatarSxProps}
                            />
                        }
                    >
                        <AvatarComponent {...props.avatarSxProps} />
                    </React.Suspense>

                    <div className="w-full">
                        <TextArea
                            ref={ref}
                            className="w-full rounded-3xl border border-gray-400 hover:"
                            onChange={(value) => setCommentInputValue(value)}
                            value={commentInputValue}
                            placeholder="Comment something..."
                        />

                        <div className="flex items-center gap-1 text-sm">
                            {!!commentInputValue && (
                                <button
                                    className="bg-gradient text-white font-semibold px-4 py-1 rounded-lg"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            );
        }
    )
);
