import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import api from '../../api';
import NewsCard from '../../components/NewsCard/NewsCard';
import NewsPagination from '../../components/NewsPagination/NewsPagination';

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            news: [],
            postsPerPage: 6,
            currentPage: 1
        }
    }

    componentDidMount() {
        this.getAllNews();
    }

    getAllNews = async () => {
        this.setState({ isLoading: true });
        await api.getAllNews().then(news => {
            this.setState({
                isLoading: false,
                news: news.data.data
            })            
        })
    }

    paginate = (pageNumber) => {
        window.scrollTo(0, 0);
        this.setState({
            currentPage: pageNumber
        })
    }

    render() {
        const { news, isLoading } = this.state;
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentNews = news.slice(indexOfFirstPost, indexOfLastPost); // news on one page

        return(
            <>
            <NewsPagination
                postsPerPage={this.state.postsPerPage}
                totalPosts={news.length}
                currentPage={this.state.currentPage}
                paginate={this.paginate}
            />
            <Row>
                { // render loading-spinner
                    isLoading ? <div className='loader centered-hor centered-ver'></div> : null
                }
                {currentNews.map((news) => {
                    return(
                        <Col xs={12} lg={6} className='news-preview pb-3'>
                            <NavLink to={`/news/${news._id}`}>
                                <NewsCard {...news} />
                            </NavLink>
                        </Col>
                    )
                })}
            </Row>
            <NewsPagination
                postsPerPage={this.state.postsPerPage}
                totalPosts={news.length}
                currentPage={this.state.currentPage}
                paginate={this.paginate}
            />
            </>
        );
    }
}
export default News;
