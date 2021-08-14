export function dateFieldsToString(input: any, format: string, fields: any, recursive = false): void {
    if (typeof input === 'object') {
        for (const key in input) {
            if (input.hasOwnProperty(key) && key.indexOf('$') !== 0) {
                if (input[key] instanceof Date && (!fields || fields.indexOf(key) !== -1)) {
                    input[key] = input[key].toString(format);
                } else if (recursive && typeof input[key] === 'object') {
                    dateFieldsToString(input[key], format, fields);
                }
            }
        }
    }
}

const regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})([\-+])(\d{2}):?(\d{2}))?)?)?$/;
const html5Format = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?$/;
const dateFormat = /^(\d{4})-(\d{2})-(\d{2})$/;

export function dateParse(date: string): number {
    const timestamp = Date.parse(date);
    if (!isNaN(timestamp)) {
        return timestamp;
    } else {
        return Date.parse(
            date.replace(/-/g, '/').replace(/[a-z]+/gi, ' ')
        );
    }
}

export function convertStringToDate(input: any): any {
    if (typeof input !== 'object') {
        return input;
    }
    for (const key in input) {
        if (!input.hasOwnProperty(key)) {
            continue;
        }
        const value = input[key];
        let match;
        // Date only in full format "match[9]"
        if (typeof value === 'string' && ((match = value.match(regexIso8601)) && match[9] || (match = value.match(html5Format)) && match[6])) {
            const milliseconds = dateParse(match[0]);
            if (!isNaN(milliseconds)) {
                input[key] = new Date(milliseconds);
            }
        } else if (typeof value === 'string' && (match = value.match(dateFormat)) && match[3]) {
            const milliseconds = dateParse(match[0]);
            if (!isNaN(milliseconds)) {
                const date = new Date(milliseconds);
                input[key] = date;
            }
        } else if (typeof value === 'object') {
            convertStringToDate(value);
        }
    }
}

export function getGmtOffset(): number {
    let timezoneOffsetMinutes = (new Date()).getTimezoneOffset();
    timezoneOffsetMinutes = timezoneOffsetMinutes * 60;
    return -timezoneOffsetMinutes;
}

export function isDaylightSavingTime(): boolean {
    const date = new Date();
    const date1 = new Date(date.getFullYear(), 0, 1);
    const date2 = new Date(date.getFullYear(), 6, 1);
    const standardTimezoneOffset = Math.max(date1.getTimezoneOffset(), date2.getTimezoneOffset());
    return date.getTimezoneOffset() < standardTimezoneOffset;
}
