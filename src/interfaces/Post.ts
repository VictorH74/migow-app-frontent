import { UserGenericProperty } from './global';
import { MediaInterface } from './Media';
import { ReactionInterface } from './Reaction';

export interface PostInterface extends UserGenericProperty {
    text?: string;
    sharedPost: PostInterface | null;
    mediaList: MediaInterface[] | null;
    reactCount: number;
    commentCount: number;
    shareCount: number;
    reactionCountByType: ReactionInterface.ReactionCountByType;
    currentUserReaction?: ReactionInterface.SimpleType;
}

export namespace PostInterface {
    export type CreateType = {
        text: string;
        sharedPost?: PostInterface['id'] | null;
        mediaList?: MediaInterface[] | null;
    };
}
