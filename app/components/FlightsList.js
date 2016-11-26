import React from 'react';
import moment from 'moment';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';


const FlightRow = props => {
    return <tr>
        <td>{props.cityFrom}</td>
        <td>{props.cityTo}</td>
        <td>{moment(props.dTime * 1000).format('YYYY-MM-DD HH:mm:ss')}</td>
        <td>{props.price}</td>
    </tr>
}


@connect(state => state.app.flights)
class FlightsList extends React.Component {
    render() {
        let items = [];
        if (this.props.info && this.props.info.data) {
            items = this.props.info.data;
        }
        let rows = items.map(item => <FlightRow {...item} />)
        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Time</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        );
    }
}


export default FlightsList;