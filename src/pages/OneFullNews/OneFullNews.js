import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import api from '../../api';
import NewsCard from '../../components/NewsCard/NewsCard';

class OneFullNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: {}
        };
    }

    componentDidMount() {
        this.getNewsById();
    }

    getNewsById = async () => {
        await api.getNewsById(this.props.match.params.id).then( news => {
            this.setState({
                news: news.data.data
            })
        })
    }

    render() {
        return(
            <Row>
                <Col xs={12} lg={10}>
                    <NewsCard {...this.state.news} />
                    <div className='text-center mt-3'>
                        <NavLink to='/news' className='d-inline-block py-3 px-5 mb-5' style={{backgroundColor: 'rgb(138, 84, 48)', borderRadius: '10px'}}>
                            Back to all news
                        </NavLink>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default OneFullNews;
