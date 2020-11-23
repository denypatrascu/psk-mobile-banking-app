import './psk-style.utils-46a368b3.js';

function generateRule(selector, properties) {
    let styles = `${selector} {\n`;
    for (const property in properties) {
        styles += `\t${property}: ${properties[property]};\n`;
    }
    styles += '}';
    return styles;
}

export { generateRule as g };
