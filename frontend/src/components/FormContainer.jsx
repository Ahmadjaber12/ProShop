import {Col, Container, Row} from 'react-bootstrap';

const FormContainer=({children})=>{

    return(

        <Container>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={16}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer;