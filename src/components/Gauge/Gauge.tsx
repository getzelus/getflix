import React from 'react';

import { useAppSelector, useAppDispatch } from '../../storage/hooks';
import {switchLike, switchDislike, selectMoviesLiked, selectMoviesDisliked} from '../../storage/slices/moviesSlice';


import IMovie from '../../interfaces/IMovie';

interface Props{
    movie: IMovie
}

export default function Gauge({movie}: Props) {

   // const dispatch = useAppDispatch();
  // creer composant jauge 


    return (
        <div className="gauge">
            
    
        </div>
    );

}

