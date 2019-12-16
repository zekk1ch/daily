import React from 'react';
import PropTypes from 'react-proptypes';

function MonthDay(props) {
    return (
        <div className="month--day" onClick={() => props.onSelect(props.timestamp)}>
            <div>{props.timestamp}</div>
            <div>{''+props.status}</div>
        </div>
    );
}

export default MonthDay;

MonthDay.propTypes = {
    timestamp: PropTypes.number.isRequired,
    status: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
};
