import { r as registerInstance, f as createEvent, h, g as getElement } from './index-bb32d9fe.js';
import { f as TOOLTIP_COPIED_TEXT, T as TOOLTIP_TEXT } from './constants-507b64b1.js';
import { s as scrollToElement, a as closestParentElement, g as normalizeElementId } from './utilFunctions-74de6735.js';
import { C as CustomTheme } from './CustomTheme-f57ed858.js';
import { T as TableOfContentEvent } from './TableOfContentEvent-f33bf2c4.js';
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
const PskCopyClipboard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.getHistoryType = createEvent(this, "getHistoryType", 7);
        this.id = "";
        this.chapterToken = "";
    }
    componentWillLoad() {
        this.getHistoryType.emit((err, historyType) => {
            if (err) {
                console.log(err);
                return;
            }
            switch (historyType) {
                case "browser":
                case "hash":
                    this.chapterToken = "?chapter=";
                    break;
                case "query":
                    this.chapterToken = "&chapter=";
                    break;
            }
        });
    }
    _copyToClipboardHandler(elementId) {
        try {
            let basePath = window.location.href;
            if (window.location.href.indexOf(this.chapterToken) !== -1) {
                basePath = window.location.href.split(this.chapterToken)[0];
            }
            navigator.clipboard.writeText(`${basePath}${this.chapterToken}${elementId}`);
            const tooltipTextArea = this.element.querySelector('.copy-tooltip');
            tooltipTextArea.innerHTML = TOOLTIP_COPIED_TEXT;
            tooltipTextArea.setAttribute("class", "copy-tooltip copied");
            scrollToElement(elementId, closestParentElement(this.element, 'psk-page'));
        }
        catch (err) {
            console.error(err);
        }
    }
    _resetTooltip() {
        const tooltipTextArea = this.element.querySelector('.copy-tooltip');
        tooltipTextArea.innerHTML = TOOLTIP_TEXT;
        tooltipTextArea.setAttribute("class", "copy-tooltip");
    }
    _isCopySupported() {
        let support = !!document.queryCommandSupported;
        ['copy', 'cut'].forEach((action) => {
            support = support && !!document.queryCommandSupported(action);
        });
        return support;
    }
    render() {
        const elementId = normalizeElementId(this.id.trim());
        if (elementId.length === 0 || !this._isCopySupported()) {
            return;
        }
        return (h("div", { class: "tooltip_container", onClick: (evt) => {
                evt.stopImmediatePropagation();
                this._copyToClipboardHandler(elementId);
            }, onMouseOut: () => {
                this._resetTooltip();
            } }, h("a", { class: "mark", href: `#${elementId}`, onClick: (evt) => {
                evt.preventDefault();
            } }, h("slot", null)), h("span", { class: "copy-tooltip" }, TOOLTIP_TEXT)));
    }
    get element() { return getElement(this); }
};
__decorate([
    CustomTheme(),
    TableOfContentEvent({
        eventName: `getHistoryType`,
        controllerInteraction: {
            required: true
        },
        description: `This event gets the history type in order to see what identificator to use for the selected chapter Token.
                  The three types of token that can be returned are : browser, hash or query.`
    })
], PskCopyClipboard.prototype, "getHistoryType", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property is the id of the textzone that will be copied to the clipboard.
                  It is necessary (but not mandatory) so the URL can be copied in a simplified fashion.
                  Special characters(Example : ':','/') will be replaced with dash('-').`,
        isMandatory: false,
        propertyType: `string`
    })
], PskCopyClipboard.prototype, "id", void 0);

export { PskCopyClipboard as psk_copy_clipboard };
