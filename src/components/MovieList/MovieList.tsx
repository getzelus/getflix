import './movie-list.scss';

import React, {useEffect, useState} from 'react';

import { useAppSelector, useAppDispatch } from '../../storage/hooks';
import {readMovies, deleteMovie, selectMovies, selectMoviesLiked, selectStatus } from '../../storage/slices/moviesSlice';

import IMovie from '../../interfaces/IMovie';
import Movie from '../Movie/Movie';
import CategoryFilter from '../CategoryFilter/CategoryFilter';
import Pagination from '../Pagination/Pagination';
import Sorting from '../Sorting/Sorting';

export default function MovieList() {

   // console.log('movie list');

    const dispatch = useAppDispatch();
    
    const movies: IMovie[] = useAppSelector(selectMovies);
    const moviesLiked: IMovie[] = useAppSelector(selectMoviesLiked);
    // const status: string = useAppSelector(selectStatus);

    const [filteredMovies, setFilteredMovies] = useState<IMovie[]>([]);
    
   const [itemsByPage, setItemsByPage] = useState<number>(4);
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [sorting, setSorting] = useState<string>('Sorting');

   console.log(sorting);



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

        let newMovies: IMovie[] = [...filteredMovies];

        if (sorting === 'Sorting'){
            newMovies.sort((a: any, b:any) => a.id - b.id);
         }else if (sorting === 'Title'){
            newMovies.sort((a:any,b:any) => (a.title.toLowerCase() < b.title.toLowerCase()) ? -1 : ((b.title.toLowerCase() > a.title.toLowerCase()) ? 1 : 0));
         }else if (sorting === 'Liked'){
            newMovies.sort((a: any, b:any) => b.likes - a.likes);
         }

        let start: number = (currentPage - 1)*itemsByPage;
         newMovies = newMovies.slice(start, start+itemsByPage);

      

        return newMovies.map(m => 
            <Movie key={m.id} movie={m} onDeleteMovie={onDeleteMovie} />
        ) ;
    }

    return (
        <div className='movie-list'>
             
             <div className='top'>
                <div className='title'>GetFlix</div>

                <CategoryFilter movies={movies} changeFilteredMovies={changeFilteredMovies} />
                
                <div className='flex-sort'>
                    <Pagination 
                        length={filteredMovies.length} itemsByPage={itemsByPage} currentPage={currentPage} changeItemsByPage={changeItemsByPage} changePage={changePage}
                    />
                    <Sorting onChangeSorting={setSorting} />
                </div>
            </div>

             <div className='movies'>
                {displayMovies()}
             </div>

            
        </div>
    );

}

