import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Footer extends Component {
    render () {
        return(
            <div className='footer' style={{textAlign: 'center', fontSize: '14px'}}>
                <NavLink to='/' className='px-2'>Home</NavLink>
                <NavLink to='/' className='px-2'>About</NavLink>
                <NavLink to='/contacts' className='px-2'>Contacts</NavLink>
                <NavLink to='/' className='px-2'>Star Chess &copy; 2019</NavLink>
            </div>
        );
    }
}

export default Footer;
