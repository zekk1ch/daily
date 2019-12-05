import React from 'react';
import PropTypes from 'react-proptypes';
import ViewSlider from '../common/ViewSlider';
import Day from '../calendar/Day';

function Days(props) {
    return (
        <ViewSlider onLoadNeeded={props.onLoadNeeded}>
            {props.records.map((record) => (
                <Day
                    key={record.timestamp}
                    {...record}
                    onSelect={props.onSelect}
                />
            ))}
        </ViewSlider>
    );
}

export default Days;

Days.propTypes = {
    records: PropTypes.arrayOf(PropTypes.shape({
        timestamp: PropTypes.number,
    })).isRequired,
    onSelect: PropTypes.func.isRequired,
    onLoadNeeded: PropTypes.func.isRequired,
};
