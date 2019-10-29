import React from 'react';
import { Pagination } from 'react-bootstrap';

import './NewsPagination.css';

const NewsPagination = ({postsPerPage, totalPosts, currentPage, paginate}) => {
    let pageNumbers = [];
    const pageCount = Math.ceil(totalPosts / postsPerPage);
    const pagButtonsPerPage = 5;
    let diff;
    if(currentPage < Math.ceil(pagButtonsPerPage / 2))
        diff = pagButtonsPerPage - currentPage;
    else
        diff = Math.floor(pagButtonsPerPage / 2);
    for (let number = currentPage - diff; number <= currentPage + diff; number++) {
        if(number > 0 && number <= pageCount)
            pageNumbers.push(
                <Pagination.Item active={number === currentPage} key={number} onClick={() => paginate(number)}>
                    {number}
                </Pagination.Item>
            );
    }
    if(currentPage < pageCount - diff) {
        pageNumbers.push(
            <Pagination.Ellipsis disabled />
        )
    }

    return(
        <Pagination className='news-pagination'>
            <Pagination.First onClick={() => paginate(1)} />
            <Pagination.Prev onClick={() => { if(currentPage > 1) paginate(currentPage - 1) }} />
            {pageNumbers}
            <Pagination.Next onClick={() => { if(currentPage < pageCount) paginate(currentPage + 1) }} />
            <Pagination.Last onClick={() => paginate(pageCount)} />
        </Pagination>
    )
}
export default NewsPagination;
