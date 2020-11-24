import { r as registerInstance, h, g as getElement } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { B as BindModel } from './BindModel-524e1a2c.js';
import { C as CustomTheme } from './CustomTheme-f57ed858.js';
import { T as TableOfContentProperty } from './TableOfContentProperty-de8188be.js';
import './PskButtonEvent-128aba69.js';
import { d as dispatchEvent } from './index-518194d0.js';

const pskButtonLinkCss = ":host(.footer-item)>*,:host(.footer-item) psk-icon .icon{margin:0;padding:0}";

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
const PskButtonLink = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    handleClick() {
        dispatchEvent(this.__host, {
            eventName: this.eventName,
            eventData: this.eventData,
            eventDispatcher: this.eventDispatcher
        });
    }
    render() {
        const className = { 'button-link': true };
        if (this.__host.className) {
            className[this.__host.className] = true;
        }
        return (h("psk-link", { page: this.page, class: className, onClick: this.handleClick.bind(this) }, this.icon ? h("psk-icon", { icon: this.icon }) : null, this.name ? h("div", null, this.name) : h("slot", null)));
    }
    get __host() { return getElement(this); }
};
__decorate([
    CustomTheme(),
    BindModel()
], PskButtonLink.prototype, "modelHandler", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property is passed to psk-link.`,
        isMandatory: false,
        propertyType: `string`
    })
], PskButtonLink.prototype, "page", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `This property is the label for this component.`,
            `If this property is not specified, you must provide a slot as content for the label of this component`
        ],
        isMandatory: false,
        propertyType: `string`
    })
], PskButtonLink.prototype, "name", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property describes the icon specified for psk-icon.`,
        isMandatory: false,
        propertyType: `string`
    })
], PskButtonLink.prototype, "icon", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `By defining this attribute, the component will be able to trigger an event.`
        ],
        isMandatory: false,
        propertyType: 'string'
    })
], PskButtonLink.prototype, "eventName", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `This attribute is used to pass some information along with an event.`,
            `This attribute is taken into consideration only if the event-name has a value. If not, it is ignored.`
        ],
        isMandatory: false,
        propertyType: 'any'
    })
], PskButtonLink.prototype, "eventData", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `This attribute is telling the component where to trigger the event. Accepted values: "document, "window".`,
            `If the value is not set or it is not one of the accepted values, the event-dispatcher will be the component itself.`
        ],
        isMandatory: false,
        propertyType: 'string'
    })
], PskButtonLink.prototype, "eventDispatcher", void 0);
PskButtonLink.style = pskButtonLinkCss;

export { PskButtonLink as psk_button_link };
