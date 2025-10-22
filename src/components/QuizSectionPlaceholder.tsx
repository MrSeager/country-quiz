//Bootstrap
import { Row, Col, Placeholder } from 'react-bootstrap';

export default function QuizSectionPlaceholder() {
    return (
        <>
            <Placeholder 
                as={'h1'} 
                xs={8} 
                className='rounded rounded-3' 
            />
            <Row>
                {[...Array(4)].map((_, index) => (
                    <Col key={index} lg={6} xs={12} className="py-2">
                        <Placeholder.Button
                            variant="light"
                            xs={12}
                            className="py-2 px-5 rounded-3 w-100"
                        />
                    </Col>
                ))}
            </Row>
        </>
    );
}