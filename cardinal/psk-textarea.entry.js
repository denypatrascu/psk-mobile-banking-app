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
const PskTextArea = class {
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
        const invalidClass = this.invalidValue === null ? ''
            : this.invalidValue ? 'is-invalid' : 'is-valid';
        return (h("div", { class: `form-group` }, this.label && h("psk-label", { for: this.name, label: this.label }), h("textarea", { name: this.name, value: this.value, placeholder: this.placeholder, required: this.required, class: `form-control ${invalidClass}`, readOnly: this.readOnly, onKeyUp: this.__inputHandler.bind(this), onChange: this.__inputHandler.bind(this) })));
    }
};
__decorate([
    CustomTheme(),
    BindModel()
], PskTextArea.prototype, "modelHandler", void 0);
__decorate([
    TableOfContentProperty({
        description: [`By filling out this property, the component will display above it, a label using <psk-link tag="psk-label">psk-label</psk-link> component.`],
        isMandatory: false,
        propertyType: 'string',
        specialNote: `If this property is not provided, the component will be displayed without any label`
    })
], PskTextArea.prototype, "label", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies the value of an psk-textarea component.`,
            `This value is updated also in the model using the two-way binding. Information about two-way binding using models and templates can be found at: <psk-link tag="using-forms">Using forms</psk-link>.`],
        isMandatory: false,
        propertyType: 'string'
    })
], PskTextArea.prototype, "value", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies the name of a psk-textarea component. It is used along with the psk-label component.`],
        isMandatory: false,
        propertyType: 'string'
    })
], PskTextArea.prototype, "name", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies a short hint that describes the expected value of the psk-textarea component`],
        isMandatory: false,
        propertyType: 'string'
    })
], PskTextArea.prototype, "placeholder", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies that the textarea field must be filled out before submitting the form.`,
            `Accepted values: "true" and "false"`],
        isMandatory: false,
        propertyType: 'boolean'
    })
], PskTextArea.prototype, "required", void 0);
__decorate([
    TableOfContentProperty({
        description: [`	Specifies that the textarea input field is read-only.`,
            `Accepted values: "true" and "false"`],
        isMandatory: false,
        propertyType: 'boolean'
    })
], PskTextArea.prototype, "readOnly", void 0);
__decorate([
    TableOfContentProperty({
        description: [`This property indicates if the value entered by the user is a valid one according to some validation present in the controller.`],
        isMandatory: false,
        propertyType: 'boolean'
    })
], PskTextArea.prototype, "invalidValue", void 0);

export { PskTextArea as psk_textarea };
