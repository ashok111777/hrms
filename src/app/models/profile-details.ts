import { Menu } from "./menu-model";

export interface ProfileDetails {
    id: string;
    name:string;
    type:ProfileType;
    description:string;
    menu:Menu
}

export interface ProfileType{
    id: string;
    name: string;
    description: string;
}
export type ProfileTypeList= ProfileType[];