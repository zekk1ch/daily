import React from 'react';
import PropTypes from 'react-proptypes';
import Select from './common/Select';

class Nav extends React.Component {
    state = {
        selectValue: this.props.defaultSelectOption,
        isSelectDisabled: false,
    };

    handleIconClick = (option) => {
        this.setState({
            isSelectDisabled: true,
        }, this.props.onChange.bind(this, option));
    };
    handleSelectClick = () => {
        if (this.state.isSelectDisabled) {
            this.setState({
                isSelectDisabled: false,
            }, this.props.onChange.bind(this, this.state.selectValue));
        }
    };
    handleSelectChange = (option) => {
        this.setState({
            selectValue: option,
        }, this.props.onChange.bind(this, option));
    };

    render() {
        return (
            <nav id="nav">
                <div id="nav-select-wrapper" onClick={this.handleSelectClick}>
                    <Select
                        value={this.state.selectValue}
                        options={this.props.selectOptions}
                        onChange={this.handleSelectChange}
                        isDisabled={this.state.isSelectDisabled}
                    />
                </div>
                {this.props.iconOptions.map(({ value, Icon }, i) => (
                    <Icon key={i} className="nav-icon" onClick={this.handleIconClick.bind(this, value)}/>
                ))}
            </nav>
        );
    }
}

export default Nav;

Nav.propTypes = {
    defaultSelectOption: PropTypes.string.isRequired,
    selectOptions: PropTypes.arrayOf(PropTypes.exact({
        value: PropTypes.string,
        label: PropTypes.string,
    })).isRequired,
    iconOptions: PropTypes.arrayOf(PropTypes.exact({
        value: PropTypes.string,
        Icon: PropTypes.func,
    })).isRequired,
    onChange: PropTypes.func.isRequired,
};
