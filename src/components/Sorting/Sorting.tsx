import './sorting.scss';

import React from 'react';

interface IProps{
    onChangeSorting: (sorting: string) => void
}

export default function Sorting({onChangeSorting}: IProps) {


    const changeValue = (e: React.ChangeEvent<HTMLSelectElement> ) => {
        onChangeSorting(e.target.value);
    }

    return (
        <div className="sorting">
             <select className='select-num-items' onChange={changeValue}> 
                   <option value='Sorting'>Sorting</option>
                   <option value='Title'>Title</option>
                   <option value='Liked'>Liked</option>
              </select>  
        </div>
    );

}

