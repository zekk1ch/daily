import React from 'react';
import { FaUserCog } from 'react-icons/fa';
import AnimateHeight from 'react-animate-height';
import * as dateUtils from '../dateUtils';
import * as idbClient from '../idbClient';
import Nav from './Nav';
import Editor from './Editor';
import Days from './views/Days';
import Weeks from './views/Weeks';
import Months from './views/Months';
import Settings from './views/Settings';

class App extends React.Component {
    state = {
        view: 'day',
        isShowingEditor: false,
        timestamp: dateUtils.timestamp2dateTimestamp(Date.now()),
        records: [],
    };

    async componentDidMount() {
        const minTimestamp = dateUtils.incrementTimestamp(this.state.timestamp, -1, this.state.view);
        const maxTimestamp = dateUtils.incrementTimestamp(this.state.timestamp, 1, this.state.view);

        await this.loadRecords(minTimestamp, maxTimestamp);
    }

    handleViewChange = (view) => {
        this.setState({
            view,
        });
    };
    openEditor = (timestamp) => {
        this.setState({
            isShowingEditor: true,
            timestamp,
        });
    };
    hideEditor = () => {
        this.setState({
            isShowingEditor: false,
        });
    };

    _addEmptyRecords = (records, minTimestamp, maxTimestamp) => {
        let newRecords = records.slice();

        let timestamp = maxTimestamp, recordIndex = 0;
        while (timestamp >= minTimestamp) {
            if (!newRecords[recordIndex] || newRecords[recordIndex].timestamp !== timestamp) {
                newRecords.splice(recordIndex, 0, {
                    timestamp,
                    status: null,
                });
            }

            timestamp = dateUtils.incrementTimestamp(timestamp, -1, 'day');
            recordIndex++;
        }

        return newRecords;
    };
    _mergeStateRecords = (records) => {
        let newRecords = [];

        let stateRecords = this.state.records.slice();
        let recordsToAdd = records.slice();
        while (stateRecords.length && recordsToAdd.length) {
            if (recordsToAdd[0].timestamp === stateRecords[0].timestamp) {
                newRecords.push(recordsToAdd.shift());
                stateRecords.shift();
                continue;
            }
            if (recordsToAdd[0].timestamp > stateRecords[0].timestamp) {
                newRecords.push(recordsToAdd.shift());
                continue;
            }
            if (recordsToAdd[0].timestamp < stateRecords[0].timestamp) {
                newRecords.push(stateRecords.shift());
            }
        }
        if (recordsToAdd.length) {
            newRecords.push(...recordsToAdd);
        }
        if (stateRecords.length) {
            newRecords.push(...stateRecords);
        }

        return newRecords;
    };

    loadRecords = async (minTimestamp, maxTimestamp) => {
        let records;
        try {
            const query = {
                lower: minTimestamp,
                upper: maxTimestamp,
            };
            records = await idbClient.getRecords(query);
        } catch (err) {
            console.error(err);
            return;
        }

        records = this._addEmptyRecords(records, minTimestamp, maxTimestamp);

        this.setState({
            records: this._mergeStateRecords(records),
        });
    };
    saveRecord = async (record) => {
        let newRecord;
        try {
            newRecord = await idbClient.saveRecord(record);
        } catch (err) {
            console.error(err);
            return;
        }

        this.setState({
            records: this._mergeStateRecords([newRecord]),
        });
    };

    handleLoadNeeded = async (position) => {
        let lastLoadedTimestamp = this.state.timestamp;
        if (this.state.records.length) {
            lastLoadedTimestamp = position === 'before' ? this.state.records[0].timestamp : this.state.records[this.state.records.length - 1].timestamp;
        }
        const incrementValue = position === 'before' ? 1 : -1;

        const minTimestamp = dateUtils.incrementTimestamp(lastLoadedTimestamp, incrementValue, 'day');
        const maxTimestamp = dateUtils.incrementTimestamp(lastLoadedTimestamp, incrementValue, this.state.view);

        await this.loadRecords(minTimestamp, maxTimestamp);
    };

    get statusForTimestamp() {
        if (!this.state.isShowingEditor) {
            return null;
        }

        const record = this.state.records.find((record) => record.timestamp === this.state.timestamp);
        if (!record) {
            return null;
        }

        return record.status;
    }

    render() {
        return (
            <>
                <Nav
                    selectOptions={[
                        { value: 'day', label: 'Day' },
                        { value: 'week', label: 'Week' },
                        { value: 'month', label: 'Month' },
                    ]}
                    iconOptions={[
                        { value: 'settings', Icon: FaUserCog },
                    ]}
                    defaultSelectOption={this.state.view === 'settings' ? 'day' : this.state.view}
                    onChange={this.handleViewChange}
                />

                {this.state.view === 'day' && (
                    <Days
                        records={this.state.records}
                        onSelect={this.openEditor}
                        onLoadNeeded={this.handleLoadNeeded}
                    />
                )}
                {this.state.view === 'week' && (
                    <Weeks
                    />
                )}
                {this.state.view === 'month' && (
                    <Months
                    />
                )}
                {this.state.view === 'settings' && (
                    <Settings
                    />
                )}

                <AnimateHeight animateOpacity height={this.state.isShowingEditor ? 'auto' : 0}>
                    <Editor
                        timestamp={this.state.timestamp}
                        status={this.statusForTimestamp}
                        onSubmit={this.saveRecord}
                        onHide={this.hideEditor}
                    />
                </AnimateHeight>
            </>
        );
    }
}

export default App;
