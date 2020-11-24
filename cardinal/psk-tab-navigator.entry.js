import { r as registerInstance, h, g as getElement } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { C as CustomTheme } from './CustomTheme-f57ed858.js';
import { T as TableOfContentProperty } from './TableOfContentProperty-de8188be.js';

const pskTabNavigatorDefaultCss = ":host .tabs{display:grid}:host .tabs .tab-navigator{overflow-x:auto}:host .tabs .tab-container{position:relative}:host .tabs .tab-navigator .btn{margin:0;border:none;border-radius:0}:host([layout='horizontal']) .tabs .tab-navigator{display:grid;grid-auto-flow:column}:host([layout='horizontal']) .tabs .tab-navigator .btn{width:100%}:host([layout='vertical']) .tabs{grid-template-columns:auto 1fr;align-items:start}:host([layout='vertical']) .tabs .tab-navigator{display:grid}:host([layout='vertical']) .tabs .tab-navigator button.btn{width:100%}:host([layout='mobile']) .tabs .tab-navigator psk-select psk-label{display:none}:host([layout='mobile']) .tabs .tab-navigator psk-select .form-group{margin:0}:host .tabs{background-color:#FFFFFF;box-shadow:0 0 10px rgba(0, 0, 0, 0.25)}:host .tabs .tab-navigator,:host .tabs .tab-navigator .btn{background-color:#4C71DD}:host .tabs .tab-navigator psk-button.active button.btn{background-color:#354F9B;border-style:none}:host .tabs .tab-container{padding:1rem}:host([layout='horizontal']) .tabs .tab-container{border-top:3px solid #354F9B}:host([layout='vertical']) .tabs .tab-navigator{min-width:150px}:host([layout='mobile']) .tabs .tab-navigator{padding:1rem;background-color:#4C71DD70;border-bottom:1px solid #354F9B}";

const pskTabNavigatorLayoutCss = ":host .tabs{display:grid}:host .tabs .tab-navigator{overflow-x:auto}:host .tabs .tab-container{position:relative}:host .tabs .tab-navigator .btn{margin:0;border:none;border-radius:0}:host([layout='horizontal']) .tabs .tab-navigator{display:grid;grid-auto-flow:column}:host([layout='horizontal']) .tabs .tab-navigator .btn{width:100%}:host([layout='vertical']) .tabs{grid-template-columns:auto 1fr;align-items:start}:host([layout='vertical']) .tabs .tab-navigator{display:grid}:host([layout='vertical']) .tabs .tab-navigator button.btn{width:100%}:host([layout='mobile']) .tabs .tab-navigator psk-select psk-label{display:none}:host([layout='mobile']) .tabs .tab-navigator psk-select .form-group{margin:0}";

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
const PskTabNavigator = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.tabData = [];
        this.tabNavigator = null;
        this.default = 0;
        this.layout = 'horizontal';
    }
    componentWillLoad() {
        const tabs = this._host.children;
        for (let i = 0; i < tabs.length; i++) {
            this.tabData.push({
                index: i,
                title: tabs[i].getAttribute('title')
            });
        }
        this.default = this.__checkDefault();
        this.tabNavigator = this.__renderTabNavigator(this.default);
    }
    componentDidLoad() {
        this.__renderActiveTab(this.default);
    }
    onTabSelected(e) {
        e.stopImmediatePropagation();
        const { value } = e.data;
        const selected = parseInt(value);
        this.__selectTab(selected);
    }
    onTabClicked(e) {
        e.stopImmediatePropagation();
        const button = e.currentTarget;
        const buttons = [].slice.call(button.parentElement.children);
        const selected = buttons.indexOf(button);
        this.__selectTab(selected);
    }
    __checkDefault() {
        if (!Number.isInteger(this.default)) {
            console.warn('psk-tab-navigator:', `"default" value is not an integer`);
            return 0;
        }
        if (this.default < 0 || this.default >= this._host.children.length) {
            console.warn('psk-tab-navigator:', `"default" value is not in corresponding range [0, ${this._host.children.length - 1}]`);
            return 0;
        }
        return this.default;
    }
    __selectTab(selected) {
        this.tabNavigator = this.__renderTabNavigator(selected);
        this.__renderActiveTab(selected);
    }
    __renderActiveTab(selected) {
        const tabs = this._host.children;
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].setAttribute('hidden', 'true');
            tabs[i].removeAttribute('slot');
        }
        tabs[selected].removeAttribute('hidden');
        tabs[selected].setAttribute('slot', 'tab-active');
    }
    __renderTabNavigator(selected) {
        if (this.layout === 'mobile') {
            const options = this.tabData.map(tab => `${tab.title}, ${tab.index}`).join(' | ');
            return (h("psk-form-row", null, h("psk-select", { value: selected, "select-options": options, "event-name": 'psk-tab-navigator:psk-select:change' })));
        }
        return this.tabData.map(tab => h("psk-button", { class: { 'active': tab.index === selected }, onClick: e => this.onTabClicked(e) }, tab.title));
    }
    render() {
        return (h("div", { class: 'tabs' }, h("div", { class: 'tab-navigator' }, this.tabNavigator), h("div", { class: 'tab-container' }, h("slot", { name: 'tab-active' }))));
    }
    get _host() { return getElement(this); }
};
__decorate([
    CustomTheme()
], PskTabNavigator.prototype, "_host", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `This property actives the tab with specified index.`,
            `By default the first tab is selected.`,
            `The first tab is indexed with 0. If an invalid index is set, a warning will be thrown and the default value will be selected.`
        ],
        isMandatory: false,
        propertyType: `number`,
        defaultValue: `0`
    })
], PskTabNavigator.prototype, "default", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `There are four alternatives for this attribute: "horizontal", "vertical", "mobile" and "none" (or any string).`,
            `According to this property, the appearance of the tabs is changing. Also, the tab control mechanism may be different.`
        ],
        isMandatory: false,
        propertyType: `string`,
        defaultValue: `horizontal`
    })
], PskTabNavigator.prototype, "layout", void 0);
PskTabNavigator.style = {
    default: pskTabNavigatorDefaultCss,
    layout: pskTabNavigatorLayoutCss
};

export { PskTabNavigator as psk_tab_navigator };
