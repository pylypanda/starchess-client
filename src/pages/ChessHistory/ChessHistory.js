import React, { Component } from 'react';
import { Jumbotron, Image, Row, Col, Table } from 'react-bootstrap';
import './ChessHistory.css';
import api from '../../api';


class ChessHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            champions: [],
            oldLeaders: [],
            wChampions: [],
            isLoadingWC: false,
            isLoadingWWC: false,
            isLoadingOL: false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getChampions();
        this.getWomChampions();
        this.getOldLeaders();
    }

    getChampions = async () => {
        this.setState({ isLoadingWC: true });
        await api.getChampions().then(champions => {
            this.setState({
                champions: champions.data.data,
                isLoadingWC: false
            })
        })
    }

    getWomChampions = async () => {
        this.setState({ isLoadingWWC: true });
        await api.getWomChampions().then(champions => {
            this.setState({
                wChampions: champions.data.data,
                isLoadingWWC: false
            })
        })
    }

    getOldLeaders = async () => {
        this.setState({ isLoadingOL: true });
        await api.getOldLeaders().then(oldLeaders => {
            this.setState({
                oldLeaders: oldLeaders.data.data,
                isLoadingOL: false
            })
        })
    }

    render() {
        return(
            <Jumbotron style={{backgroundColor: 'rgba(80, 80, 80, 0.8)'}}>
                <h1 className='mb-3'>History of Chess</h1>
                <p>Chess is believed to have originated in Eastern India, c. 280–550, in the Gupta Empire, where its early form in the 6th century was known as chaturaṅga, literally four divisions [of the military] – infantry, cavalry, elephants, and chariotry, represented by the pieces that would evolve into the modern pawn, knight, bishop, and rook, respectively. Thence it spread eastward and westward along the Silk Road. The earliest evidence of chess is found in the nearby Sassanid Persia around 600, where the game came to be known by the name chatrang. Chatrang was taken up by the Muslim world after the Islamic conquest of Persia (633–44), where it was then named shatranj, with the pieces largely retaining their Persian names. In Spanish "shatranj" was rendered as ajedrez ("al-shatranj"), in Portuguese as xadrez, and in Greek as ζατρίκιον (zatrikion, which comes directly from the Persian chatrang), but in the rest of Europe it was replaced by versions of the Persian shāh ("king"), which was familiar as an exclamation and became the English words "check" and "chess".</p>
                <Row className='my-4'>
                    <Col xs={6} md={5} lg={4} className='text-center ml-md-5'>
                        <Image src={require('../../img/history/chaturanga.jpeg')} width='100%' fluid />
                        <i className='mb-3 d-block'>An antique Chaturanga board and pieces</i>
                        <Image src={require('../../img/history/knights-templar.jpg')} width='100%' fluid />
                        <i>Knights Templar playing chess, Libro de los juegos, 1283</i>
                    </Col>
                    <Col xs={6} md={5} lg={4} className='text-center ml-md-3 ml-lg-5'>
                        <Image src={require('../../img/history/old-pieces.jpg')} width='100%' fluid />
                        <i>Reproductions of the 12th-century Lewis chessmen. Top row: king, queen, and bishop. Bottom row: knight, rook, and pawn.</i>
                    </Col>
                </Row>
                <p>Around 1200, the rules of shatranj started to be modified in southern Europe, and around 1475, several major changes made the game essentially as it is known today.</p>
                <p>Writings about the theory of how to play chess began to appear in the 15th century. The Repetición de Amores y Arte de Ajedrez (Repetition of Love and the Art of Playing Chess) by Spanish churchman Luis Ramirez de Lucena was published in Salamanca in 1497. Lucena and later masters like Portuguese Pedro Damiano, Italians Giovanni Leonardo Di Bona, Giulio Cesare Polerio and Gioachino Greco, and Spanish bishop Ruy López de Segura developed elements of openings and started to analyze simple endgames.</p>
                <Row className='my-3'>
                    <Col xs={12} lg={10} className='ml-lg-5'>
                        <h3>Leading players before the World Championships</h3>
                        {this.state.isLoadingOL ?
                            <div className='loader centered-hor'></div> :
                            <Table className='champions-tbl my-3' striped bordered size='sm' variant='dark' style={{fontSize: '14px'}}>
                                <thead>
                                    <tr style={{fontWeight: 'bold'}}>
                                        <td>Name</td>
                                        <td>Year</td>
                                        <td>Country</td>
                                        <td>Age</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.oldLeaders.map(leader => {
                                        return(
                                            <tr>
                                                <td>{leader.name}</td>
                                                <td>{leader.year}</td>
                                                <td>{leader.country}</td>
                                                <td>{leader.age}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        }
                    </Col>
                </Row>
                <p>Deeper insight into the nature of chess came with two younger players. American Paul Morphy, an extraordinary chess prodigy, won against all important competitors, including Anderssen, during his short chess career between 1857 and 1863. Morphy's success stemmed from a combination of brilliant attacks and sound strategy; he intuitively knew how to prepare attacks. Prague-born Wilhelm Steinitz later described how to avoid weaknesses in one's own position and how to create and exploit such weaknesses in the opponent's position. In addition to his theoretical achievements, Steinitz founded an important tradition: his triumph over the leading Polish-German master Johannes Zukertort in 1886 is regarded as the first official World Chess Championship. Steinitz lost his crown in 1894 to a much younger German mathematician Emanuel Lasker, who maintained this title for 27 years, the longest tenure of all World Champions.</p>
                <Row className='my-4'>
                    <Col xs={6} md={5} lg={4} className='text-center ml-md-5'>
                        <Image src={require('../../img/history/morphy.jpg')} width='100%' fluid />
                        <i>Paul Morphy</i>
                    </Col>
                    <Col xs={6} md={5} lg={4} className='text-center ml-md-3 ml-lg-5'>
                        <Image src={require('../../img/history/steinitz.jpg')} width='100%' fluid />
                        <i>Wilhelm Steinitz</i>
                    </Col>
                </Row>
                <p>Since the end of 19th century, the number of annually held master tournaments and matches quickly grew. Some sources state that in 1914 the title of chess grandmaster was first formally conferred by Tsar Nicholas II of Russia to Lasker, Capablanca, Alekhine, Tarrasch and Marshall, but this is a disputed claim. The tradition of awarding such titles was continued by the World Chess Federation (FIDE), founded in 1924 in Paris. In 1927, Women's World Chess Championship was established; the first to hold it was Czech-English master Vera Menchik.</p>
                <Row className='my-3'>
                    <Col xs={12} lg={10} className='ml-lg-5'>
                        <h3>Women's World Champions</h3>
                        {this.state.isLoadingWWC === true ?
                            <div className='loader centered-hor'></div> :
                            <Table className='champions-tbl my-3' striped bordered size='sm' variant='dark' style={{fontSize: '14px'}}>
                                <thead>
                                    <tr style={{fontWeight: 'bold'}}>
                                        <td>Name</td>
                                        <td>Years</td>
                                        <td>Country</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.wChampions.map(champion => {
                                        return(
                                            <tr>
                                                <td>{champion.name}</td>
                                                <td>{champion.years}</td>
                                                <td>{champion.country}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        }
                    </Col>
                </Row>
                <p>In 1993, Garry Kasparov and Nigel Short broke with FIDE to organize their own match for the title and formed a competing Professional Chess Association (PCA). From then until 2006, there were two simultaneous World Champions and World Championships: the PCA or Classical champion extending the Steinitzian tradition in which the current champion plays a challenger in a series of many games; the other following FIDE's new format of many players competing in a tournament to determine the champion.</p>
                <Row className='my-4'>
                    <Col xs={6} md={5} lg={4} className='text-center ml-md-5'>
                        <Image src={require('../../img/history/kasparov.jpg')} width='100%' fluid />
                        <i>Garry Kasparov</i>
                    </Col>
                    <Col xs={6} md={5} lg={4} className='text-center ml-md-3 ml-lg-5'>
                        <Image src={require('../../img/history/kramnik.jpeg')} width='100%' fluid />
                        <i>Vladimir Kramnik</i>
                    </Col>
                </Row>
                <p>The FIDE World Chess Championship 2006 reunified the titles, when Kramnik beat the FIDE World Champion Veselin Topalov and became the undisputed World Chess Champion. In September 2007, Viswanathan Anand from India became the next champion by winning a championship tournament. In October 2008, Anand retained his title, decisively winning the rematch against Kramnik. Anand retained his title until 2013, when he lost it to Magnus Carlsen from Norway, the current World Chess Champion.</p>
                <Row className='my-4'>
                    <Col xs={6} md={5} lg={4} className='text-center ml-md-5'>
                        <Image src={require('../../img/history/anand.jpg')} width='100%' fluid />
                        <i>Viswanathan Anand</i>
                    </Col>
                    <Col xs={6} md={5} lg={4} className='text-center ml-md-3 ml-lg-5'>
                        <Image src={require('../../img/history/carlsen.jpg')} width='100%' fluid />
                        <i>Magnus Carlsen</i>
                    </Col>
                </Row>
                <Row className='my-3'>
                    <Col xs={12} lg={10} className='ml-lg-5'>
                        <h3>Undisputed World Champions</h3>
                        {this.state.isLoadingWC === true ?
                            <div className='loader centered-hor'></div> :
                            <Table className='champions-tbl my-3' striped bordered size='sm' variant='dark' style={{fontSize: '14px'}}>
                                <thead>
                                    <tr style={{fontWeight: 'bold'}}>
                                        <td>#</td>
                                        <td>Name</td>
                                        <td>Years</td>
                                        <td>Country</td>
                                        <td>Age</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.champions.map(champion => {
                                        return(
                                            <tr>
                                                <td>{champion.number}</td>
                                                <td>{champion.name}</td>
                                                <td>{champion.year}</td>
                                                <td>{champion.country}</td>
                                                <td>{champion.age}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        }
                    </Col>
                </Row>
            </Jumbotron>
        );
    }
}
export default ChessHistory;
