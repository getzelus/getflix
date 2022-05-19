import './movie.scss';

import React from 'react';

import { useAppSelector, useAppDispatch } from '../../storage/hooks';
import {switchLike, switchDislike, selectMoviesLiked, selectMoviesDisliked} from '../../storage/slices/moviesSlice';


import Gauge from '../Gauge/Gauge';
import Thumb from '../Thumb/Thumb';

import IMovie from '../../interfaces/IMovie';


import { BsHandThumbsUp, BsHandThumbsUpFill, BsHandThumbsDown, BsHandThumbsDownFill, BsXCircle } from "react-icons/bs";

interface Props{
    movie: IMovie
    onDeleteMovie: (id: string) => void
}

export default function Movie({movie, onDeleteMovie}: Props) {

    const dispatch = useAppDispatch();

    const moviesLiked = useAppSelector(selectMoviesLiked);
    const moviesDisliked = useAppSelector(selectMoviesDisliked);

    const liked = moviesLiked.some( m => m.id === movie.id);
    const disliked = moviesDisliked.some(m => m.id === movie.id);


    const switchAction = (action: string) => {
        if (action === 'like'){
            dispatch(switchLike(movie));
        }else{
            dispatch(switchDislike(movie));
        }
    }

    return (
        <div className="movie">
            
            <div className='delete-movie' onClick={() => onDeleteMovie(movie.id)}> <BsXCircle /></div>
            <div className='movie-title'>{movie.title}</div>
           
            <p><i>{movie.category}</i></p>

            <div>
                <Thumb num={movie.likes} action='like' EmptyIcon={BsHandThumbsUp} FillIcon={BsHandThumbsUpFill} switchAction={switchAction} filled={liked}/>
                <Thumb num={movie.dislikes} action='dislike' EmptyIcon={BsHandThumbsDown} FillIcon={BsHandThumbsDownFill} switchAction={switchAction} filled={disliked}/>
            </div>

            <Gauge likes={movie.likes} dislikes={movie.dislikes} />
     
        </div>
    );

}

