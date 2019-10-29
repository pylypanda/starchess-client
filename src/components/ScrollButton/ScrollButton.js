import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

import './ScrollButton.css';

class ScrollButton extends Component {
  constructor() {
    super();
    this.state = {
      intervalId: 0
    };
  }
    
  scrollStep() {
    if (window.pageYOffset === 0) {
        clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStep);
  }
  
  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delay);
    this.setState({ intervalId: intervalId });
  }
  
  render () {
    return (
      <FontAwesomeIcon icon={faChevronUp} className='scroll-btn py-2 px-3' title='Back to top' onClick={() => this.scrollToTop()} />
    )
  }
}
export default ScrollButton;
