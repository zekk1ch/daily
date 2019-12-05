import React from 'react';
import PropTypes from 'react-proptypes';
import { FaTimes, FaCheck } from 'react-icons/fa';

function Editor(props) {
    function handleOptionClick(e) {
        const isYesOption = e.currentTarget.classList[1] === 'yes';

        let status;
        if (isYesOption) {
            status = props.status === true ? null : true;
        } else {
            status = props.status === false ? null : false;
        }

        const record = {
            timestamp: props.timestamp,
            status,
        };
        props.onSubmit(record);
    }

    return (
        <>
            <div id="editor-overflow" onClick={props.onHide}/>
            <div id="editor">
                <div className={`editor-option-wrapper yes${props.status === true ? ' selected' : ''}`} onClick={handleOptionClick}>
                    <FaCheck className="editor-option-icon"/>
                </div>
                <div className={`editor-option-wrapper no${props.status === false ? ' selected' : ''}`} onClick={handleOptionClick}>
                    <FaTimes className="editor-option-icon"/>
                </div>
            </div>
        </>
    );
}

export default Editor;

Editor.propTypes = {
    timestamp: PropTypes.number.isRequired,
    status: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
};
