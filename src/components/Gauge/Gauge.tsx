import './gauge.scss'

import React from 'react';

import { useAppSelector, useAppDispatch } from '../../storage/hooks';
import {switchLike, switchDislike, selectMoviesLiked, selectMoviesDisliked} from '../../storage/slices/moviesSlice';


import IMovie from '../../interfaces/IMovie';

interface Props{
    movie: IMovie
}

export default function Gauge({movie}: Props) {

    const dispatch = useAppDispatch();

    const moviesLiked: IMovie[] = useAppSelector(selectMoviesLiked);
    const moviesDisliked: IMovie[] = useAppSelector(selectMoviesDisliked);

    const exist = (arrayMovies: IMovie[], movieArg: IMovie) => {
        return arrayMovies.some(m => m.id === movieArg.id );
    }

    // jauge : total = likes + dislikes
    // couleur bleue = likes/total etc


    return (
        <div className="gauge">
            
           <p onClick={() => dispatch(switchLike(movie))}>
               <span className={ exist(moviesLiked, movie) ? 'already' : ''  }>+</span> 
               <span>{movie.likes}</span>
            </p>
            
            <p onClick={() => dispatch(switchDislike(movie))}>
              <span className={ exist(moviesDisliked, movie) ? 'already' : ''  }>-</span> 
               <span>{movie.dislikes}</span>
             </p>

             <p>Gauge</p>
        </div>
    );

}

