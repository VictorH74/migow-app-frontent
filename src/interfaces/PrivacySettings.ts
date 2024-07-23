import { VisibilityEnum } from "@/enums"

export interface PrivacySettingsInterface {
    id: number;
    imageProfileVisibility: VisibilityEnum
    nameVisibility: VisibilityEnum
    bioVisibility: VisibilityEnum
    friendshipsVisibility: VisibilityEnum
    activityVisibility: VisibilityEnum
    onlineStatusVisibility: VisibilityEnum
    messageReadConfirmationVisibility: VisibilityEnum
    sendMessageFuncVisibility: VisibilityEnum
}