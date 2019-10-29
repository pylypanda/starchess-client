import React from 'react';
import { Jumbotron, Image, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faSkype, faViber, faTelegram, faWhatsapp, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Contacts = () => {
    return(
        <Jumbotron className='py-5' style={{backgroundColor: 'rgba(80, 80, 80, 0.8)'}}>
            <Row>
                <Col className='d-none d-lg-block' lg={7}>
                    <Image src={require('../../img/contacts.jpg')} alt='Chess' fluid />
                </Col>
                <Col xs={12} lg={5}>
                    <h3 className='mb-4'>Contacts</h3>
                    <p><FontAwesomeIcon icon={faEnvelope} title='E-mail' /> : a.pylypets95@gmail.com</p>
                    <p><FontAwesomeIcon icon={faPhone} title='Telephone' /> ( <FontAwesomeIcon icon={faSkype} title='Skype' /> <FontAwesomeIcon icon={faViber} title='Viber' /> <FontAwesomeIcon icon={faTelegram} title='Telegram' /> <FontAwesomeIcon icon={faWhatsapp} title='WhatsApp' /> ) : <a href='tel:+420735868904' target='_blank'>+420 735 868 904</a></p>
                    <p><FontAwesomeIcon icon={faFacebookSquare} title='Facebook' /> : <a href='https://www.facebook.com/profile.php?id=100013782758895' target='_blank'>Andriy Pylypets</a></p>
                    <p><FontAwesomeIcon icon={faLinkedin} title='LinkedIn' /> : <a href='https://www.linkedin.com/in/andriy-pylypets/' target='_blank'>Andriy Pylypets</a></p>
                </Col>
                <Col className='d-lg-none' xs={12}>
                    <Image src={require('../../img/contacts.jpg')} alt='Chess' fluid />
                </Col>
            </Row>
        </Jumbotron>
    );
}
export default Contacts;