import './movie-list.scss';

import React, {useEffect, useState} from 'react';

import { useAppSelector, useAppDispatch } from '../../storage/hooks';
import {readMovies, deleteMovie, selectMovies, selectStatus } from '../../storage/slices/moviesSlice';

import IMovie from '../../interfaces/IMovie';
import Movie from '../Movie/Movie';
import Pagination from '../Pagination/Pagination';
import CategoryFilter from '../CategoryFilter/CategoryFilter';

export default function MovieList() {

   // console.log('movie list');

    const dispatch = useAppDispatch();
    
    const movies: IMovie[] = useAppSelector(selectMovies);
     const status: string = useAppSelector(selectStatus);

    const [filteredMovies, setFilteredMovies] = useState<IMovie[]>([]);
    
   const [itemsByPage, setItemsByPage] = useState<number>(4);
   const [currentPage, setCurrentPage] = useState<number>(1);

   // const [actualMovies, setActualMovies] = useState<IMovie[]>([])

    useEffect( () => {
        
        // Check if movies are already fetched if we change page 
        if (movies.length > 0) {
            setFilteredMovies(movies);
            // do everything instead, also with page
        }else{
            dispatch(readMovies())
        }
    }, [dispatch, movies])

    const changeFilteredMovies = (cats: string[]) => {
        let newMovies: IMovie[] = [];
      
        if (!cats.length) {
            newMovies = movies;
        }else{
            // if liked in category
            cats.forEach( (c:any) => {
                let newArray: IMovie[] = movies.filter( m => m.category === c);
                newMovies = newMovies.concat(newArray);
            });
        }
        setFilteredMovies(newMovies);
    }

    const changeItemsByPage = (items: number) => {
        if (items < 0) return;
        setItemsByPage(items);
        // change pagedMovies
    }

    const changePage = (page: number) => {
        setCurrentPage(page);
        //change pagedMovies ?
    }

    const onDeleteMovie = (id: string) => {
        dispatch(deleteMovie(id));
    }

    const displayMovies = () => {
        let start: number = (currentPage - 1)*itemsByPage;
         let newMovies: IMovie[] = filteredMovies.slice(start, start+itemsByPage);
        return newMovies.map(m => 
            <Movie key={m.id} movie={m} onDeleteMovie={onDeleteMovie} />
        ) ;
    }

    return (
        <div className='movie-list'>
             <div> {status} </div>

             <CategoryFilter movies={movies} changeFilteredMovies={changeFilteredMovies} />
             
            <Pagination 
                length={filteredMovies.length} itemsByPage={itemsByPage} currentPage={currentPage} changeItemsByPage={changeItemsByPage} changePage={changePage}
            />

             <div className='movies'>
                {displayMovies()}
             </div>

            
        </div>
    );

}

