import './pagination.scss';

import { BsArrowRightCircle, BsArrowLeftCircle } from 'react-icons/bs';

import React from 'react';

interface IProps{
    length: number
    itemsByPage: number
    currentPage: number
    changeItemsByPage: (items: number) => void
    changePage: (page: number) => void
}

export default function Pagination({length, itemsByPage, currentPage, changeItemsByPage, changePage}: IProps) {

  

   const nextPage = () => {
       // setCurrentPage((page) => page + 1);
   }

   const previousPage = () => {
       // setCurrentPage((page) => page - 1);
    }   

    const totalPages: number = Math.ceil(length / itemsByPage);
   
    const pageNumbers: number[] = [];
    for (let i=1; i<=totalPages; i++){
        pageNumbers.push(i);
    }

    /*
    const itemNumbers: number[] = [];
    for (let i=1; i<=length; i++){
        itemNumbers.push(i);
    }
    */


    const onChangeItemsByPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        changeItemsByPage(Number(e.target.value));
    }

    const onChangePage = (p: any) => {
        changePage(Number(p));
    }


    // cadre à côté de select ? 

    // next et previous page easy
  
    return (
        <div className="pagination">
           
           <div> Items by page : 
             <select onChange={onChangeItemsByPage}> 
                   <option value={4} >4</option>
                   <option value={8}>8</option>
                   <option value={12}>12</option>
       
              </select>
            </div>

           <div> 
                {pageNumbers.map(p => <span key={p} className={p===currentPage ? 'page-selected' : 'page'} onClick={ () => onChangePage(p)}>{p} </span>  )}
           </div>

            <div>
                {currentPage > 1 && <p onClick={() => onChangePage(currentPage-1)}> <BsArrowLeftCircle /> </p>}
                {currentPage*itemsByPage < length && <p onClick={() => onChangePage(currentPage+1)}> <BsArrowRightCircle /> </p>}
            </div>

        </div>
    );

}

