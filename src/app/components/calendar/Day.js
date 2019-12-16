import React from 'react';
import PropTypes from 'react-proptypes';
import { IoMdThumbsUp } from 'react-icons/io';
import * as dateUtils from '../../dateUtils';

function Day(props) {
    const date = new Date(dateUtils.dateTimestamp2timestamp(props.timestamp)).getDate();

    return (
        <div
            className={`view day ${typeof props.status === 'boolean' ? ' with-status' : ''}`}
            onClick={() => props.onSelect(props.timestamp)}
        >
            <h2 className="day--date">{date}</h2>
            <IoMdThumbsUp className={`day--status ${typeof props.status === 'boolean' ? props.status ? 'yes' : 'no' : ''}`}/>
        </div>
    );
}

export default Day;

Day.propTypes = {
    timestamp: PropTypes.number.isRequired,
    status: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
};
