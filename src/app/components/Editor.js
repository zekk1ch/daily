import React from 'react';
import PropTypes from 'react-proptypes';
import { FaTimes, FaCheck } from 'react-icons/fa';

const Editor = (props) => {
    const yesOptionClassName = `editor-option-wrapper${props.value === true ? ' selected' : ''}`;
    const noOptionClassName = `editor-option-wrapper${props.value === false ? ' selected' : ''}`;
    const handleYesOptionClick = props.onChange.bind(this, props.value === true ? null : true);
    const handleNoOptionClick = props.onChange.bind(this, props.value === false ? null : false);

    return (
        <>
            <div id="editor-overflow" onClick={props.onHide}/>
            <div id="editor">
                <div className={yesOptionClassName} onClick={handleYesOptionClick}>
                    <FaCheck id="editor-option-yes" className="editor-icon"/>
                </div>
                <div className={noOptionClassName} onClick={handleNoOptionClick}>
                    <FaTimes id="editor-option-no" className="editor-icon"/>
                </div>
            </div>
        </>
    );
};

export default Editor;

Editor.propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
};
