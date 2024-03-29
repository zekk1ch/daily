import React from 'react';
import PropTypes from 'react-proptypes';
import Select from './common/Select';

class Nav extends React.Component {
    state = {
        selectValue: this.props.selectOptions.find((selectOption) => selectOption.value === this.props.initialValue)
            ? this.props.initialValue
            : this.props.selectOptions[0] && this.props.selectOptions[0].value,
        isSelectDisabled: !this.props.selectOptions.find((selectOption) => selectOption.value === this.props.initialValue),
    };

    handleIconClick = (option) => {
        this.setState({
            isSelectDisabled: true,
        }, () => this.props.onChange(option));
    };
    handleSelectClick = () => {
        if (this.state.isSelectDisabled) {
            this.setState({
                isSelectDisabled: false,
            }, () => this.props.onChange(this.state.selectValue));
        }
    };
    handleSelectChange = (option) => {
        this.setState({
            selectValue: option,
        }, () => this.props.onChange(option));
    };

    render() {
        return (
            <nav id="nav">
                <div id="nav--select-wrapper" onClick={this.handleSelectClick}>
                    <Select
                        value={this.state.selectValue}
                        options={this.props.selectOptions}
                        onChange={this.handleSelectChange}
                        isDisabled={this.state.isSelectDisabled}
                    />
                </div>
                {this.props.iconOptions.map(({ value, Icon }, i) => (
                    <Icon key={i} className="nav--icon" onClick={() => this.handleIconClick(value)}/>
                ))}
            </nav>
        );
    }
}

export default Nav;

Nav.propTypes = {
    initialValue: PropTypes.string.isRequired,
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
