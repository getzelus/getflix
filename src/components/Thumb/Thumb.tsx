import './thumb.scss';
import { IconType } from "react-icons";

import React from 'react';

interface IProps{
    num: number
    action: string
    filled: boolean
    EmptyIcon: IconType
    FillIcon: IconType
    switchAction: (action: string) => void
}

export default function Pagination({num, action, filled, EmptyIcon, FillIcon, switchAction}: IProps) {


  
    return (
        <span className={action==='dislike' ? 'thumb thumb-right' : 'thumb'} onClick={() => switchAction(action)}>
          {filled ? <FillIcon /> : <EmptyIcon />}  
            {num}

        </span>
    );

}

