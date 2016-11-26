import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import FlightsForm from './FlightsForm';
import FlightsList from './FlightsList';

export default () => {
    return <Grid fluid className="app-container">
        <Row>
            <Col>
                <h4>Test tickets finding app</h4>
            </Col>
        </Row>
        <FlightsForm />
        <FlightsList />
    </Grid>
}