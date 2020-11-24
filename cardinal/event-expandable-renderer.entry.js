import { r as registerInstance, h, g as getElement } from './index-bb32d9fe.js';
import './active-router-89a25b91.js';
import { i as injectHistory } from './index-f0762390.js';
import './match-path-760e1797.js';
import './location-utils-fea12957.js';
import { E as EVENTS_TYPES } from './constants-507b64b1.js';

const EVENT_TYPE = EVENTS_TYPES.PSK_SUB_MENU_EVT;
class SubMenuItemsEvent extends CustomEvent {
    constructor(eventName, eventData, eventOptions) {
        super(eventName, eventOptions);
        this.getEventType = function () {
            return EVENT_TYPE;
        };
        this.data = eventData;
    }
}

const ExpandableRenderer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.isOpened = false;
        this.dropDownHasChildActive = false;
        this.somethingChanged = false;
        this.isClosed = true;
        this.lazyItems = [];
        this.eventWasResolved = false;
    }
    loadSubMenuItems() {
        let eventCallbackHandler = (err, items) => {
            if (err) {
                throw new Error(err);
            }
            let arr = [];
            items.forEach(item => {
                arr.push(h("stencil-route-link", { url: item.path, activeClass: "active", exact: false }, h("div", { class: "wrapper_container" }, h("div", { class: "item_container" }, h("span", { class: `icon fa ${item.icon}` }), h("span", { class: "item_name" }, item.name)))));
            });
            this.lazyItems = arr;
            this.eventWasResolved = true;
        };
        if (this.item.children.event) {
            let event = new SubMenuItemsEvent(this.item.children.event, {
                pathPrefix: this.item.path,
                callback: eventCallbackHandler
            }, {
                cancelable: true,
                composed: true,
                bubbles: true,
            });
            this._host.dispatchEvent(event);
        }
    }
    componentDidLoad() {
        this._host.addEventListener("click", () => {
            this.isClosed = false;
            this.loadSubMenuItems();
        });
    }
    render() {
        return (h("div", { class: "children" }, this.isClosed ? null : this.lazyItems.length ? this.lazyItems : this.eventWasResolved ?
            h("div", { class: "menu-loader" }, h("i", { class: "small" }, "No item found.")) : h("div", { class: "menu-loader" }, "Loading...")));
    }
    get _host() { return getElement(this); }
};
injectHistory(ExpandableRenderer);

export { ExpandableRenderer as event_expandable_renderer };
