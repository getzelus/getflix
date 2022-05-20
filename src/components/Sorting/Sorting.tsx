import './sorting.scss';
import React from 'react';

interface IProps{
    sortingDefault: string
    onChangeSorting: (sorting: string) => void
}

export default function Sorting({onChangeSorting, sortingDefault}: IProps) {
    
    const changeValue = (e: React.ChangeEvent<HTMLSelectElement> ) => {
        onChangeSorting(e.target.value);
    }

    return (
        <div className="sorting">
             <select className='select-num-items' onChange={changeValue}  defaultValue={"default"}> 
                   <option value='Sorting'>Sorting</option>
                   <option value='Title'>Title</option>
                   <option value='Liked'>Liked</option>
              </select>  
        </div>
    );

}

