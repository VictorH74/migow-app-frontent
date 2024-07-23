import { AccountPrefSetsOnlineUsersLimit, AccountPrefSetsTheme } from "@/enums";

export interface AccountPreferenceSettingsInterface {
    id: number;
    theme: AccountPrefSetsTheme;
    onlineUsersLimit: AccountPrefSetsOnlineUsersLimit;
    soundEffects: boolean;
}