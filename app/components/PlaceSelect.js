import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import autobind from 'autobind-decorator';
import constants from '../constants';


@autobind
class PlaceSelect extends React.Component {
    render() {
        return <Select.Async valueKey="id" labelKey="value"
                             loadOptions={this.loadPlaces}
                             onChange={this._onChange}
                             {...this.props} />
    }

    _onChange(val) {
        if (val) {
            val = val.id;
        }
        return this.props.onSelect(val, this.props.name);
    }

    loadPlaces(input) {
        if (!input) {
            return Promise.resolve({ options: [] });
        }

        return fetch(`https://api.skypicker.com/places?term=${input}&v=2&locale=en`)
            .then(response => response.json())
            .then(items => {
                return { options: items };
            });
    }
}


export default PlaceSelect;