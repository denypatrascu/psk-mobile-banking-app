import { r as registerInstance, h, i as Host, g as getElement } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { C as CustomTheme } from './CustomTheme-f57ed858.js';
import { T as TableOfContentProperty } from './TableOfContentProperty-de8188be.js';

const pskAccordionItemDefaultCss = ":host{display:block}:host .title{display:flex;align-items:center;outline:none;cursor:pointer;border:2px solid transparent;background-color:transparent}:host .content{transform-origin:top;transition-duration:0.3s;transition-property:transform, padding, height, opacity;transition-timing-function:ease-in}:host .content,:host([opened='false']) .content{overflow:hidden;height:0;opacity:0;padding-top:0;padding-bottom:0;transform:translateY(-0.15em)}:host([opened]) .content,:host([opened='true']) .content{height:100%;opacity:1;padding-top:0.75em;padding-bottom:0.5em;transform:translateY(0)}:host([layout='default']) .title{border-radius:5px}:host([layout='default'][opened]) .title,:host([layout='default'][opened='true']) .title{border-bottom-right-radius:0;border-bottom-left-radius:0}:host([layout='default']) .title .icon{padding:0.45em 0.25em;transition:transform 0.2s ease-in-out}:host([layout='default']) .title .rotated .icon{transform:rotate(90deg)}:host([layout='default']) .content{border:2px solid transparent;border-top:none;border-bottom-left-radius:5px;border-bottom-right-radius:5px;margin-bottom:1em;padding-left:0.5em;padding-right:0.5em}:host .title .icon,:host .title span{color:#5E7FE2}:host .title:hover{background-color:#5E7FE225}:host([layout='default']) .title:focus{border-color:#5E7FE2}:host([layout='default'][opened]) .title,:host([layout='default'][opened='true']) .title{background-color:#5E7FE225}:host([layout='default']) .content{border-color:#5E7FE225}";

const pskAccordionItemLayoutCss = ":host{display:block}:host .title{display:flex;align-items:center;outline:none;cursor:pointer;border:2px solid transparent;background-color:transparent}:host .content{transform-origin:top;transition-duration:0.3s;transition-property:transform, padding, height, opacity;transition-timing-function:ease-in}:host .content,:host([opened='false']) .content{overflow:hidden;height:0;opacity:0;padding-top:0;padding-bottom:0;transform:translateY(-0.15em)}:host([opened]) .content,:host([opened='true']) .content{height:100%;opacity:1;padding-top:0.75em;padding-bottom:0.5em;transform:translateY(0)}:host([layout='default']) .title{border-radius:5px}:host([layout='default'][opened]) .title,:host([layout='default'][opened='true']) .title{border-bottom-right-radius:0;border-bottom-left-radius:0}:host([layout='default']) .title .icon{padding:0.45em 0.25em;transition:transform 0.2s ease-in-out}:host([layout='default']) .title .rotated .icon{transform:rotate(90deg)}:host([layout='default']) .content{border:2px solid transparent;border-top:none;border-bottom-left-radius:5px;border-bottom-right-radius:5px;margin-bottom:1em;padding-left:0.5em;padding-right:0.5em}";

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
const PskAccordionItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.title = '';
        this.opened = false;
        this.layout = 'default';
    }
    toggleAccordionItem(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.__host.dispatchEvent(new Event('psk-accordion-item:toggle'));
    }
    render() {
        return h(Host, { opened: this.opened }, h("div", { class: 'title', tabindex: 0, onClick: e => this.toggleAccordionItem(e) }, h("psk-icon", { icon: 'chevron-right', class: { 'rotated': this.opened } }), h("span", null, this.title)), h("div", { class: 'content' }, h("slot", null)));
    }
    get __host() { return getElement(this); }
};
__decorate([
    CustomTheme()
], PskAccordionItem.prototype, "__host", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property is used as title or summary for collapsable section.`,
        isMandatory: true,
        propertyType: `string`
    })
], PskAccordionItem.prototype, "title", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property decides if the content of the component is visible / hidden.`,
        isMandatory: false,
        propertyType: `boolean`,
        defaultValue: `false`
    })
], PskAccordionItem.prototype, "opened", void 0);
PskAccordionItem.style = {
    default: pskAccordionItemDefaultCss,
    layout: pskAccordionItemLayoutCss
};

export { PskAccordionItem as psk_accordion_item };
