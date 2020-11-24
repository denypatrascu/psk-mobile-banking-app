import { r as registerInstance, h, g as getElement } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { B as BindModel } from './BindModel-524e1a2c.js';
import { C as CustomTheme } from './CustomTheme-f57ed858.js';
import { T as TableOfContentProperty } from './TableOfContentProperty-de8188be.js';
import { P as PskButtonEvent } from './PskButtonEvent-128aba69.js';

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
const ACCEPTED_DEFAULT_DISPATCHERS = [document, window];
const PskSwitchButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.closed = false;
    }
    clickHandler(evt) {
        this.closed = !this.closed;
        if (this.toggleEvent) {
            evt.preventDefault();
            evt.stopImmediatePropagation();
            let pskButtonEvent = new PskButtonEvent(this.toggleEvent, {
                "selected": this.closed ? this.inactive : this.active,
                "active": this.active,
                "inactive": this.inactive
            }, {
                bubbles: true,
                composed: true,
                cancelable: true
            });
            let eventDispatcherElement = this.htmlElement;
            if (this.eventDispatcher) {
                if (ACCEPTED_DEFAULT_DISPATCHERS.indexOf(window[this.eventDispatcher]) !== -1) {
                    eventDispatcherElement = window[this.eventDispatcher];
                }
            }
            eventDispatcherElement.dispatchEvent(pskButtonEvent);
        }
    }
    render() {
        let switchButton = h("div", { class: "status-container" }, h("h5", null, this.title), h("psk-hoc", { class: "two-options-container", onClick: this.clickHandler.bind(this) }, h("div", { class: "row" }, h("div", { class: `switch-item col-xs-6 col-sm-6 col-md-6 col-lg-6 ${this.closed ? "" : "selected"}` }, h("p", null, this.active)), h("div", { class: `switch-item col-xs-6 col-sm-6 col-md-6 col-lg-6 ${this.closed ? "selected" : ""}` }, h("p", null, this.inactive)))));
        return switchButton;
    }
    get htmlElement() { return getElement(this); }
};
__decorate([
    BindModel()
], PskSwitchButton.prototype, "modelHandler", void 0);
__decorate([
    CustomTheme()
], PskSwitchButton.prototype, "htmlElement", void 0);
__decorate([
    TableOfContentProperty({
        description: ['This attribute is the active part of the component the one that will show the content when the switch button is on.'],
        isMandatory: true,
        propertyType: 'string',
        defaultValue: null
    })
], PskSwitchButton.prototype, "active", void 0);
__decorate([
    TableOfContentProperty({
        description: 'This attribute is the inactive part of the component(this is the default value for the switch-button) the one that tells the user that the switch button is off.',
        isMandatory: true,
        propertyType: 'string',
        defaultValue: null
    })
], PskSwitchButton.prototype, "inactive", void 0);
__decorate([
    TableOfContentProperty({
        description: ['This attribute is telling the component where to trigger the event. Accepted values: "document, "window".',
            'If the value is not set or it is not one of the accepted values, the eventDispatcher will be the component itself.'],
        isMandatory: false,
        propertyType: 'string'
    })
], PskSwitchButton.prototype, "eventDispatcher", void 0);
__decorate([
    TableOfContentProperty({
        description: ['By defining this attribute, the component will be able to trigger an event. The name of the event is the value of the attribute.'],
        isMandatory: false,
        propertyType: 'string'
    })
], PskSwitchButton.prototype, "toggleEvent", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property is the title, that will be be shown above the switch button for better understanding. `,
        isMandatory: false,
        propertyType: `string`
    })
], PskSwitchButton.prototype, "title", void 0);

export { PskSwitchButton as psk_switch_button };
