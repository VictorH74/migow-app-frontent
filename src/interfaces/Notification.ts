import { UserEventEnum } from "@/enums";
import { UserGenericProperty } from "./global";

export interface NotificationInterface extends UserGenericProperty {
    userEvent: UserEventEnum
    relatedTargetId: UserGenericProperty,
}