import { r as registerInstance, h, i as Host, g as getElement } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { C as CustomTheme } from './CustomTheme-f57ed858.js';
import { T as TableOfContentProperty } from './TableOfContentProperty-de8188be.js';

const pskAccordionDefaultCss = ":host{background-color:#FFFFFF;box-shadow:0 0 5px rgba(0, 0, 0, .25)}:host{display:block;padding:1em 1em 0.15em 1em;border-radius:4px}";

const pskAccordionLayoutCss = "";

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
const PskAccordion = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.multiple = false;
        this.layout = 'default';
    }
    componentWillLoad() {
        this.layout = this.__getAccordionItemLayout();
        const items = this.__host.children;
        for (let i = 0; i < items.length; i++) {
            items[i].setAttribute('layout', this.layout);
            items[i].addEventListener('psk-accordion-item:toggle', e => this.__toggleAccordionItem(e, i));
        }
    }
    __getAccordionItemLayout() {
        switch (this.layout) {
            default:
                return 'default';
        }
    }
    __getAccordionItemStatus(item) {
        if (!item.hasAttribute('opened'))
            return false;
        const opened = item.getAttribute('opened');
        return ['opened', 'true', ''].includes(opened);
    }
    __toggleAccordionItem(e, index) {
        e.stopImmediatePropagation();
        const items = this.__host.children;
        if (this.multiple === false) {
            for (let i = 0; i < items.length; i++) {
                if (i === index)
                    continue;
                items[i].removeAttribute('opened');
            }
        }
        const item = items[index];
        if (this.__getAccordionItemStatus(item)) {
            item.removeAttribute('opened');
        }
        else {
            item.setAttribute('opened', 'opened');
        }
    }
    render() {
        return (h(Host, null, h("slot", null)));
    }
    get __host() { return getElement(this); }
};
__decorate([
    CustomTheme()
], PskAccordion.prototype, "__host", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property decides if you can toggle more then one item of the accordion.`,
        isMandatory: false,
        propertyType: `boolean`,
        defaultValue: `false`
    })
], PskAccordion.prototype, "multiple", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `There is one alternative for this attribute: "default". If other value is passed, fallback plan is also the default value.`,
            `According to this property, the appearance of the component items are changing.`,
            `Future layouts will be developed soon.`
        ],
        isMandatory: false,
        propertyType: `string`,
        defaultValue: `default`
    })
], PskAccordion.prototype, "layout", void 0);
PskAccordion.style = {
    default: pskAccordionDefaultCss,
    layout: pskAccordionLayoutCss
};

export { PskAccordion as psk_accordion };
