import { r as registerInstance, h, i as Host, g as getElement } from './index-bb32d9fe.js';
import { D as DefaultApplicationController } from './DefaultApplicationController-858ff924.js';
import { M as MOBILE_MAX_WIDTH } from './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { T as TableOfContentProperty } from './TableOfContentProperty-de8188be.js';
import { C as ControllerRegistryService } from './ControllerRegistryService-229f368f.js';

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
const appMaxWidth = MOBILE_MAX_WIDTH;
const PskAppRoot = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.disableSidebar = false;
        this.mobileLayout = false;
        this.componentCode = "";
        this.hasSlot = false;
    }
    __createLoader() {
        const NR_CIRCLES = 12;
        let circles = "";
        for (let i = 1; i <= NR_CIRCLES; i++) {
            circles += `<div class="sk-circle${i} sk-circle"></div>`;
        }
        let node = document.createElement("div");
        node.className = "app-loader";
        node.innerHTML = `<div class='sk-fading-circle'>${circles}</div>`;
        return node;
    }
    checkLayout() {
        this.mobileLayout = document.documentElement.clientWidth < appMaxWidth;
    }
    connectedCallback() {
        this.disconnected = false;
    }
    disconnectedCallback() {
        this.disconnected = true;
    }
    componentWillLoad() {
        this.checkLayout();
        if (this.host.parentElement) {
            this.htmlLoader = this.__createLoader();
            this.host.parentElement.appendChild(this.htmlLoader);
        }
        let innerHTML = this.host.innerHTML;
        innerHTML = innerHTML.replace(/\s/g, "");
        if (innerHTML.length) {
            this.hasSlot = true;
        }
        if (typeof this.controller === "string") {
            return new Promise((resolve, reject) => {
                ControllerRegistryService.getController(this.controller).then((CTRL) => {
                    // Prevent javascript execution if the node has been removed from DOM
                    if (this.disconnected) {
                        return resolve();
                    }
                    new CTRL(this.host);
                    resolve();
                }).catch(reject);
            });
        }
        else {
            //load default controller
            new DefaultApplicationController(this.host);
        }
    }
    componentDidLoad() {
        if (this.htmlLoader && this.htmlLoader.parentNode) {
            this.htmlLoader.parentNode.removeChild(this.htmlLoader);
        }
    }
    render() {
        let DefaultRendererTag = "psk-default-renderer";
        return (h(Host, { class: this.mobileLayout ? "is-mobile" : "" }, this.hasSlot
            ? h("slot", null)
            : h(DefaultRendererTag, { mobileLayout: this.mobileLayout, disableSidebar: this.disableSidebar })));
    }
    get host() { return getElement(this); }
};
__decorate([
    TableOfContentProperty({
        isMandatory: false,
        description: [`This property is a string that will permit the developer to choose his own controller.`,
            `If no controller is provided, a default controller will be passed to the component`,
            `It is recommended that each app to extend the provided default controller and adapt it to the application needs`],
        propertyType: `string`,
        defaultValue: `null`
    })
], PskAppRoot.prototype, "controller", void 0);

export { PskAppRoot as psk_app_root };
