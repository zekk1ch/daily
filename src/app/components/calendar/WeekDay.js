import React from 'react';
import PropTypes from 'react-proptypes';

function WeekDay(props) {
    return (
        <div className="week-day" onClick={props.onSelect.bind(this, props.timestamp)}>
            <div>{props.timestamp}</div>
            <div>{''+props.status}</div>
        </div>
    );
}

export default WeekDay;

WeekDay.propTypes = {
    timestamp: PropTypes.number.isRequired,
    status: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
};
