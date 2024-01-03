

export class ParentMenu {
    name: string;
    order: number;
    id: number;
    enable: boolean;
    selected: string; //s-u-p

    menus:Menu[];

}


export class Menu {
    id: number;
    name: string;
    url: string;
    enable: boolean;
    selected: boolean;

}