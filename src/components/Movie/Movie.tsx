import React from 'react';

import IMovie from '../../interfaces/IMovie';

interface Props{
    movie: IMovie
    onDeleteMovie: (id: string) => void
}

export default function Movie({movie, onDeleteMovie}: Props) {

   // const dispatch = useAppDispatch();
  // creer composant jauge 


    return (
        <div className="movie">
            
            <h2>{movie.title}</h2>
            <p onClick={() => onDeleteMovie(movie.id)}>X</p>
            <p><i>{movie.category}</i></p>
            <p>+ {movie.likes}</p>
            <p>- {movie.dislikes}</p>
        </div>
    );

}

