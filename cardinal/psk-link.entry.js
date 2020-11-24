import { r as registerInstance, f as createEvent, h } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
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
let tagsDictionary;
const PskLink = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.validateUrl = createEvent(this, "validateUrl", 7);
        this.getTags = createEvent(this, "getTags", 7);
        this.error = false;
        this.destinationUrl = "#";
    }
    getAssignedUrlFromTag(tag, callback) {
        if (!tagsDictionary) {
            this.getTags.emit((err, data) => {
                if (err) {
                    return callback(err);
                }
                tagsDictionary = data;
                callback(undefined, tagsDictionary[tag]);
            });
        }
        else
            callback(undefined, tagsDictionary[tag]);
    }
    componentWillLoad() {
        let setLinkUrl = (error, url) => {
            if (error || !url) {
                this.error = true;
            }
            else {
                this.destinationUrl = this.chapter ? url + "&chapter=" + this.chapter : url;
            }
        };
        if (this.tag) {
            return this.getAssignedUrlFromTag(this.tag, setLinkUrl);
        }
        if (this.page) {
            this.validateUrl.emit({
                sourceUrl: this.page,
                callback: setLinkUrl
            });
        }
    }
    render() {
        let errorContent = null;
        if (this.error) {
            errorContent = h("div", { class: "tooltip-error" }, h("div", null, "Page ", h("b", null, this.page), " does not exists."));
        }
        return (h("div", { class: "psk-link" }, this.error ?
            h("div", null, h("a", { class: `btn btn-link ${this.error ? 'invalid-url' : ''}`, onClick: (evt) => {
                    evt.preventDefault();
                } }, h("slot", null)), errorContent) :
            h("stencil-route-link", { url: this.destinationUrl, anchorClass: "btn btn-link" }, h("slot", null))));
    }
};
__decorate([
    CustomTheme(),
    TableOfContentProperty({
        description: "This property is helping the component to resolve the real URL of the target. This property is validated for the first time by the valdateUrl event.",
        isMandatory: false,
        propertyType: "string"
    })
], PskLink.prototype, "page", void 0);
__decorate([
    TableOfContentProperty({
        description: "This property gives the component a unique tag which resolves a single page.",
        isMandatory: false,
        propertyType: "string"
    })
], PskLink.prototype, "tag", void 0);
__decorate([
    TableOfContentProperty({
        description: "This property allows user to create a complex URL containing a page chapter identifier",
        isMandatory: false,
        propertyType: "string"
    })
], PskLink.prototype, "chapter", void 0);
__decorate([
    TableOfContentEvent({
        controllerInteraction: {
            required: true
        },
        description: [
            `This event is sent to the application controller in order to check and validate the page property.`,
            `If the sequence of pages inside the page property is valid, then the event is sending back to the component the valid path to the required page.`,
            `If not, a special behavior will be applied to the link. On mouse over, it will turn grey and will display a hint message: "Page {page-name} does not exists".`
        ]
    })
], PskLink.prototype, "validateUrl", void 0);
__decorate([
    TableOfContentEvent({
        controllerInteraction: {
            required: true
        },
        description: [
            `This event is sent to the application controller in order get the dictionary that keeps the mapped tags to their real page URLs`,
        ]
    })
], PskLink.prototype, "getTags", void 0);

export { PskLink as psk_link };
