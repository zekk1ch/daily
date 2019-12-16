import React from 'react';
import PropTypes from 'react-proptypes';
import MonthDay from './MonthDay';

function MonthWeek(props) {
    return (
        <div className="month--week">
            {props.records.map((record) => (
                <MonthDay
                    key={record.timestamp}
                    {...record}
                    onSelect={props.onSelect}
                />
            ))}
        </div>
    );
}

export default MonthWeek;

MonthWeek.propTypes = {
    records: PropTypes.arrayOf(PropTypes.shape({
        timestamp: PropTypes.number,
    })).isRequired,
    onSelect: PropTypes.func.isRequired,
};
