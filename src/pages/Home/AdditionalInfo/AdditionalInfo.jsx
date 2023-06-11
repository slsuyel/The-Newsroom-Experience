/* eslint-disable react/no-unescaped-entities */
import { Button, Col, Container, Row } from "react-bootstrap";
import { BiSupport } from 'react-icons/bi';
import { Fade } from "react-awesome-reveal";
const AdditionalInfo = () => {
    return (
        <Container className="mt-5 shadow-lg">
            <Row>
            <Fade>
                <h2 className="border-2 border-bottom border-danger border-top col-md-4 mb-5 mx-auto py-2 text-center">Why We Are Best</h2>
            </Fade>
                <Col md={4}>
                    <h3><BiSupport /> SUPPORT IN 1 DAY</h3>
                    <p>Our dedicated support team is available to assist you within 1 business day. We prioritize providing quick and efficient solutions to any issues or queries you may have.</p>
                </Col>
                <Col md={4}>
                    <img src="https://www.svgrepo.com/show/12712/document.svg" alt="" width={'30px'} className="mb-2 ms-2" />
                    <h3 className="d-inline" > WELL DOCUMENTED</h3>
                    <p>Our platform is accompanied by comprehensive documentation that covers all aspects of its functionality. You'll find detailed guides, tutorials, and FAQs to help you make the most out of our eCommerce solution.</p>
                </Col>
                <Col md={4}>
                    <img src="https://www.svgrepo.com/show/489200/update-page.svg" alt="" width={'30px'} className="mb-2 ms-2" />
                    <h3 className="d-inline" >  ALWAYS UPDATED</h3>
                    <p>We continuously strive to enhance our platform based on user feedback and industry trends. With regular updates, you can expect new features, improvements, and security patches to keep your online store up to date.</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="primary">Get Started</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default AdditionalInfo;