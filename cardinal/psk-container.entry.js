import { r as registerInstance, h, g as getElement } from './index-bb32d9fe.js';
import './active-router-89a25b91.js';
import { i as injectHistory } from './index-f0762390.js';
import './match-path-760e1797.js';
import './location-utils-fea12957.js';
import { C as ContainerController } from './ContainerController-426f692f.js';
import './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { C as CustomTheme } from './CustomTheme-f57ed858.js';
import { T as TableOfContentProperty } from './TableOfContentProperty-de8188be.js';
import { C as ControllerRegistryService } from './ControllerRegistryService-229f368f.js';

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
const PskContainer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.promisifyControllerLoad = (controllerName) => {
            return new Promise((resolve, reject) => {
                ControllerRegistryService.getController(controllerName).then((controller) => {
                    // Prevent javascript execution if the node has been removed from DOM
                    resolve(controller);
                }).catch(reject);
            });
        };
    }
    connectedCallback() {
        this.disconnected = false;
    }
    disconnectedCallback() {
        this.disconnected = true;
    }
    render() {
        return [
            h("slot", null),
            this.htmlFilePath && h("psk-page-loader", { pageUrl: this.htmlFilePath })
        ];
    }
    componentWillLoad() {
        let promise;
        if (typeof this.controllerName === "string" && this.controllerName.length > 0) {
            promise = this.promisifyControllerLoad(this.controllerName);
        }
        else {
            promise = Promise.resolve(ContainerController);
        }
        promise.then((Controller) => {
            if (!this.disconnected) {
                this.controller = new Controller(this._host, this.history);
                this.__getInnerController.call(this, this._host);
                if (this.controllerScript) {
                    this.executeScript(this.controllerScript);
                }
            }
        }).catch((err) => {
            console.log(err);
        });
        return promise;
    }
    __getInnerController(fromElement) {
        const children = fromElement.children;
        // Find only the first direct <script> descendant
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child.tagName.toLowerCase() !== 'script') {
                continue;
            }
            this.controllerScript = child.innerHTML;
            child.innerHTML = '';
            return;
        }
    }
    executeScript(script) {
        if (typeof script === 'string' && script.trim().length > 0) {
            new Function('controller', script)(this.controller);
        }
        return null;
    }
    get _host() { return getElement(this); }
};
__decorate([
    CustomTheme(),
    TableOfContentProperty({
        isMandatory: false,
        description: [`This property is a string that will permit the developer to choose his own controller.`,
            `If no value is sent then the null default value will be taken and the component will use the basic Controller.`],
        propertyType: `string`,
        defaultValue: `null`
    })
], PskContainer.prototype, "controllerName", void 0);
__decorate([
    TableOfContentProperty({
        description: [`This property is the page url (html) that will be passed to the psk-page-loader component`,
            `This component will sent a get request to that url in order to get the content of that url.`],
        isMandatory: false,
        propertyType: `string`,
        defaultValue: `null`
    })
], PskContainer.prototype, "htmlFilePath", void 0);
injectHistory(PskContainer);

export { PskContainer as psk_container };
