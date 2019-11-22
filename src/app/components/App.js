import React from 'react';
import { FaUserCog } from 'react-icons/fa';
import AnimateHeight from 'react-animate-height';
import Nav from './Nav';
import Editor from './Editor';

class App extends React.Component {
    state = {
        view: 'day',
        isShowingEditor: false,
    };

    setView = (view) => {
        this.setState({
            view,
        });
    };
    hideEditor = () => {
        this.setState({
            isShowingEditor: false,
        })
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

                <AnimateHeight animateOpacity height={this.state.isShowingEditor ? 'auto' : 0}>
                    <Editor
                        value={null}
                        onChange={(v) => console.log('new status', v)}
                        onHide={this.hideEditor}
                    />
                </AnimateHeight>
            </>
        );
    }
}

export default App;
