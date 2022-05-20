import './category-filter.scss';
import React, { useState } from 'react';

import Select from 'react-select'
import IMovie from '../../interfaces/IMovie';

import { BsHandThumbsUp, BsHandThumbsUpFill} from "react-icons/bs";

interface IProps{
    movies: IMovie[]
    changeFilteredMovies: (cats: string[], likeSelected: boolean) => void
}

interface ICategory{
    value: string
    label: string
}

export default function CategoryFilter({movies, changeFilteredMovies}: IProps) {

   // const dispatch = useAppDispatch();

   const [categoriesSelected, setCategoeriesSelected] = useState<ICategory[]>([])
   const [likeSelected, setLikeSelected] = useState<boolean>(false)

    let categories: ICategory[] = [];

    movies.forEach(m => {
       if  ( !categories.some(c => c.value === m.category) ) {
        categories.push({value: m.category, label: m.category});
       }  
    });

    const changeLike = () => {
       
        let cats = categoriesSelected.map( (c:ICategory) => c.value);
        changeFilteredMovies(cats, !likeSelected);
        setLikeSelected(prev => !prev);
    }

    const handleChange = (categoriesObjects: any) => {
        
        setCategoeriesSelected(categoriesObjects);
        let cats = categoriesObjects.map( (c:ICategory) => c.value);
        changeFilteredMovies(cats, likeSelected);
     }

    return (
        <div className="category-filter"> 
           <Select isMulti options={categories} onChange={handleChange} placeholder='Categories' />
            <span className='thumb-filter' onClick={changeLike}>{ likeSelected ? <BsHandThumbsUpFill /> : <BsHandThumbsUp /> }   </span>
        </div>
    );

}

