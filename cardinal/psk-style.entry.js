import { r as registerInstance, h, g as getElement } from './index-bb32d9fe.js';
import { a as applyStyles } from './psk-style.utils-46a368b3.js';

const pskStyleDefaultCss = ":host{display:none}";

const PskStyle = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.__styles = '';
        this.src = null;
    }
    async componentWillLoad() {
        let valid;
        if (this.__host.innerText) {
            this.__styles = this.__host.innerText;
        }
        // TODO: src prop
        // a import file, read it, apply styles
        if (this.__host.parentElement && this.__host.parentElement.shadowRoot) {
            this.__styledElement = this.__host.parentElement;
            valid = true;
        }
        else {
            // TODO: what to do?
            // find the first element with shadow root?
            // apply inline styling for parentElement?
            // how long can be inline tagging?
            // should be made any for shadowed parents?
            // then console.error?
            valid = false;
        }
        if (valid) {
            applyStyles(this.__styledElement, this.__styles);
        }
    }
    render() {
        return (h("style", null, h("slot", null)));
    }
    get __host() { return getElement(this); }
};
PskStyle.style = pskStyleDefaultCss;

export { PskStyle as psk_style };
