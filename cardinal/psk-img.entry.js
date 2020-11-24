import { r as registerInstance, h } from './index-bb32d9fe.js';
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
const PskImg = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        let imgTagAttributes = {
            src: this.src,
            alt: this.title
        };
        if (this.height) {
            imgTagAttributes['height'] = this.height;
        }
        if (this.width) {
            imgTagAttributes['width'] = this.width;
        }
        return (h("div", { class: "image_container" }, h("div", { class: "image_wrapper" }, h("img", Object.assign({}, imgTagAttributes))), this.title ? h("div", { class: "image_description" }, this.title) : null));
    }
};
__decorate([
    CustomTheme(),
    BindModel()
], PskImg.prototype, "modelHandler", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property is the path to the image source (Example:"page/PrivateSky/EDFS.png").`,
        isMandatory: true,
        propertyType: `string`
    })
], PskImg.prototype, "src", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property is setting the width of the image. The value should be an integer specifying the units in pixels`,
        isMandatory: false,
        propertyType: `string`,
    })
], PskImg.prototype, "width", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property is setting the height of the image. The value should be an integer specifying the units in pixels`,
        isMandatory: false,
        propertyType: `string`,
    })
], PskImg.prototype, "height", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property is the title of the image(the alt attribute) and the description of the image.`,
        isMandatory: false,
        propertyType: `string`,
        specialNote: `If no title is given,there will not be assumed one and there will be no image description/alt.`
    })
], PskImg.prototype, "title", void 0);

export { PskImg as psk_img };
