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
    views = {
        DAY: dateUtils.DAY,
        WEEK: dateUtils.WEEK,
        MONTH: dateUtils.MONTH,
        SETTINGS: 'settings',
    };
    preferences = {
        VIEW: 'view',
        TIMESTAMP: 'timestamp',
    };

    constructor(props) {
        super(props);

        let timestamp = Number(localStorage.getItem(this.preferences.TIMESTAMP));
        if (!timestamp) {
            timestamp = dateUtils.timestamp2dateTimestamp(Date.now());
            localStorage.setItem(this.preferences.TIMESTAMP, timestamp);
        }

        let view = localStorage.getItem(this.preferences.VIEW);
        if (!Object.values(this.views).includes(view)) {
            view = this.views.DAY;
            localStorage.setItem(this.preferences.VIEW, view);
        }

        this.state = {
            view,
            timestamp,
            records: [],
            isShowingEditor: false,
        };
    }

    async componentDidMount() {
        if (this.isCalendarView) {
            await this.loadRecords();
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.view !== prevState.view && this.isCalendarView && !this.isLoaded) {
            await this.loadRecords();
        }
    }

    changeView = (view) => {
        localStorage.setItem(this.preferences.VIEW, view);
        this.setState({
            view,
        },);
    };
    changeTimestamp = (timestamp) => {
        localStorage.setItem(this.preferences.TIMESTAMP, timestamp);
        this.setState({
            timestamp,
        });
    };
    openEditor = (timestamp) => {
        localStorage.setItem(this.preferences.TIMESTAMP, timestamp);
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

    _fillWithEmptyRecords = (records, minTimestamp, maxTimestamp) => {
        let newRecords = records.slice();

        let timestamp = maxTimestamp, recordIndex = 0;
        while (timestamp >= minTimestamp) {
            if (!newRecords[recordIndex] || newRecords[recordIndex].timestamp !== timestamp) {
                newRecords.splice(recordIndex, 0, {
                    timestamp,
                    status: null,
                });
            }

            timestamp = dateUtils.incrementTimestamp(timestamp, -1, dateUtils.DAY);
            recordIndex++;
        }

        return newRecords;
    };
    _mergeStateRecords = (records) => {
        let newRecords = [];

        let stateRecords = this.state.records.slice();
        let recordsToAdd = records.slice();
        while (stateRecords.length || recordsToAdd.length) {
            if (!stateRecords.length) {
                newRecords.push(...recordsToAdd);
                break;
            }
            if (!recordsToAdd.length) {
                newRecords.push(...stateRecords);
                break;
            }
            if (recordsToAdd[0].timestamp > stateRecords[0].timestamp) {
                newRecords.push(recordsToAdd.shift());
                continue;
            }
            if (recordsToAdd[0].timestamp < stateRecords[0].timestamp) {
                newRecords.push(stateRecords.shift());
                continue;
            }
            if (recordsToAdd[0].timestamp === stateRecords[0].timestamp) {
                newRecords.push(recordsToAdd.shift());
                stateRecords.shift();
            }
        }

        return newRecords;
    };

    loadRecords = async (position) => {
        let minTimestamp, maxTimestamp;
        if (position === 'before') {
            minTimestamp = this.maxTimestamp;
            maxTimestamp = this.nextMaxTimestamp;
        } else if (position === 'after') {
            minTimestamp = this.nextMinTimestamp;
            maxTimestamp = this.minTimestamp;
        } else {
            minTimestamp = this.nextMinTimestamp;
            maxTimestamp = this.nextMaxTimestamp;
        }

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

        records = this._fillWithEmptyRecords(records, minTimestamp, maxTimestamp);
        records = this._mergeStateRecords(records);

        this.setState({
            records,
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

        const records = this._mergeStateRecords([newRecord]);

        this.setState({
            records,
        });
    };

    get isCalendarView() {
        return [
            this.views.DAY,
            this.views.WEEK,
            this.views.MONTH,
        ].includes(this.state.view);
    }
    get isLoaded() {
        if (!this.state.records.length) {
            return false;
        }
        const minTimestamp = this.state.records[this.state.records.length - 1].timestamp;
        const maxTimestamp = this.state.records[0].timestamp;
        return dateUtils.isFirstDayOf(minTimestamp, this.state.view) && dateUtils.isLastDayOf(maxTimestamp, this.state.view);
    }
    get statusForStateTimestamp() {
        if (!this.state.isShowingEditor) {
            return null;
        }
        const record = this.state.records.find((record) => record.timestamp === this.state.timestamp);
        if (!record) {
            return null;
        }
        return record.status;
    }
    get maxTimestamp() {
        return this.state.records.length ? this.state.records[0].timestamp : this.state.timestamp;
    }
    get minTimestamp() {
        return this.state.records.length ? this.state.records[this.state.records.length - 1].timestamp : this.state.timestamp;
    }
    get nextMaxTimestamp() {
        let timestamp = this.state.records.length ? this.state.records[0].timestamp : this.state.timestamp;
        timestamp = dateUtils.incrementTimestamp(timestamp, 1, this.state.view);
        if (this.isCalendarView) {
            while (!dateUtils.isLastDayOf(timestamp, this.state.view)) {
                timestamp = dateUtils.incrementTimestamp(timestamp, 1, dateUtils.DAY);
            }
        }
        return timestamp;
    }
    get nextMinTimestamp() {
        let timestamp = this.state.records.length ? this.state.records[this.state.records.length - 1].timestamp : this.state.timestamp;
        timestamp = dateUtils.incrementTimestamp(timestamp, -1, this.state.view);
        if (this.isCalendarView) {
            while (!dateUtils.isFirstDayOf(timestamp, this.state.view)) {
                timestamp = dateUtils.incrementTimestamp(timestamp, -1, dateUtils.DAY);
            }
        }
        return timestamp;
    }

    render() {
        return (
            <>
                <Nav
                    initialValue={this.state.view}
                    selectOptions={[
                        { value: this.views.DAY, label: 'Day' },
                        { value: this.views.WEEK, label: 'Week' },
                        { value: this.views.MONTH, label: 'Month' },
                    ]}
                    iconOptions={[
                        { value: this.views.SETTINGS, Icon: FaUserCog },
                    ]}
                    onChange={this.changeView}
                />

                {this.state.view === this.views.DAY && this.isLoaded && (
                    <Days
                        timestamp={this.state.timestamp}
                        records={this.state.records}
                        onChange={this.changeTimestamp}
                        onSelect={this.openEditor}
                        onLoadNeeded={this.loadRecords}
                    />
                )}
                {this.state.view === this.views.WEEK && this.isLoaded &&  (
                    <Weeks
                        timestamp={this.state.timestamp}
                        records={this.state.records}
                        onChange={this.changeTimestamp}
                        onSelect={this.openEditor}
                        onLoadNeeded={this.loadRecords}
                    />
                )}
                {this.state.view === this.views.MONTH && this.isLoaded &&  (
                    <Months
                        timestamp={this.state.timestamp}
                        records={this.state.records}
                        onChange={this.changeTimestamp}
                        onSelect={this.openEditor}
                        onLoadNeeded={this.loadRecords}
                    />
                )}
                {this.state.view === this.views.SETTINGS && (
                    <Settings
                    />
                )}

                <AnimateHeight animateOpacity height={this.state.isShowingEditor ? 'auto' : 0}>
                    <Editor
                        timestamp={this.state.timestamp}
                        status={this.statusForStateTimestamp}
                        onSubmit={this.saveRecord}
                        onHide={this.hideEditor}
                    />
                </AnimateHeight>
            </>
        );
    }
}

export default App;
