import { r as registerInstance, f as createEvent, h, g as getElement } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import { j as normalizeModelChain } from './utilFunctions-74de6735.js';
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
const PskForEach = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.getModelEvent = createEvent(this, "getModelEvent", 7);
        this.modelChanged = false;
        this.chain = "";
        this.ignoredNodeNames = ["link", "style", "slot", "#text", "#comment", "text", "comment"];
        this.templateNodes = [];
        this.dataViewModel = null;
    }
    prepareTemplate() {
        let childNodes = Array.from(this.__host.childNodes);
        let children = childNodes.filter((node) => {
            return (this.ignoredNodeNames.indexOf(node.nodeName.toLowerCase()) === -1);
        });
        //get the template for item rendering
        let templateChildren = children.filter((node) => {
            return !node.hasAttribute("slot");
        });
        //get the template for "no data available"
        let emptyNode = children.find((node) => {
            return node.hasAttribute("slot") && node.getAttribute("slot") === "no-data";
        });
        if (emptyNode) {
            emptyNode.removeAttribute("slot");
            this.emptyNode = emptyNode.cloneNode(true);
        }
        //empty the host
        this.__host.innerHTML = "";
        if (templateChildren) {
            templateChildren.forEach(child => {
                this.templateNodes.push(child.cloneNode(true));
            });
        }
        else {
            console.error("No template found!");
        }
    }
    componentWillLoad() {
        if (!this.__host.isConnected) {
            return;
        }
        this.chain = this.dataViewModel;
        this.chain = normalizeModelChain(this.chain);
        this.prepareTemplate();
        return new Promise((resolve) => {
            this.getModelEvent.emit({
                callback: (err, model) => {
                    if (err) {
                        console.log(err);
                    }
                    this.model = model;
                    this.model.onChange(this.chain, () => {
                        this.modelChanged = !this.modelChanged;
                    });
                    resolve();
                }
            });
        });
    }
    render() {
        //check if component is no longer attached to DOM
        if (!this.__host.isConnected) {
            return null;
        }
        //check if template is ready
        if (!this.templateNodes) {
            return null;
        }
        let model = this.model.getChainValue(this.chain);
        if (!model) {
            model = [];
        }
        let childList = [];
        for (let i = 0; i < model.length; i++) {
            let currentChain = this.chain ? `${this.chain}.${i}` : `${i}`;
            this.templateNodes.forEach(node => {
                let clonedTemplate = node.cloneNode(true);
                this.__processNode(clonedTemplate, currentChain);
                let NewNodeTag = clonedTemplate.tagName.toLowerCase();
                let attributes = {};
                clonedTemplate.getAttributeNames().forEach(attrName => {
                    attributes[attrName] = clonedTemplate.getAttribute(attrName);
                });
                let newElement = h(NewNodeTag, Object.assign({ innerHTML: clonedTemplate.innerHTML }, attributes));
                childList.push(newElement);
            });
        }
        if (childList.length === 0 && this.emptyNode) {
            return h("div", { innerHTML: this.emptyNode.outerHTML });
        }
        return childList;
    }
    __processNode(node, chain) {
        function processAttribute(attributeName, attributeValue) {
            let splitChain = attributeValue.trim().split("@");
            let property = splitChain.pop();
            let fullChain = chain;
            if (chain && property.length > 0) {
                fullChain = `${chain}.${property}`;
            }
            node.setAttribute(attributeName, "@" + fullChain);
        }
        /*
          process view-model attribute
          keep in mind that this attribute accepts models that can begin or not with '@'
         */
        let viewModelAttribute = node.getAttribute("view-model");
        if (viewModelAttribute) {
            processAttribute("view-model", viewModelAttribute);
        }
        //process component specific attributes
        let modelAttrs = Array.from(node.attributes)
            .filter((attr) => attr.value.startsWith("@") && attr.name !== "view-model");
        modelAttrs.forEach((attr) => {
            processAttribute(attr.name, attr.value);
        });
        if (node.tagName.toLowerCase() !== "psk-for-each") {
            Array.from(node.children).forEach((node) => {
                this.__processNode.call(this, node, chain);
            });
        }
    }
    get __host() { return getElement(this); }
};
__decorate([
    TableOfContentProperty({
        description: [`This property is the name of the model which will be used to generate the form. The model should be a JavaScript array.`,
            `All the information about how to write a model, hot to use the two-way binding and how to use the model with this component cand be found in the documentation found at: <psk-link page="forms/using-forms">Using forms</psk-link>`],
        isMandatory: true,
        propertyType: 'string',
        specialNote: [`If this property is not provided, nothing written inside the component's template will be displayed.`]
    })
], PskForEach.prototype, "dataViewModel", void 0);

export { PskForEach as psk_for_each };
