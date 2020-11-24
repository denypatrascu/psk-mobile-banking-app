import { r as registerInstance, h, i as Host, g as getElement } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { C as CustomTheme } from './CustomTheme-f57ed858.js';
import { T as TableOfContentProperty } from './TableOfContentProperty-de8188be.js';
import './PskButtonEvent-128aba69.js';
import { d as dispatchEvent } from './index-518194d0.js';

const pskDetailsDefaultCss = ":host{display:block}:host .title{display:flex;align-items:center;outline:none;cursor:pointer;border:2px solid transparent;background-color:transparent}:host .content{transform-origin:top;transition-duration:0.3s;transition-property:transform, padding, height, opacity;transition-timing-function:ease-in}:host .content,:host([opened='false']) .content{overflow:hidden;height:0;opacity:0;padding-top:0;padding-bottom:0;transform:translateY(-0.15em)}:host([opened]) .content,:host([opened='true']) .content{height:100%;opacity:1;padding-top:0.75em;padding-bottom:0.5em;transform:translateY(0)}:host([layout='default']) .title{border-radius:5px}:host([layout='default']) .title .icon{padding:0.45em 0.25em;transition:transform 0.2s ease-in-out}:host([layout='default']) .title .rotated .icon{transform:rotate(90deg)}:host([layout='collapsable']){overflow:hidden;border-radius:4px;transition:box-shadow 0.2s ease-in-out}:host([layout='collapsable']) .title{padding:0.65em}:host([layout='collapsable']) .content{padding-left:1em;padding-right:1em}:host([layout='collapsable']) .footer{text-align:center;cursor:pointer}:host([layout='collapsable']) .footer:focus{outline:none}:host([layout='collapsable']) .footer .icon{padding:0;font-size:75%;transition:transform 0.2s ease-in-out}:host([layout='collapsable']) .footer .rotated .icon{transform:rotate(180deg)}:host([layout='plus']){overflow:hidden;border-radius:4px;transition:box-shadow 0.2s ease-in-out}:host([layout='plus']) .content{padding-left:1em;padding-right:1em}:host([layout='plus']) .footer{text-align:center;cursor:pointer}:host([layout='plus']) .footer:focus{outline:none;border:2px solid transparent}:host([layout='plus']) .footer .icon{padding:0;font-size:75%;transition:transform 0.2s ease-in-out}:host([layout='plus']) .footer .rotated .icon{transform:rotate(180deg)}:host .title .icon,:host .title span{color:#5E7FE2}:host .title:hover{background-color:#5E7FE225}:host([layout='default']) .title:focus,:host([layout='default'][opened]) .title,:host([layout='default'][opened='true']) .title{border-color:#5E7FE2}:host([layout='collapsable'][opened]),:host([layout='collapsable'][opened='true']){box-shadow:0 0 5px rgba(0, 0, 0, .25)}:host([layout='collapsable']) .title{background-color:#5E7FE225}:host([layout='collapsable']) .title:focus{border-color:#5E7FE2}:host([layout='collapsable']) .content{background-color:#FFFFFF}:host([layout='collapsable']) .footer{background-color:#5E7FE2}:host([layout='collapsable']) .footer .icon{color:#FFFFFF}:host([layout='plus'][opened]),:host([layout='plus'][opened='true']){box-shadow:0 0 5px rgba(0, 0, 0, .25)}:host([layout='plus']) .content{background-color:#FFFFFF}:host([layout='plus']) .footer{background-color:#5E7FE225}:host([layout='plus']) .footer:focus{border-color:#5E7FE2}:host([layout='plus']) .footer .icon{color:#333333}";

const pskDetailsLayoutCss = ":host{display:block}:host .title{display:flex;align-items:center;outline:none;cursor:pointer;border:2px solid transparent;background-color:transparent}:host .content{transform-origin:top;transition-duration:0.3s;transition-property:transform, padding, height, opacity;transition-timing-function:ease-in}:host .content,:host([opened='false']) .content{overflow:hidden;height:0;opacity:0;padding-top:0;padding-bottom:0;transform:translateY(-0.15em)}:host([opened]) .content,:host([opened='true']) .content{height:100%;opacity:1;padding-top:0.75em;padding-bottom:0.5em;transform:translateY(0)}:host([layout='default']) .title{border-radius:5px}:host([layout='default']) .title .icon{padding:0.45em 0.25em;transition:transform 0.2s ease-in-out}:host([layout='default']) .title .rotated .icon{transform:rotate(90deg)}:host([layout='collapsable']){overflow:hidden;border-radius:4px;transition:box-shadow 0.2s ease-in-out}:host([layout='collapsable']) .title{padding:0.65em}:host([layout='collapsable']) .content{padding-left:1em;padding-right:1em}:host([layout='collapsable']) .footer{text-align:center;cursor:pointer}:host([layout='collapsable']) .footer:focus{outline:none}:host([layout='collapsable']) .footer .icon{padding:0;font-size:75%;transition:transform 0.2s ease-in-out}:host([layout='collapsable']) .footer .rotated .icon{transform:rotate(180deg)}:host([layout='plus']){overflow:hidden;border-radius:4px;transition:box-shadow 0.2s ease-in-out}:host([layout='plus']) .content{padding-left:1em;padding-right:1em}:host([layout='plus']) .footer{text-align:center;cursor:pointer}:host([layout='plus']) .footer:focus{outline:none;border:2px solid transparent}:host([layout='plus']) .footer .icon{padding:0;font-size:75%;transition:transform 0.2s ease-in-out}:host([layout='plus']) .footer .rotated .icon{transform:rotate(180deg)}";

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
const PskDetails = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.title = '';
        this.opened = false;
        this.layout = 'default';
    }
    toggleDetails(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.opened = !this.opened;
        dispatchEvent(this.__host, {
            eventName: this.eventName,
            eventData: this.eventData,
            eventDispatcher: this.eventDispatcher
        });
    }
    __renderDetails() {
        switch (this.layout) {
            case 'collapsable':
                {
                    let result = [];
                    if (this.title)
                        result.push(h("div", { class: 'title', tabindex: 0, onClick: e => this.toggleDetails(e) }, h("span", null, this.title)));
                    result.push(h("div", { class: 'content' }, h("slot", null)), h("div", { class: 'footer', tabindex: 0, onClick: e => this.toggleDetails(e) }, h("slot", { name: 'footer' }), h("div", null, h("psk-icon", { icon: 'chevron-down', class: { 'rotated': this.opened } }))));
                    return result;
                }
            case 'plus':
                return [
                    h("div", { class: 'content' }, h("slot", null)),
                    h("div", { class: 'footer', tabindex: 0, onClick: e => this.toggleDetails(e) }, h("psk-icon", { icon: this.opened ? 'minus' : 'plus' }), h("span", null, this.title))
                ];
            default:
                this.layout = 'default';
                return [
                    h("div", { class: 'title', tabindex: 0, onClick: e => this.toggleDetails(e) }, h("psk-icon", { icon: 'chevron-right', class: { 'rotated': this.opened } }), h("span", null, this.title)),
                    h("div", { class: 'content' }, h("slot", null))
                ];
        }
    }
    render() {
        return h(Host, { opened: this.opened }, this.__renderDetails());
    }
    get __host() { return getElement(this); }
};
__decorate([
    CustomTheme()
], PskDetails.prototype, "__host", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property is used as title or summary for collapsable section.`,
        isMandatory: false,
        propertyType: `string`
    })
], PskDetails.prototype, "title", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property decides if the content of the component is visible / hidden.`,
        isMandatory: false,
        propertyType: `boolean`,
        defaultValue: `false`
    })
], PskDetails.prototype, "opened", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `There are three alternatives for this attribute: "collapsable", "plus" and "default". If other value is passed, fallback plan is also the default value.`,
            `According to this property, the appearance of the component is changing.`
        ],
        isMandatory: false,
        propertyType: `string`,
        defaultValue: `default`
    })
], PskDetails.prototype, "layout", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `By defining this attribute, the component will be able to trigger an event.`
        ],
        isMandatory: false,
        propertyType: 'string'
    })
], PskDetails.prototype, "eventName", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `This attribute is used to pass some information along with an event.`,
            `This attribute is taken into consideration only if the event-name has a value. If not, it is ignored.`
        ],
        isMandatory: false,
        propertyType: 'any'
    })
], PskDetails.prototype, "eventData", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `This attribute is telling the component where to trigger the event. Accepted values: "document, "window".`,
            `If the value is not set or it is not one of the accepted values, the event-dispatcher will be the component itself.`
        ],
        isMandatory: false,
        propertyType: 'string'
    })
], PskDetails.prototype, "eventDispatcher", void 0);
PskDetails.style = {
    default: pskDetailsDefaultCss,
    layout: pskDetailsLayoutCss
};

export { PskDetails as psk_details };
