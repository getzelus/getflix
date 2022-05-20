import './gauge.scss'
import React from 'react';

interface Props{
    likes: number
    dislikes: number
}

export default function Gauge({likes, dislikes}: Props) {

    const total: number = likes + dislikes;
    const likesRatio: number = (likes/total)*100;
    const dislikesRatio: number = (dislikes/total)*100;
    
    const gaugeBar = {
        height: '8px',
        display: 'inline-block'
    };

    const gaugeLikes = {
        ...gaugeBar,
        width: likesRatio + '%',
        backgroundColor: 'black'
    };

    const gaugeDislikes = {
        ...gaugeBar,
        width: dislikesRatio + '%',
        backgroundColor: 'red'
    };
 
    return (
        <div className="gauge">
            <div style={gaugeLikes}></div>
            <div style={gaugeDislikes}></div>
        </div>
    );
}

