const PREFIX_REGEXP = /^((?:x|data)[\:\-_])/i;
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

export function camelCase(name: string): string {
    return name.replace(SPECIAL_CHARS_REGEXP, (_, separator, letter, offset) => {
        return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
}

export function directiveNormalize(name: string): string {
    return camelCase(name.replace(PREFIX_REGEXP, ''));
}

export function binaryToHexadecimal(binaryString: string): string {
    let hexadecimal = '';
    for (let i = 0; i < binaryString.length; ++i) {
        const byte = binaryString.charCodeAt(i);
        let byteHexadecimal = byte.toString(16);
        if (byteHexadecimal.length < 2) {
            byteHexadecimal = '0' + byteHexadecimal;
        }
        hexadecimal += byteHexadecimal;
    }
    return hexadecimal;
}

