import React from 'react';
import PropTypes from 'react-proptypes';

function ViewContainer(props) {
    return (
        <section className="view-wrapper">
            <div className="view-wrapper--timeline">
                <h1 className="title">{props.title}</h1>
            </div>
            <div className="view-wrapper--content">
                {props.children}
            </div>
        </section>
    );
}

export default ViewContainer;

ViewContainer.propTypes = {
    title: PropTypes.string.isRequired,
};
