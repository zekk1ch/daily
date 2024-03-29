import React from 'react';
import PropTypes from 'react-proptypes';
import WeekDay from './WeekDay';

function Week(props) {
    return (
        <div className="view week">
            {props.records.map((record) => (
                <WeekDay
                    key={record.timestamp}
                    {...record}
                    onSelect={props.onSelect}
                />
            ))}
        </div>
    );
}

export default Week;

Week.propTypes = {
    records: PropTypes.arrayOf(PropTypes.shape({
        timestamp: PropTypes.number,
    })).isRequired,
    onSelect: PropTypes.func.isRequired,
};
