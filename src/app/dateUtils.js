export const MS_IN_1_DAY = 8.64e+7;

const _isDateTimestamp = (timestamp) => timestamp.toString().length === 5;
export const timestamp2dateTimestamp = (timestamp) => ~~(timestamp / MS_IN_1_DAY);
export const dateTimestamp2timestamp = (dateTimestamp) => dateTimestamp * MS_IN_1_DAY;

const _incrementTimestamp = (timestamp, incrementValue, incrementPeriod) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth();

    switch (incrementPeriod) {
        case 'day':
            date.setDate(day + incrementValue);
            break;
        case 'week':
            date.setDate(day + incrementValue * 7);
            break;
        case 'month':
            date.setMonth(month + incrementValue);
            break;
    }

    return date.getTime();
};
export const incrementTimestamp = (timestamp, incrementValue, incrementPeriod) => {
    const srcTimestamp = _isDateTimestamp(timestamp) ? dateTimestamp2timestamp(timestamp) : timestamp;

    const incrementedTimestamp = _incrementTimestamp(srcTimestamp, incrementValue, incrementPeriod);

    return _isDateTimestamp(timestamp) ? timestamp2dateTimestamp(incrementedTimestamp) : incrementedTimestamp;
};
