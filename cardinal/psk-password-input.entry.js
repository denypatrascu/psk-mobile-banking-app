import { r as registerInstance, h } from './index-d1085cc4.js';
import './constants-507b64b1.js';
import './utilFunctions-5499adff.js';
import { B as BindModel } from './BindModel-8ea50ef5.js';
import { C as CustomTheme } from './CustomTheme-3f558a4e.js';
import { T as TableOfContentProperty } from './TableOfContentProperty-900b66d0.js';

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
const PskPasswordInput = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.__inputHandler = (event) => {
            event.stopImmediatePropagation();
            let value = event.target.value;
            this.modelHandler.updateModel('value', value);
        };
        this.label = null;
        this.value = null;
        this.name = null;
        this.placeholder = null;
        this.required = false;
        this.readOnly = false;
        this.invalidValue = null;
    }
    render() {
        return h("psk-input", { type: "password", label: this.label, name: this.name, value: this.value, placeholder: this.placeholder, required: this.required, readOnly: this.readOnly, invalidValue: this.invalidValue, specificProps: {
                onKeyUp: this.__inputHandler.bind(this),
                onChange: this.__inputHandler.bind(this)
            } });
    }
};
__decorate([
    CustomTheme(),
    BindModel()
], PskPasswordInput.prototype, "modelHandler", void 0);
__decorate([
    TableOfContentProperty({
        description: [`By filling out this property, the component will display above it, a label using <psk-link page="forms/psk-label">psk-label</psk-link> component.`],
        isMandatory: false,
        propertyType: 'string',
        specialNote: `If this property is not provided, the component will be displayed without any label`
    })
], PskPasswordInput.prototype, "label", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies the value of an psk-password-input component.`,
            `This value is updated also in the model using the two-way binding. Information about two-way binding using models and templates can be found at: <psk-link page="forms/using-forms">Using forms</psk-link>.`],
        isMandatory: false,
        propertyType: 'string'
    })
], PskPasswordInput.prototype, "value", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies the name of a psk-password-input component. It is used along with the psk-label component.`],
        isMandatory: false,
        propertyType: 'string'
    })
], PskPasswordInput.prototype, "name", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies a short hint that describes the expected value of an psk-password-input component`],
        isMandatory: false,
        propertyType: 'string'
    })
], PskPasswordInput.prototype, "placeholder", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies that an input field must be filled out before submitting the form.`,
            `Accepted values: "true" and "false"`],
        isMandatory: false,
        propertyType: 'boolean',
        defaultValue: "false"
    })
], PskPasswordInput.prototype, "required", void 0);
__decorate([
    TableOfContentProperty({
        description: [`	Specifies that an input field is read-only.`,
            `Accepted values: "true" and "false"`],
        isMandatory: false,
        propertyType: 'boolean',
        defaultValue: "false"
    })
], PskPasswordInput.prototype, "readOnly", void 0);
__decorate([
    TableOfContentProperty({
        description: [`This property indicates if the value entered by the user is a valid one according to some validation present in the controller.`],
        isMandatory: false,
        propertyType: 'boolean'
    })
], PskPasswordInput.prototype, "invalidValue", void 0);

export { PskPasswordInput as psk_password_input };
