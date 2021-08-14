export function splittedNumber(input: number): string {
    return input
        .toLocaleString('en-us', {maximumFractionDigits: 10})
        .replace(new RegExp(',', 'g'), ' ')
        .replace('.', '. ');
}
