export function splittedNumber(number: number): string {
    return number
        .toLocaleString('en-us', {maximumFractionDigits: 10})
        .replace(new RegExp(',', 'g'), ' ')
        .replace('.', '. ');
}
