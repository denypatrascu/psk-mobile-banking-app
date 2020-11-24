import { r as registerInstance, h } from './index-bb32d9fe.js';
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
const PskPageNotFound = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.urlDestination = null;
        this.pageRenderer = "psk-page-not-found-renderer";
    }
    render() {
        if (this.urlDestination !== null) {
            return (h("stencil-router-redirect", { url: this.urlDestination }));
        }
        else {
            let currentLocation = window.location.pathname;
            let shouldBeRedirected = currentLocation.indexOf(this.basePath) != -1;
            if (shouldBeRedirected) {
                return h("stencil-router-redirect", { url: this.basePath });
            }
            else {
                return h(this.pageRenderer, null);
            }
        }
    }
};
__decorate([
    CustomTheme(),
    TableOfContentProperty({
        description: `This property is the base path of the website. 
		If this parameter is sent to the component, then when the user navigates to an unknown page, he will be redirected to the base path. 
		It is not mandatory to be the root of the application, it can be the root of a section inside the website.`,
        specialNote: `If this parameter is missing, urlDestination parameter is checked.`,
        isMandatory: false,
        propertyType: 'string'
    })
], PskPageNotFound.prototype, "basePath", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property gives a custom redirect URL destination in case the user navigates to an unknown page.`,
        specialNote: `If this parameter is missing, pageRenderer parameter is checked.`,
        isMandatory: false,
        propertyType: 'string'
    })
], PskPageNotFound.prototype, "urlDestination", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property allows the component to display a custom Page 
		not found content in case the user navigates to an unknown page.`,
        specialNote: `If this parameter is missing, psk-page-not-found-renderer is assumed.`,
        isMandatory: false,
        propertyType: 'string',
        defaultValue: 'psk-page-not-found-renderer'
    })
], PskPageNotFound.prototype, "pageRenderer", void 0);

export { PskPageNotFound as psk_page_not_found };
