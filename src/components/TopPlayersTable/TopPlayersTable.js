import React from 'react';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

import './TopPlayersTable.css';

const TopPlayersTable = (props) => {
    const sortByName = (e) => {
        e.preventDefault();
        let top = props.top;
        top = top
            .slice(0)
            .sort((a, b) => {
                let x = a.name.toLowerCase();
                let y = b.name.toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
            });
        props.sortTop([...top]);
    }

    const sortByRank = (e) => {
        e.preventDefault();
        let top = props.top;
        top = top
            .slice(0)
            .sort((a, b) => {
                return a.rank - b.rank;
            });
        props.sortTop([...top]);
    }

    const sortByCountry = (e) => {
        e.preventDefault();
        let top = props.top;
        top = top
            .slice(0)
            .sort((a, b) => {
                let x = a.country.toLowerCase();
                let y = b.country.toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
            });
            props.sortTop([...top]);
    }

    const sortByYear = (e) => {
        e.preventDefault();
        let top = props.top;
        top = top
            .slice(0)
            .sort((a, b) => {
                return a.byear - b.byear;
            });
        props.sortTop([...top]);
    }    

    return(
        <Table className='top-players-table' striped bordered size='sm' variant='dark'>
            <thead>
                <tr style={{fontWeight: 'bold'}}>
                    <td className='rank' onClick={(e) => sortByRank(e)} title='Sort by rank'>Rank <span className='d-none d-xl-inline'><FontAwesomeIcon icon={faSortDown} /></span></td>
                    <td className='name' onClick={(e) => sortByName(e)} title='Sort by name'>Name <span className='d-none d-xl-inline'><FontAwesomeIcon icon={faSortDown} /></span></td>
                    <td className='country' onClick={(e) => sortByCountry(e)} title='Sort by country'>Country <span className='d-none d-xl-inline'><FontAwesomeIcon icon={faSortDown} /></span></td>
                    <td className='rating' onClick={(e) => sortByRank(e)} title='Sort by rating'>Rating <span className='d-none d-xl-inline'><FontAwesomeIcon icon={faSortDown} /></span></td>
                    <td className='byear' onClick={(e) => sortByYear(e)} title='Sort by birthyear'>B&#8209;Year <span className='d-none d-xl-inline'><FontAwesomeIcon icon={faSortDown} /></span></td>
                </tr>
            </thead>
            <tbody>
                {props.top.map(n => {
                    return(
                    <tr>
                        <td className='rank'>{n.rank}</td>
                        <td className='name'>{n.name}</td>
                        <td className='country'>{n.country}</td>
                        <td className='rating'>{n.rating}</td>
                        <td className='byear'>{n.byear}</td>
                    </tr>)
                })}
            </tbody>
        </Table>
    )
}

export default TopPlayersTable;
