import { r as registerInstance, h, g as getElement } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import { g as normalizeElementId } from './utilFunctions-74de6735.js';

const PskPropertyDescriptor = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.title = '';
        this.decoratorProperties = [];
    }
    receivedPropertiesDescription(evt) {
        const targetTag = evt.detail.tag;
        const sourceTag = this.__host.children[0].tagName.toLowerCase();
        if (targetTag === sourceTag) {
            const props = evt.detail.props;
            evt.stopImmediatePropagation();
            if (props && props.length > 0) {
                this.decoratorProperties = JSON.parse(JSON.stringify(props));
            }
        }
    }
    async componentWillLoad() {
        this.__setDefineProp();
    }
    async connectedCallback() {
        this.__setDefineProp();
    }
    async componentDidLoad() {
        this.__setDefineProp();
    }
    __setDefineProp() {
        const element = this.__host.children[0];
        if (!element.hasAttribute('data-define-props')) {
            element.setAttribute('hidden', 'true');
            element.setAttribute('data-define-props', 'true');
        }
    }
    render() {
        let componentPropertiesDefinitions = this.decoratorProperties.map((prop) => {
            const cardSubtitle = `${prop.propertyName}${prop.isMandatory ? "" : "?"}: ${prop.propertyType} ${prop.isMandatory ? "(mandatory)" : "(optional)"}`;
            return (h("psk-chapter-wrapper", { title: prop.propertyName }, h("p", { class: "subtitle" }, h("i", null, cardSubtitle)), (prop.description
                ? Array.isArray(prop.description)
                    ? prop.description.map(line => h("p", { innerHTML: line }))
                    : h("p", null, prop.description)
                : null), prop.specialNote ? (h("p", null, h("b", null, "Note: ", prop.specialNote))) : null, prop.defaultValue ? (h("p", null, h("i", null, "Default value: ", prop.defaultValue))) : null));
        });
        return (h("psk-chapter", { title: this.title, id: normalizeElementId(this.title) }, componentPropertiesDefinitions));
    }
    get __host() { return getElement(this); }
};

export { PskPropertyDescriptor as psk_property_descriptor };
