import './gauge.scss'

import React from 'react';

interface Props{
    likes: number
    dislikes: number
}

export default function Gauge({likes, dislikes}: Props) {

 
    return (
        <div className="gauge">
            gauge
        </div>
    );

}

