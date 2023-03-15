import { BaseKey } from '@pankod/refine-core';

export interface AgentCardProp {
    id?: BaseKey | undefined,
    name: string,
    email: string,
    number:number,
    location:string,
    avatar: string,
    noOfProperties: number
}

export interface InfoBarProps {
    icon: ReactNode,
    name: string,
    // number:number

}
