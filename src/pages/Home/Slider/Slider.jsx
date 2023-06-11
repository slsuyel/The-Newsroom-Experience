import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import useClassAll from '../../hooks/useClassAll/useClassAll';
import { Button, Col, Spinner } from 'react-bootstrap';

function Slider() {
    const [allClass, , isLoading] = useClassAll();
    console.log(allClass);
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    if (isLoading) {
        return (
            <div className="text-center mt-5">
                <Button variant="primary" disabled>
                    <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                    Loading...
                </Button>
            </div>
        );
    }

    return (
        <div className="row container mx-auto">
            <Col sm={12} md={6}>
                <h4>Explore courses and programs at The Newsroom Experience.</h4>
                <p className="small-text">
                    Join us for an immersive summer program that dives into the exciting world of news presenting.
                    Learn from industry professionals, develop essential skills, and gain hands-on experience in a dynamic newsroom environment.
                </p>
                <ul>
                    <li>Learn the art of news presentation from seasoned journalists</li>
                    <li>Develop effective communication and public speaking skills</li>
                    <li>Gain hands-on experience using state-of-the-art broadcasting equipment</li>
                    <li>Collaborate with peers on news reporting and anchoring</li>
                    <li>Explore the latest trends in journalism and media</li>
                    <li>Build a professional network within the industry</li>
                </ul>
            </Col>
            <Col sm={12} md={6}>
                <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
                    {allClass.map((classItem) => (
                        <Carousel.Item key={classItem._id}>
                            <img className="d-block w-100" src={classItem?.classImage} height={'350px'} />
                            <Carousel.Caption >
                                <h3 className='bg-danger py-1 text-warning font-monospace'> {classItem.className}</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Col>
        </div>
    );
}
export default Slider;
