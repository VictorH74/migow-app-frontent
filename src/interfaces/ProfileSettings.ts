import { VisibilityEnum } from "@/enums";

export interface ProfileSettingsInterface {
    id: string;
    activityVisibility: VisibilityEnum
    friendshipsVisibility: VisibilityEnum
    nameVisibility: VisibilityEnum
    // activityVisibility: VisibilityEnum
}