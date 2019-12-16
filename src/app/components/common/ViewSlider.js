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

        if (this.props.afterChange) {
            this.props.afterChange(slideIndex);
        }
    };
    stopClickPropagationWhileSliding = (e) => {
        if (this.ref.current.innerSlider.state.animating) {
            e.stopPropagation();
        }
    };

    get initialSlide() {
        return typeof this.props.initialSlide === 'number' ? this.props.initialSlide : this.props.children.length - 1;
    }

    render() {
        const { children, onLoadNeeded, initialSlide, afterChange, ...sliderProps} = this.props;

        return (
            <div className="view-slider--wrapper" onClickCapture={this.stopClickPropagationWhileSliding}>
                <Slider
                    ref={this.ref}
                    rtl={true}
                    arrows={false}
                    infinite={false}
                    speed={300}
                    initialSlide={this.initialSlide}
                    afterChange={this.handleAfterChange}
                    {...sliderProps}
                >
                    {children}
                </Slider>
            </div>
        );
    }
}

export default ViewSlider;

ViewSlider.propTypes = {
    initialSlide: PropTypes.number,
    onLoadNeeded: PropTypes.func.isRequired,
    afterChange: PropTypes.func,
};
