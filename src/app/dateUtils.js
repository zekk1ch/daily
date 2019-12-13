export const DAY = 'day';
export const WEEK = 'week';
export const MONTH = 'month';
const _MS_IN_1_DAY = 8.64e+7;

function _isDateTimestamp(timestamp) {
    return timestamp.toString().length === 5;
}
export function timestamp2dateTimestamp(timestamp) {
    return Math.round(timestamp / _MS_IN_1_DAY);
}
export function dateTimestamp2timestamp(dateTimestamp) {
    return dateTimestamp * _MS_IN_1_DAY;
}

function _incrementTimestamp(timestamp, incrementValue, incrementPeriod) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth();

    switch (incrementPeriod) {
        case DAY:
            date.setDate(day + incrementValue);
            break;
        case WEEK:
            date.setDate(day + incrementValue * 7);
            break;
        case MONTH:
            date.setMonth(month + incrementValue);
            break;
    }

    return date.getTime();
}
export function incrementTimestamp(timestamp, incrementValue, incrementPeriod) {
    const srcTimestamp = _isDateTimestamp(timestamp) ? dateTimestamp2timestamp(timestamp) : timestamp;
    const resTimestamp = _incrementTimestamp(srcTimestamp, incrementValue, incrementPeriod);
    return _isDateTimestamp(timestamp) ? timestamp2dateTimestamp(resTimestamp) : resTimestamp;
}

function _isEdgeOf(timestamp, period, isStartEdge) {
    const date = new Date(timestamp);

    switch (period) {
        case DAY:
            return true;
        case WEEK:
            const weekDayIndex = date.getDay();
            return isStartEdge ? weekDayIndex === 1 : weekDayIndex === 0;
        case MONTH:
            const monthDayIndex = date.getDate();
            const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
            return isStartEdge ? monthDayIndex === 1 : monthDayIndex === daysInMonth;
        default:
            throw new Error(`Invalid period "${period}"`);
    }
}
export function isFirstDayOf(timestamp, period) {
    const srcTimestamp = _isDateTimestamp(timestamp) ? dateTimestamp2timestamp(timestamp) : timestamp;
    return _isEdgeOf(srcTimestamp, period, true);
}
export function isLastDayOf(timestamp, period) {
    const srcTimestamp = _isDateTimestamp(timestamp) ? dateTimestamp2timestamp(timestamp) : timestamp;
    return _isEdgeOf(srcTimestamp, period, false);
}
export function isFirstDayOfWeek(timestamp) {
    const srcTimestamp = _isDateTimestamp(timestamp) ? dateTimestamp2timestamp(timestamp) : timestamp;
    return _isEdgeOf(srcTimestamp, WEEK, true);
}
export function isLastDayOfWeek(timestamp) {
    const srcTimestamp = _isDateTimestamp(timestamp) ? dateTimestamp2timestamp(timestamp) : timestamp;
    return _isEdgeOf(srcTimestamp, WEEK, false);
}
export function isFirstDayOfMonth(timestamp) {
    const srcTimestamp = _isDateTimestamp(timestamp) ? dateTimestamp2timestamp(timestamp) : timestamp;
    return _isEdgeOf(srcTimestamp, MONTH, true);
}
export function isLastDayOfMonth(timestamp) {
    const srcTimestamp = _isDateTimestamp(timestamp) ? dateTimestamp2timestamp(timestamp) : timestamp;
    return _isEdgeOf(srcTimestamp, MONTH, false);
}
