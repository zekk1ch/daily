import React from 'react';
import PropTypes from 'react-proptypes';

function Day(props) {
    return (
        <div className="view day" onClick={() => props.onSelect(props.timestamp)}>
            <div className="day-timestamp">{props.timestamp}</div>
            <div className="day-status">{props.status + ''}</div>
        </div>
    );
}

export default Day;

Day.propTypes = {
    timestamp: PropTypes.number.isRequired,
    status: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
};
