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
const PskInput = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.__keyUpHandler = (event) => {
            event.stopImmediatePropagation();
            let value = event.target.value;
            this.modelHandler.updateModel('value', value);
        };
        this.type = 'text';
        this.label = null;
        this.value = null;
        this.name = null;
        this.placeholder = null;
        this.required = false;
        this.readOnly = false;
        this.invalidValue = null;
        this.dataDateFormat = null;
        /**
         * Property used only by other components
         * psk-text-input, psk-email-input...
         */
        this.specificProps = {};
    }
    render() {
        const invalidClass = this.invalidValue === null ? ''
            : this.invalidValue ? 'is-invalid' : 'is-valid';
        const inputName = this.name ? this.name
            : (this.label && this.label.replace(/( |:|\/|\.|-)/g, "").toLowerCase());
        return (h("div", { class: `form-group` }, this.label && h("psk-label", { for: inputName, label: this.label }), h("input", Object.assign({ type: this.type, value: this.value, name: inputName, class: `form-control ${invalidClass}`, placeholder: this.placeholder, required: this.required, readOnly: this.readOnly, onKeyUp: this.__keyUpHandler.bind(this) }, this.specificProps))));
    }
};
__decorate([
    CustomTheme(),
    BindModel()
], PskInput.prototype, "modelHandler", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies the type psk-input to display.`,
            `The full list of type and explanations can be found at: <a href="https://www.w3schools.com/html/html_form_input_types.asp">HTML Input Types</a>`],
        isMandatory: false,
        propertyType: 'string',
        defaultValue: 'text',
        specialNote: `If no value is provided, "text" is assumed`
    })
], PskInput.prototype, "type", void 0);
__decorate([
    TableOfContentProperty({
        description: [`By filling out this property, the component will display above it, a label using <psk-link page="forms/psk-label">psk-label</psk-link> component.`],
        isMandatory: false,
        propertyType: 'string',
        specialNote: `If this property is not provided, the component will be displayed without any label`
    })
], PskInput.prototype, "label", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies the value of an psk-input component.`,
            `This value is updated also in the model using the two-way binding. Information about two-way binding using models and templates can be found at: <psk-link page="forms/using-forms">Using forms</psk-link>.`],
        isMandatory: false,
        propertyType: 'string'
    })
], PskInput.prototype, "value", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies the name of a psk-input component. It is used along with the psk-label component.`],
        isMandatory: false,
        propertyType: 'string'
    })
], PskInput.prototype, "name", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies a short hint that describes the expected value of an psk-input component`],
        isMandatory: false,
        propertyType: 'string'
    })
], PskInput.prototype, "placeholder", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies that an input field must be filled out before submitting the form.`,
            `Accepted values: "true" and "false"`],
        isMandatory: false,
        propertyType: 'boolean'
    })
], PskInput.prototype, "required", void 0);
__decorate([
    TableOfContentProperty({
        description: [`	Specifies that an input field is read-only.`,
            `Accepted values: "true" and "false"`],
        isMandatory: false,
        propertyType: 'boolean'
    })
], PskInput.prototype, "readOnly", void 0);
__decorate([
    TableOfContentProperty({
        description: [`This property indicates if the value entered by the user is a valid one according to some validation present in the controller.`],
        isMandatory: false,
        propertyType: 'boolean'
    })
], PskInput.prototype, "invalidValue", void 0);
__decorate([
    TableOfContentProperty({
        isMandatory: false,
        description: ``,
        propertyType: 'string'
    })
], PskInput.prototype, "dataDateFormat", void 0);

export { PskInput as psk_input };
