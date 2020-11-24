import { r as registerInstance, h, g as getElement } from './index-bb32d9fe.js';
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
const PskPageLoader = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.errorLoadingPage = false;
        this.type = "div";
    }
    componentWillLoad() {
        if (this.element.isConnected) {
            return new Promise((resolve) => {
                this.getPageContent(this.pageUrl, this.getPageHandler(resolve));
            });
        }
    }
    watchHandler(newValue) {
        this.getPageContent(newValue, this.getPageHandler());
    }
    getPageHandler(callback) {
        let self = this;
        return function (err, data) {
            if (err) {
                self.errorLoadingPage = true;
            }
            else {
                self.errorLoadingPage = false;
                self.pageContent = data;
            }
            if (typeof callback === "function") {
                callback();
            }
        };
    }
    getPageContent(pageUrl, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', pageUrl);
        xhr.onload = () => {
            if (xhr.status != 200) {
                callback(new Error("Some error occurred"));
            }
            else {
                callback(undefined, xhr.responseText);
            }
        };
        xhr.onerror = () => {
            this.errorLoadingPage = true;
        };
        xhr.send();
    }
    render() {
        let renderedComponent = null;
        if (this.type && this.type.toLowerCase() === "iframe") {
            renderedComponent = h("iframe", { class: "iframe_page_content", frameborder: "0", style: {
                    overflow: "hidden",
                    height: "100%",
                    width: "100%"
                }, src: `data:text/html;charset=utf-8, ${escape(this.pageContent)}` });
        }
        else {
            renderedComponent = h("div", { class: "page_content", style: { height: "100%", width: "100%" }, innerHTML: this.pageContent });
        }
        return (this.errorLoadingPage ?
            h("h4", null, `Page ${this.pageUrl} could not be loaded!`) :
            renderedComponent);
    }
    get element() { return getElement(this); }
    static get watchers() { return {
        "pageUrl": ["watchHandler"]
    }; }
};
__decorate([
    BindModel()
], PskPageLoader.prototype, "modelHandler", void 0);
__decorate([
    CustomTheme()
], PskPageLoader.prototype, "pageContent", void 0);
__decorate([
    TableOfContentProperty({
        description: [`This property is the url for the page that needs to be loaded.`,
            `When this component loads a get http request will be issued and the cotent of that url will be rendered if it can be accessed.`],
        isMandatory: true,
        propertyType: 'string'
    })
], PskPageLoader.prototype, "pageUrl", void 0);
__decorate([
    TableOfContentProperty({
        description: [`This property indicates if the page should use an iframe or div to render the content retrieved using pageSrc property.`,
            `Accepted values: iframe, div`,
            `Default value:div`],
        isMandatory: false,
        propertyType: 'string'
    })
], PskPageLoader.prototype, "type", void 0);

export { PskPageLoader as psk_page_loader };
