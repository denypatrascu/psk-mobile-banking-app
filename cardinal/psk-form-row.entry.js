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
const PskFormRow = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.componentSlot = "";
        this.columns = 1;
        this.layout = null;
    }
    componentWillLoad() {
        this.columns = this.__host.children.length;
        Array.from(this.__host.children).forEach((el) => {
            if (el.tagName.toLowerCase() === 'style') {
                this.columns--;
            }
        });
        this.componentSlot = this.__host.innerHTML;
        let styleElement = this.__host.querySelector("style");
        if (styleElement) {
            this.__host.innerHTML = styleElement.outerHTML;
            this.componentSlot = this.componentSlot.replace(styleElement.outerHTML, "");
        }
        else {
            this.__host.innerHTML = "";
        }
    }
    render() {
        return h("psk-grid", { innerHTML: this.componentSlot, columns: this.columns, layout: this.layout });
    }
    get __host() { return getElement(this); }
};
__decorate([
    CustomTheme()
], PskFormRow.prototype, "__host", void 0);
__decorate([
    TableOfContentProperty({
        isMandatory: true,
        propertyType: 'string',
        description: ['This attribute will set the layout for the components inside the grid, according to the number of columns.',
            `Example: <psk-grid columns="3" layout="xs=[12,12,12] s=[6,6,12] m=[3,3,6] l=[3,4,5]" xl=[3,4,5]>`,
            `There are 5 possible breakpoints, according to Bootstrap documentation: xs, s, m, l and xl. For each breakpoint you want to use, the number of the values must be the same with the number of the columns, otherwise, the breakpoint will be ignored.`,
            `Each breakpoint will be written in the following manner: breakpoint=[value1, value2,... valueN], where N is the number of columns and the value accepts numbers between 0 and 12 included, or the string "auto".`,
            `If a value is 0, then the element for that column will be hidden. If a value is auto, it will have no bootstrap class and will inherit the design.`,
            `If any other value is set, the breakpoint will be ignored even if it has the same number of columns.`],
        defaultValue: 'null'
    })
], PskFormRow.prototype, "layout", void 0);

export { PskFormRow as psk_form_row };
