import React from 'react';
import { Form, FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import autobind from 'autobind-decorator';
import { fetchFlights } from '../actions/async_actions';
import { changeRequestValue } from '../actions/index';
import PlaceSelect from './PlaceSelect';


const mapStateToProps = state => ({
    searchInfo: state.app.searchInfo,
    isLoading: state.app.flights.isLoading
});

const mapDispatchToProps = dispatch => {
    return {
        changeRequestValue: data => dispatch(changeRequestValue(data)),
        fetchFlights: data => dispatch(fetchFlights(data))
    }
}


@connect(mapStateToProps, mapDispatchToProps)
@autobind
class FlightsForm extends React.Component {
    render() {
        let {searchInfo} = this.props;
        return <Form inline>
            <div>
                <FormGroup className='select-holder-form-group'>
                    <PlaceSelect name='flyFrom' placeholder='From City' value={searchInfo.flyFrom} onSelect={this._onSelectChange} />
                </FormGroup>
                {' '}
                <FormGroup className='select-holder-form-group'>
                    <PlaceSelect name='to' placeholder='To City' value={searchInfo.to} onSelect={this._onSelectChange} />
                </FormGroup>
                {' '}
                <FormGroup>
                    <ControlLabel>Date from</ControlLabel>
                    {' '}
                    <FormControl name='dateFrom' type="date"
                                 onChange={this._onInputChange}
                                 value={searchInfo.date} />
                </FormGroup>
                {' '}
                <FormGroup>
                    <ControlLabel>Date to</ControlLabel>
                    {' '}
                    <FormControl name='dateTo' type="date"
                                 onChange={this._onInputChange}
                                 value={searchInfo.date} />
                </FormGroup>
                {' '}
                <Button disabled={this._isButtonDisabled()}
                        bsStyle="primary" onClick={this._requestFlights}>
                        {this.props.isLoading ? 'Retrieving flights...' : 'Get flights'}
                </Button>
            </div>
            <div style={{marginTop: 10}}>
                <FormGroup>
                    <ControlLabel>Return from</ControlLabel>
                    {' '}
                    <FormControl name='returnFrom' type="date"
                                 onChange={this._onInputChange}
                                 value={searchInfo.date} />
                </FormGroup>
                {' '}
                <FormGroup>
                    <ControlLabel>Return to</ControlLabel>
                    {' '}
                    <FormControl name='returnTo' type="date"
                                 onChange={this._onInputChange}
                                 value={searchInfo.date} />
                </FormGroup>
            </div>
        </Form>
    }

    _isButtonDisabled() {
        let {searchInfo} = this.props;
        return !searchInfo.flyFrom || !searchInfo.to || !(searchInfo.dateFrom || searchInfo.dateTo) || this.props.isLoading
    }

    _onSelectChange(value, name) {
        this.props.changeRequestValue({
            name, value
        })
    }

    _onInputChange(e) {
        let value = e.target.value;
        if (value) {
            value = moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY');
        }
        this.props.changeRequestValue({
            name: e.target.name,
            value: value
        });
    }

    _requestFlights() {
        this.props.fetchFlights(this.props.searchInfo);
    }
}

export default FlightsForm