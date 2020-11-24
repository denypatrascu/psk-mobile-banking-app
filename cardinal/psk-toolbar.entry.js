import { r as registerInstance, h, g as getElement } from './index-bb32d9fe.js';
import { A as ACTIONS_ICONS } from './constants-507b64b1.js';
import { c as createCustomEvent } from './utilFunctions-74de6735.js';
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
const PskToolbar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.icons = false;
    }
    render() {
        if (!this.actions)
            return null;
        return this.actions
            .split(',')
            .map(e => e.trim())
            .map(action => {
            let index = 0;
            while (index < this.host.children.length) {
                let child = this.host.children.item(index++);
                if (child.hasAttribute('slot')
                    && child.getAttribute('slot') === action) {
                    return h("slot", { name: action });
                }
            }
            return this.icons && ACTIONS_ICONS.hasOwnProperty(action)
                ? h("psk-icon", { icon: ACTIONS_ICONS[action].value, title: ACTIONS_ICONS[action].value, color: ACTIONS_ICONS[action].color, onClick: (evt) => { this.handleClick(evt, action); } })
                : h("button", { class: "btn btn-primary", name: action.toUpperCase(), onClick: (evt) => { this.handleClick(evt, action); } }, action.toUpperCase());
        });
    }
    handleClick(evt, action) {
        let evData = null;
        try {
            evData = JSON.parse(this.eventData);
        }
        catch (e) { }
        evt.preventDefault();
        evt.stopImmediatePropagation();
        createCustomEvent(action, {
            bubbles: true,
            composed: true,
            cancelable: true,
            detail: evData
        }, true);
    }
    get host() { return getElement(this); }
};
__decorate([
    CustomTheme(),
    TableOfContentProperty({
        description: [`This property is a string where every action is delimitated by \',\'.`,
            `If an HTML child has a slot attribute with the same value as the entry in the string then a new slot will be created with that value as the name.`],
        isMandatory: true,
        defaultValue: `null`,
        propertyType: `string`
    })
], PskToolbar.prototype, "actions", void 0);
__decorate([
    TableOfContentProperty({
        description: [`This property is the icon attached to the toolbar action so it can be rendered .`,
            `If this property is not given then the value false will be assumed and instead of a psk-icon, a button will be rendered.`],
        propertyType: `boolean`,
        isMandatory: false,
        defaultValue: `false`
    })
], PskToolbar.prototype, "icons", void 0);
__decorate([
    TableOfContentProperty({
        description: [`This property is the data that will be passed to the newly created event in the detail property.`,
            `It will only be passed along when an icon/button inside the toolbar is clicked.`],
        propertyType: `string`,
        isMandatory: false,
        defaultValue: `null`
    })
], PskToolbar.prototype, "eventData", void 0);

export { PskToolbar as psk_toolbar };
