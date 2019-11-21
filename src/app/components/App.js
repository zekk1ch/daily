import React from 'react';
import { FaUserCog } from 'react-icons/fa';
import Nav from './Nav';

class App extends React.Component {
    state = {
        view: 'day',
    };

    setView = (view) => {
        this.setState({
            view,
        });
    };

    render() {
        return (
            <>
                <Nav
                    defaultSelectOption={this.state.view === 'settings' ? 'day' : this.state.view}
                    selectOptions={[
                        { value: 'day', label: 'Day' },
                        { value: 'week', label: 'Week' },
                        { value: 'month', label: 'Month' },
                    ]}
                    iconOptions={[
                        { value: 'settings', Icon: FaUserCog },
                    ]}
                    onChange={this.setView}
                />
            </>
        );
    }
}

export default App;
