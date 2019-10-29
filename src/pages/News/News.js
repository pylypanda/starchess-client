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
            news: [],
            postsPerPage: 6,
            currentPage: 1
        }
    }

    componentDidMount() {
        this.getAllNews();
    }

    getAllNews = async () => {
        await api.getAllNews().then(news => {
            this.setState({
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
        const { news } = this.state;
        console.log('news: ', news);

        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentNews = news.slice(indexOfFirstPost, indexOfLastPost);

        console.log('currentNews: ', currentNews);

        return(
            <>
            <NewsPagination
                postsPerPage={this.state.postsPerPage}
                totalPosts={news.length}
                currentPage={this.state.currentPage}
                paginate={this.paginate}
            />
            <Row>
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
