import { ISODateType } from "@/types";
import { UserInterface } from "./User";

export interface UserGenericProperty {
    id: string;
    owner: UserInterface.SimpleType
    createdAt: ISODateType
}