import React from 'react';
import PropTypes from 'react-proptypes';
import ViewSlider from '../common/ViewSlider';
import Day from '../calendar/Day';

function Days(props) {
    const initialSlide = props.records.findIndex((record) => record.timestamp === props.timestamp);

    function afterChange(slideIndex) {
        props.onChange(props.records[props.records.length - 1 - slideIndex].timestamp);
    }

    return (
        <ViewSlider
            initialSlide={initialSlide}
            afterChange={afterChange}
            onLoadNeeded={props.onLoadNeeded}
        >
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
    timestamp: PropTypes.number.isRequired,
    records: PropTypes.arrayOf(PropTypes.shape({
        timestamp: PropTypes.number,
    })).isRequired,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onLoadNeeded: PropTypes.func.isRequired,
};
