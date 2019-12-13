import React from 'react';
import PropTypes from 'react-proptypes';
import * as dateUtils from '../../dateUtils';
import ViewSlider from '../common/ViewSlider';
import Week from '../calendar/Week';

function Weeks(props) {
    let groupedRecords = [], initialSlide;
    for (let record of props.records) {
        if (!groupedRecords.length || dateUtils.isLastDayOfWeek(record.timestamp)) {
            groupedRecords.push([]);
        }
        groupedRecords[groupedRecords.length - 1].unshift(record);

        if (record.timestamp === props.timestamp) {
            initialSlide = groupedRecords.length - 1;
        }
    }

    function afterChange(slideIndex) {
        props.onChange(groupedRecords[groupedRecords.length - 1 - slideIndex][0].timestamp);
    }

    return (
        <ViewSlider
            initialSlide={initialSlide}
            afterChange={afterChange}
            onLoadNeeded={props.onLoadNeeded}
        >
            {groupedRecords.map((records) => (
                <Week
                    key={records[0].timestamp}
                    records={records}
                    onSelect={props.onSelect}
                />
            ))}
        </ViewSlider>
    );
}

export default Weeks;

Weeks.propTypes = {
    timestamp: PropTypes.number.isRequired,
    records: PropTypes.arrayOf(PropTypes.shape({
        timestamp: PropTypes.number,
    })).isRequired,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onLoadNeeded: PropTypes.func.isRequired,
};
