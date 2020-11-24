import { r as registerInstance, h, g as getElement } from './index-bb32d9fe.js';
import './active-router-89a25b91.js';
import { i as injectHistory } from './index-f0762390.js';
import './match-path-760e1797.js';
import './location-utils-fea12957.js';

const isModifiedEvent = (ev) => (ev.metaKey || ev.altKey || ev.ctrlKey || ev.shiftKey);
const QueryPageLink = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.unsubscribe = () => { return; };
        this.activeClass = 'link-active';
        this.exact = false;
        this.strict = true;
        /**
         *  Custom tag to use instead of an anchor
         */
        this.custom = 'a';
        this.match = false;
    }
    componentWillLoad() {
        this.computeMatch();
    }
    // Identify if the current route is a match.
    computeMatch() {
        if (this.location) {
            let currentRouteUrl = this.location.search;
            if (currentRouteUrl.indexOf("&") !== -1) {
                currentRouteUrl = currentRouteUrl.substring(0, currentRouteUrl.indexOf("&"));
            }
            this.match = currentRouteUrl === this.url;
        }
    }
    handleClick(e) {
        if (isModifiedEvent(e) || !this.history || !this.url) {
            return;
        }
        e.preventDefault();
        return this.history.push(this.url);
    }
    // Get the URL for this route link without the root from the router
    render() {
        let anchorAttributes = {
            class: {
                [this.activeClass]: this.match,
            },
            onClick: this.handleClick.bind(this)
        };
        if (this.anchorClass) {
            anchorAttributes.class[this.anchorClass] = true;
        }
        if (this.custom === 'a') {
            anchorAttributes = Object.assign(Object.assign({}, anchorAttributes), { href: this.url, title: this.anchorTitle, role: this.anchorRole, tabindex: this.anchorTabIndex, 'aria-haspopup': this.ariaHaspopup, id: this.anchorId, 'aria-posinset': this.ariaPosinset, 'aria-setsize': this.ariaSetsize, 'aria-label': this.ariaLabel });
        }
        return (h(this.custom, Object.assign({}, anchorAttributes), h("slot", null)));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "location": ["computeMatch"]
    }; }
};
injectHistory(QueryPageLink);

export { QueryPageLink as query_page_link };
