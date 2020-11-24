import { r as registerInstance, h, g as getElement } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { C as CustomTheme } from './CustomTheme-f57ed858.js';
import { T as TableOfContentProperty } from './TableOfContentProperty-de8188be.js';

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const PskTable = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.cellsWidth = '';
        this.tableContent = null;
    }
    render() {
        return (h("div", { class: "table-responsive" }, h("table", { class: "table" }, this.tableContent)));
    }
    componentWillLoad() {
        let widthValues = [];
        if (this.cellsWidth.length > 0) {
            widthValues = this.cellsWidth.split(',');
        }
        widthValues = widthValues.map(value => parseInt(value));
        let tableRows = this.element.innerHTML
            .split(/\n/g)
            .map(el => el.trim().replace('<!---->', ''))
            .filter(el => el.length > 0)
            .map((line, index) => {
            let widthIndex = -1;
            let tableRow = line
                .split('|')
                .map(el => {
                widthIndex++;
                if (this.header && index === 0) {
                    return `<th style=width:${widthValues.length > widthIndex ? `${widthValues[widthIndex]}%;` : 'auto'}>${el.trim()}</th>`;
                }
                else {
                    return `<td style=width:${widthValues.length >= widthIndex ? `${widthValues[widthIndex]}%;` : 'auto'}>${el.trim()}</td>`;
                }
            }).join('');
            return `<tr style=width:100%;>${tableRow}</tr>`;
        });
        let finalTableRows = [];
        if (this.header) {
            finalTableRows.push(this._stringArrayToHTMLElement('thead', tableRows.splice(0, 1)));
            if (this.footer) {
                finalTableRows.push(this._stringArrayToHTMLElement('tbody', tableRows.splice(0, tableRows.length - 1)));
                finalTableRows.push(this._stringArrayToHTMLElement('tfoot', [tableRows[tableRows.length - 1]]));
            }
            else {
                finalTableRows.push(this._stringArrayToHTMLElement('tbody', tableRows.splice(0)));
            }
        }
        else {
            finalTableRows = [this._stringArrayToHTMLElement('tbody', tableRows)];
        }
        this.tableContent = finalTableRows;
        this.element.innerHTML = '';
    }
    _stringArrayToHTMLElement(tag, html) {
        const HTMLTag = tag;
        return h(HTMLTag, { innerHTML: html.join('') });
    }
    get element() { return getElement(this); }
};
__decorate([
    CustomTheme(),
    TableOfContentProperty({
        description: `If this property is set to true then the first row of the given content will be shown as a table header.`,
        isMandatory: false,
        propertyType: `boolean`
    })
], PskTable.prototype, "header", void 0);
__decorate([
    TableOfContentProperty({
        description: `If this property is set to true then the last row of the given content will be shown as a table footer.`,
        isMandatory: false,
        propertyType: `boolean`
    })
], PskTable.prototype, "footer", void 0);

export { PskTable as psk_table };
