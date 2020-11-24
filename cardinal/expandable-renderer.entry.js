import { r as registerInstance, f as createEvent, h } from './index-bb32d9fe.js';
import './active-router-89a25b91.js';
import { i as injectHistory } from './index-f0762390.js';
import './match-path-760e1797.js';
import './location-utils-fea12957.js';

const ExpandableRenderer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.sectionChange = createEvent(this, "sectionChange", 7);
        this.isOpened = false;
        this.dropDownHasChildActive = false;
        this.somethingChanged = false;
    }
    routeChanged() {
        this.dropDownHasChildActive = window.location.href.includes(this.url);
        if (this.dropDownHasChildActive) {
            this.isOpened = true;
        }
    }
    openDropDown(evt) {
        let target = evt.target;
        let isChild = true;
        while (target.parentElement) {
            target = target.parentElement;
            if (target.classList.contains("wrapper_container")) {
                if (target.querySelector(".children") !== null) {
                    isChild = false;
                    break;
                }
            }
        }
        if (!isChild) {
            if (!this.isOpened) {
                this.history.push(this.firstMenuChild.path);
                this.sectionChange.emit();
                //prevent propatation, otherwise, on mobile version, the menu will be closed
                evt.stopImmediatePropagation();
            }
        }
        this.isOpened = true;
    }
    closeSection(evt) {
        this.isOpened = false;
        this.dropDownHasChildActive = false;
        evt.stopImmediatePropagation();
    }
    componentWillLoad() {
        this.routeChanged();
    }
    render() {
        return (h("div", { class: `dropdown ${this.dropDownHasChildActive ? "active" : ''} ${this.isOpened ? "isOpened" : ''}`, onClick: this.openDropDown.bind(this) }, this.isOpened ?
            h("button", { class: "close-section", onClick: this.closeSection.bind(this) }) : null, h("slot", null)));
    }
};
injectHistory(ExpandableRenderer);

export { ExpandableRenderer as expandable_renderer };
