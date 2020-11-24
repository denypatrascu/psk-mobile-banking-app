import { r as registerInstance, h, i as Host, g as getElement } from './index-bb32d9fe.js';
import { B as BREADCRUMB_CONSTANTS } from './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { B as BindModel } from './BindModel-524e1a2c.js';
import { C as CustomTheme } from './CustomTheme-f57ed858.js';
import { T as TableOfContentProperty } from './TableOfContentProperty-de8188be.js';

const pskBreadcrumbNavigatorArrowsCss = ":host{padding:0.75rem 1.25rem;margin:0 0 2rem 0;font-size:1.1rem;line-height:2.8rem;display:flex;justify-content:flex-start;align-items:center;white-space:nowrap;overflow-x:auto;overflow-y:hidden;-ms-overflow-style:none;scrollbar-width:none}:host::-webkit-scrollbar{display:none}:host psk-button::after{padding:8px;content:\"/\\00a0\"}:host psk-button:last-of-type::after{content:none}:host button,:host button:focus,:host button:active,:host button:active:focus,:host button:hover{background:unset;border:unset;box-shadow:unset;outline:none !important}#next{right:0}#prev{left:0}#next,#prev{position:absolute;background:#fff;border-radius:6px;opacity:0.75;box-shadow:0px 0px 4px #ccc}#next:hover,#prev:hover{opacity:1;pointer-events:all;cursor:pointer;box-shadow:0px 0px 4px #999}#next .icon,#prev .icon{padding:0.25rem}";

const pskBreadcrumbNavigatorDefaultCss = ":host{display:flex;flex-wrap:wrap;justify-content:flex-start;align-items:center;padding:0.75rem 1.25rem;margin:0 0 2rem 0;font-size:1.1rem;line-height:2.8rem}:host psk-button::after{padding:8px;content:\"/\\00a0\"}:host psk-button:last-of-type::after{content:none}:host button,:host button:focus,:host button:active,:host button:active:focus,:host button:hover{background:unset;border:unset;box-shadow:unset;outline:none !important}";

const pskBreadcrumbNavigatorScrollCss = ":host{padding:0.75rem 1.25rem;margin:0 0 2rem 0;font-size:1.1rem;line-height:2.8rem;display:flex;justify-content:flex-start;align-items:center;white-space:nowrap;overflow-x:auto;overflow-y:hidden}:host psk-button::after{padding:8px;content:\"/\\00a0\"}:host psk-button:last-of-type::after{content:none}:host button,:host button:focus,:host button:active,:host button:active:focus,:host button:hover{background:unset;border:unset;box-shadow:unset;outline:none !important}";

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
const PskBreadcrumbNavigator = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.eventName = BREADCRUMB_CONSTANTS.BREADCRUMB_CLICK;
        this.segments = [];
        this.__firstSegmentClickHandler = (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            this._activeSegment = this.__getFirstSegment();
            this.__scrollToActiveSegment();
        };
        this.__lastSegmentClickHandler = (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            this._activeSegment = this.__getLastSegment();
            this.__scrollToActiveSegment();
        };
        this.__scrollToActiveSegment = () => {
            if (this.__isScrollDisplayed()) {
                this._activeSegment.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "nearest"
                });
            }
        };
        this.__isScrollDisplayed = () => {
            return this.__hostElement.scrollWidth > this.__hostElement.clientWidth;
        };
        this.__getFirstSegment = () => {
            return this.__hostElement.shadowRoot.querySelector("psk-button");
        };
        this.__getLastSegment = () => {
            return this.__hostElement.shadowRoot.querySelector("psk-button:last-of-type");
        };
        this.__getMode = () => {
            return this.__hostElement.mode
                || this.__hostElement.getAttribute('mode')
                || 'default';
        };
    }
    render() {
        let previousSegmentArrow = null, nextSegmentArrow = null;
        if (this.__getMode() === BREADCRUMB_CONSTANTS.ARROWS) {
            previousSegmentArrow = (h("psk-icon", { icon: "arrow-left", id: BREADCRUMB_CONSTANTS.PREVIOUS_ID, onClick: this.__firstSegmentClickHandler }));
            nextSegmentArrow = (h("psk-icon", { icon: "arrow-right", id: BREADCRUMB_CONSTANTS.NEXT_ID, onClick: this.__lastSegmentClickHandler }));
            this._activeSegment = this.__getFirstSegment();
        }
        let segmentList = this.segments.map((segment, index) => {
            const disabled = index + 1 === this.segments.length ? "true" : "false";
            return (h("psk-button", { "button-class": " ", label: segment.label, "event-name": this.eventName, "event-data": segment.path, disabled: disabled }));
        });
        return (h(Host, null, previousSegmentArrow, segmentList, nextSegmentArrow));
    }
    get __hostElement() { return getElement(this); }
};
__decorate([
    BindModel()
], PskBreadcrumbNavigator.prototype, "modelHandler", void 0);
__decorate([
    CustomTheme()
], PskBreadcrumbNavigator.prototype, "__hostElement", void 0);
__decorate([
    TableOfContentProperty({
        description: ["The event name that will be triggered on clicking a segment of the breadcrumb navigator. This is the event that needs to be listened inside the controller.",
            "If not defined, the default value will be considered. (breadcrumb-click)"],
        isMandatory: false,
        propertyType: "string",
        defaultValue: BREADCRUMB_CONSTANTS.BREADCRUMB_CLICK
    })
], PskBreadcrumbNavigator.prototype, "eventName", void 0);
__decorate([
    TableOfContentProperty({
        description: ["This attribute should receive an array of BreadcrumbSegment. BreadcrumbSegment interface accepts two attributes: label and path.",
            "The label will be displayed and the path will be sent as event-data when the user clicks on a segment of the breadcrumb.",
            `Detailed examples of usage are presented below, on "How to use" section.`],
        isMandatory: true,
        propertyType: "BreadcrumbSegment[] (Array of BreadcrumbSegment type)",
        specialNote: "If this property does not receive an array of BreadcrumbSegment, the component will not be rendered."
    })
], PskBreadcrumbNavigator.prototype, "segments", void 0);
PskBreadcrumbNavigator.style = {
    arrows: pskBreadcrumbNavigatorArrowsCss,
    default: pskBreadcrumbNavigatorDefaultCss,
    scroll: pskBreadcrumbNavigatorScrollCss
};

export { PskBreadcrumbNavigator as psk_breadcrumb_navigator };
