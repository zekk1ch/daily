import React from 'react';
import PropTypes from 'react-proptypes';
import Slider from 'react-slick';

class ViewSlider extends React.Component {
    ref = React.createRef();

    componentDidUpdate(prevProps) {
        if (!prevProps.children.length && this.props.children.length) {
            this.ref.current.slickGoTo(this.props.children.length - 1, true);
        }
        if (prevProps.children.length && this.props.children.length && prevProps.children[prevProps.children.length - 1].key !== this.props.children[this.props.children.length - 1].key) {
            this.ref.current.slickGoTo(1, true); // FIXME: there's still a single frame flash when sliding to the very last slide
        }
    }

    handleAfterChange = (slideIndex) => {
        if (slideIndex === 0) {
            this.props.onLoadNeeded('after');
        }
        if (slideIndex === this.props.children.length - 1) {
            this.props.onLoadNeeded('before');
        }

        if (typeof this.props.afterChange === 'function') {
            this.props.afterChange(slideIndex);
        }
    };

    render() {
        const { children, onLoadNeeded, afterChange, ...sliderProps} = this.props;

        return (
            <Slider
                ref={this.ref}
                className="fill-space"
                rtl={true}
                arrows={false}
                infinite={false}
                speed={300}
                afterChange={this.handleAfterChange}
                intialSlide={children.length - 1}
                {...sliderProps}
            >
                {children}
            </Slider>
        );
    }
}

export default ViewSlider;

ViewSlider.propTypes = {
    onLoadNeeded: PropTypes.func.isRequired,
};
