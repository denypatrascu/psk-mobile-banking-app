import { r as registerInstance, g as getElement, h } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
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
const DropdownRenderer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.isOpened = false;
        this.dropDownHasChildActive = false;
        this.somethingChanged = false;
    }
    handleClick(e) {
        const target = e.target;
        if (!getElement(this).contains(target)) {
            this.isOpened = false;
        }
    }
    handleMenuClick(e) {
        const target = e.detail;
        if (getElement(this).contains(target)) {
            this.isOpened = false;
        }
        else {
            this.dropDownHasChildActive = false;
        }
    }
    routeChanged() {
        let url = this.url + "/";
        this.dropDownHasChildActive = window.location.href.includes(url);
    }
    toggleDropdown(evt) {
        let target = evt.target;
        let isChild = false;
        while (target.parentElement) {
            target = target.parentElement;
            if (target.classList.contains("children")) {
                isChild = true;
                break;
            }
        }
        if (!isChild) {
            evt.stopImmediatePropagation();
        }
        this.isOpened = !this.isOpened;
    }
    render() {
        this.routeChanged();
        return (h("div", { class: `dropdown ${this.dropDownHasChildActive ? "active" : ''} ${this.isOpened ? "isOpened" : ''}`, onClick: (evt) => this.toggleDropdown(evt) }, h("slot", null)));
    }
};
__decorate([
    TableOfContentProperty({
        description: `This property is used in the css file for renderes in order to verify the state of the component`,
        isMandatory: false,
        propertyType: `boolean`
    })
], DropdownRenderer.prototype, "active", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property sets the url for the component in menu in order to be routed.`,
        isMandatory: true,
        propertyType: 'any'
    })
], DropdownRenderer.prototype, "url", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property tells the component if something changed with the MenuItem`,
        isMandatory: false,
        propertyType: 'boolean'
    })
], DropdownRenderer.prototype, "somethingChanged", void 0);

export { DropdownRenderer as dropdown_renderer };
