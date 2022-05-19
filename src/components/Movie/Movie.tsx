import React from 'react';

import Gauge from '../Gauge/Gauge';

import IMovie from '../../interfaces/IMovie';

interface Props{
    movie: IMovie
    onDeleteMovie: (id: string) => void
}

export default function Movie({movie, onDeleteMovie}: Props) {

    return (
        <div className="movie">
            
            <h2>{movie.title}</h2>
            <p onClick={() => onDeleteMovie(movie.id)}>X</p>
            <p><i>{movie.category}</i></p>
            <Gauge movie={movie} />
     
        </div>
    );

}

