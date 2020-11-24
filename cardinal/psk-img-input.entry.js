import { r as registerInstance, h, i as Host, g as getElement } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { B as BindModel } from './BindModel-524e1a2c.js';
import { C as CustomTheme } from './CustomTheme-f57ed858.js';
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
const PskImgInput = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.__fileChangeHandler = (event) => {
            let filesArray = Array.from(event.target.files);
            if (filesArray.length === 0) {
                return;
            }
            let changeEvent = new Event(this.eventName, {
                bubbles: true,
                composed: true,
                cancelable: true
            });
            let reader = new FileReader();
            reader.onload = (e) => {
                let imageDataUrl = e.target.result;
                fetch(imageDataUrl)
                    .then(res => res.arrayBuffer())
                    .then((imageContent) => {
                    changeEvent["data"] = imageContent;
                    this.element.dispatchEvent(changeEvent);
                });
                this.src = imageDataUrl;
            };
            reader.readAsDataURL(filesArray[0]);
        };
        this.__clickHandler = (event) => {
            let fileChooser = this.element.querySelector("input");
            fileChooser.dispatchEvent(new MouseEvent("click"));
            event.stopImmediatePropagation();
        };
        this.imageSource = null;
        this.src = null;
        this.alt = null;
        this.placeholder = 'click here to select source';
        this.label = null;
        this.eventName = 'change';
    }
    componentWillLoad() {
        this.srcUpdate(this.src);
    }
    render() {
        return h(Host, { class: `form-group` }, this.label && h("psk-label", { label: this.label }), h("div", { class: "outer-container", onClick: this.__clickHandler.bind(this) }, typeof this.imageSource !== "undefined" && this.imageSource !== null
            ? h("div", { class: "display-img-container" }, h("img", { src: this.imageSource, alt: this.alt }), h("psk-icon", { icon: "pencil" }))
            : h("psk-label", { label: this.placeholder })), h("input", { type: "file", class: "form-control-file form-control-sm", style: { "display": "none" }, onChange: this.__fileChangeHandler.bind(this) }));
    }
    srcUpdate(newValue) {
        this.imageSource = newValue;
    }
    get element() { return getElement(this); }
    static get watchers() { return {
        "src": ["srcUpdate"]
    }; }
};
__decorate([
    CustomTheme(),
    BindModel()
], PskImgInput.prototype, "modelHandler", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Represent the src of the image that need to be displayed`],
        isMandatory: false,
        propertyType: 'string'
    })
], PskImgInput.prototype, "src", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Represent the alternative text that will be displayed if the image was not able to be loaded`],
        isMandatory: false,
        propertyType: 'string'
    })
], PskImgInput.prototype, "alt", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Represent the text that will be displayed as placeholder when src attribute is not set`],
        isMandatory: false,
        propertyType: 'string',
        defaultValue: "click here to select source"
    })
], PskImgInput.prototype, "placeholder", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Represent the text that will be used as label for the input`],
        isMandatory: false,
        propertyType: 'string'
    })
], PskImgInput.prototype, "label", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Represent the event type that will be thrown when user changes the image src`],
        isMandatory: false,
        propertyType: 'string',
        defaultValue: "change"
    })
], PskImgInput.prototype, "eventName", void 0);

export { PskImgInput as psk_img_input };
