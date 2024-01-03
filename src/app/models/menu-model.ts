export interface MenuItem {
    title?: string;
    icon?: string;
    link?: string;
    color?: string;
    menuId?: string;
    hideFor?: string;
    checked?: boolean;
    expanded?: boolean;
    name?: string;
    url?: string;
    id?: string;
    subMenu?: MenuItem[];
}

export type Menu = MenuItem[];
