import React from 'react';
import PropTypes from 'react-proptypes';
import * as dateUtils from '../../dateUtils';
import MonthWeek from './MonthWeek';

function Month(props) {
    let groupedRecords = [];
    for (let record of props.records) {
        if (!groupedRecords.length || dateUtils.isLastDayOfWeek(record.timestamp)) {
            groupedRecords.push([]);
        }
        groupedRecords[groupedRecords.length - 1].push(record);
    }

    return (
        <div className="view month">
            {groupedRecords.map((records) => (
                <MonthWeek
                    key={records[0].timestamp}
                    records={records}
                    onSelect={props.onSelect}
                />
            ))}
        </div>
    );
}

export default Month;

Month.propTypes = {
    records: PropTypes.arrayOf(PropTypes.shape({
        timestamp: PropTypes.number,
    })).isRequired,
    onSelect: PropTypes.func.isRequired,
};
