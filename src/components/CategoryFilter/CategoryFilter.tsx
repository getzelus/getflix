import React, { useState } from 'react';

//import { useAppSelector, useAppDispatch } from '../storage/hooks';
import Select from 'react-select'

import IMovie from '../../interfaces/IMovie';

interface IProps{
    movies: IMovie[]
    changeFilteredMovies: (cats: string[]) => void
}

interface ICategory{
    value: string
    label: string
}

export default function CategoryFilter({movies, changeFilteredMovies}: IProps) {

   // const dispatch = useAppDispatch();

   const [categoriesSelected, setCategoeriesSelected] = useState<ICategory[]>([])

    let categories: ICategory[] = [];

    movies.forEach(m => {
       if  ( !categories.some(c => c.value === m.category) ) {
        categories.push({value: m.category, label: m.category});
       }  
    });

    const handleChange = (categoriesObjects:any) => {
        
        setCategoeriesSelected(categoriesObjects);
        let cats = categoriesObjects.map( (c:ICategory) => c.value);
        changeFilteredMovies(cats);
     }

    return (
        <div className="category-filter">
           Category filter 
           <Select isMulti options={categories} onChange={handleChange} />
        </div>
    );

}

