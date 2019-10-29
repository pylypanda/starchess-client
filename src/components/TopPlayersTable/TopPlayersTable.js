import React, {Component} from 'react';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

import './TopPlayersTable.css';

class TopPlayersTable extends Component {
    sortByName = (e) => {
        e.preventDefault();
        let top = this.props.top;
        top = top
            .slice(0)
            .sort((a, b) => {
                let x = a.name.toLowerCase();
                let y = b.name.toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
            });
        this.props.sortTop([...top]);
    }

    sortByRank = (e) => {
        e.preventDefault();
        let top = this.props.top;
        top = top
            .slice(0)
            .sort((a, b) => {
                return a.rank - b.rank;
            });
        this.props.sortTop([...top]);
    }

    sortByCountry = (e) => {
        e.preventDefault();
        let top = this.props.top;
        top = top
            .slice(0)
            .sort((a, b) => {
                let x = a.country.toLowerCase();
                let y = b.country.toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
            });
            this.props.sortTop([...top]);
    }

    sortByYear = (e) => {
        e.preventDefault();
        let top = this.props.top;
        top = top
            .slice(0)
            .sort((a, b) => {
                return a.byear - b.byear;
            });
        this.props.sortTop([...top]);
    }    

    render() {
        console.log('this.props.top: ', this.props.top);
        let top = this.props.top;
        return(
            <Table className='top-players-table' striped bordered size='sm' variant='dark'>
                <thead>
                    <tr style={{fontWeight: 'bold'}}>
                        <td className='rank' onClick={(e) => this.sortByRank(e)} title='Sort by rank'>Rank <span className='d-none d-xl-inline'><FontAwesomeIcon icon={faSortDown} /></span></td>
                        <td className='name' onClick={(e) => this.sortByName(e)} title='Sort by name'>Name <span className='d-none d-xl-inline'><FontAwesomeIcon icon={faSortDown} /></span></td>
                        <td className='country' onClick={(e) => this.sortByCountry(e)} title='Sort by country'>Country <span className='d-none d-xl-inline'><FontAwesomeIcon icon={faSortDown} /></span></td>
                        <td className='rating' onClick={(e) => this.sortByRank(e)} title='Sort by rating'>Rating <span className='d-none d-xl-inline'><FontAwesomeIcon icon={faSortDown} /></span></td>
                        <td className='byear' onClick={(e) => this.sortByYear(e)} title='Sort by birthyear'>B&#8209;Year <span className='d-none d-xl-inline'><FontAwesomeIcon icon={faSortDown} /></span></td>
                    </tr>
                </thead>
                <tbody>
                    {top.map(n => {
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

}

export default TopPlayersTable;
