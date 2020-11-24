import { r as registerInstance, h, g as getElement } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
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
const PskSlideshow = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.visibleSeconds = 10;
        this.fadeSeconds = 1;
    }
    componentWillLoad() {
        if (this.images) {
            this.marginTop = this.element.getBoundingClientRect().y;
            this.checkLayout();
            this.imagesSrcs = this.images.split(",");
            this.getAnimationCSS();
        }
        else {
            console.log("No images provided");
        }
    }
    checkLayout() {
        this.slideshowHeight = document.documentElement.clientHeight - this.marginTop;
    }
    renderSlide(imageSrc, id) {
        let slide = h("li", { id: "slide-" + id, class: "animation-" + id, style: { backgroundImage: "url(" + imageSrc + ")" } });
        return slide;
    }
    getAnimationCSS() {
        let frameDuration = this.fadeSeconds + this.visibleSeconds;
        let animationTime = 100 / ((frameDuration) * this.imagesSrcs.length);
        let fadeStyle = `@keyframes fade {
    0% { opacity: 0; }
    ${animationTime * this.fadeSeconds}% { opacity: 1; }
    ${animationTime * (frameDuration)}% { opacity: 1; }
    ${animationTime * (frameDuration + this.fadeSeconds)}% { opacity: 0; }
    100% { opacity: 0; }
  }`;
        for (let idx = 0; idx < this.imagesSrcs.length; idx++) {
            fadeStyle += `#psk-slider li:nth-child(${idx}) {
        animation-delay: ${frameDuration * idx}s;
        }`;
        }
        fadeStyle += `#psk-slider li{animation-duration: ${frameDuration * this.imagesSrcs.length}s;}`;
        let styleElement = document.createElement("style");
        styleElement.innerHTML = fadeStyle;
        this.element.shadowRoot.prepend(styleElement);
    }
    render() {
        let slides = [];
        this.imagesSrcs.forEach((imageSrc, idx) => {
            slides.push(this.renderSlide(imageSrc, idx));
        });
        let title = this.title ? h("div", { class: "title" }, this.title) : null;
        let caption = this.caption ? h("div", { class: "caption" }, this.caption) : null;
        let actions = this.element.children.length > 0 ?
            h("div", { class: "actions" }, h("slot", null)) : null;
        let content = null;
        if (title || caption || actions) {
            content = h("div", { class: "container" }, h("div", { class: "content" }, [title, caption, actions]));
        }
        return h("div", { class: "psk-slideshow" }, h("div", { class: "psk-slideshow-container" }, content, h("div", { id: "psk-content-slider" }, h("div", { id: "psk-slider" }, h("div", { id: "psk-slider-mask", style: { height: this.slideshowHeight + "px" } }, h("ul", null, slides))))));
    }
    get element() { return getElement(this); }
};
__decorate([
    CustomTheme(),
    TableOfContentProperty({
        description: [`This property is the images sources separated by ','.`,
            `Using this property a new array will be created by splitting this string by ','.`],
        isMandatory: true,
        propertyType: `string`
    })
], PskSlideshow.prototype, "images", void 0);
__decorate([
    TableOfContentProperty({
        description: [`This property is the title of the slideshow that will be rendered.`,
            `If this property is given than a new div container will be created with the title as the class and the HTML child.`],
        isMandatory: false,
        propertyType: `string`,
        defaultValue: `null`
    })
], PskSlideshow.prototype, "title", void 0);
__decorate([
    TableOfContentProperty({
        description: [`This property is the caption of the slideshow that will be rendered.`,
            `If this property is given than a new div container will be created with the caption as the class and the HTML child.`],
        isMandatory: false,
        propertyType: `string`,
        defaultValue: `null`
    })
], PskSlideshow.prototype, "caption", void 0);
__decorate([
    TableOfContentProperty({
        description: 'This property represents the number of seconds an image is visible.',
        isMandatory: false,
        propertyType: `number`,
        defaultValue: `10`
    })
], PskSlideshow.prototype, "visibleSeconds", void 0);
__decorate([
    TableOfContentProperty({
        description: 'This property adjusts the transition between images such that its duration is equal to the specified number of seconds.',
        isMandatory: false,
        propertyType: `number`,
        defaultValue: `1`
    })
], PskSlideshow.prototype, "fadeSeconds", void 0);

export { PskSlideshow as psk_slideshow };
