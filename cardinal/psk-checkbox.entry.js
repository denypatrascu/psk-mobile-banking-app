import { r as registerInstance, h } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import { k as stringToBoolean } from './utilFunctions-74de6735.js';
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
const PskCheckbox = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.name = null;
        this.required = false;
        this.checked = null;
        this.value = false;
        this.checkedValue = null;
        this.uncheckedValue = null;
    }
    render() {
        const checkboxName = this.name ? this.name
            : this.checkboxLabel ? this.checkboxLabel.replace(/\s/g, '').toLowerCase() : '';
        let isChecked = stringToBoolean(this.checked);
        const checkboxHtml = (h("div", { class: "form-group" }, h("div", { class: "form-check form-check-inline" }, h("input", { type: "checkbox", class: "form-check-input", id: checkboxName, name: checkboxName, required: this.required, defaultChecked: isChecked, onChange: this.__handleCheckbox.bind(this), value: this.value }), h("psk-label", { for: checkboxName, label: this.checkboxLabel }))));
        return this.label
            ? (h("div", { class: "form-group" }, h("psk-label", { label: this.label }), checkboxHtml))
            : checkboxHtml;
    }
    __handleCheckbox(evt) {
        this.checked = evt.target.checked;
        if (evt.target.checked) {
            this.value = this.checkedValue ? this.checkedValue : true;
        }
        else {
            this.value = this.uncheckedValue ? this.uncheckedValue : false;
        }
        this.modelHandler.updateModel('value', this.value);
    }
};
__decorate([
    CustomTheme(),
    BindModel()
], PskCheckbox.prototype, "modelHandler", void 0);
__decorate([
    TableOfContentProperty({
        description: [`By filling out this property, the component will display above it, a label using <psk-link page="forms/psk-label">psk-label</psk-link> component.`],
        isMandatory: false,
        propertyType: 'string',
        specialNote: `If this property is not provided, the component will be displayed without any label`
    })
], PskCheckbox.prototype, "label", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies the name of a psk-checkbox component. It is used along with the psk-label component.`],
        isMandatory: false,
        propertyType: 'string'
    })
], PskCheckbox.prototype, "name", void 0);
__decorate([
    TableOfContentProperty({
        description: [`By filling out this property, the component will display near the checkbox, a label using <psk-link page="forms/psk-label">psk-label</psk-link> component.`],
        isMandatory: false,
        propertyType: 'string',
        specialNote: `If this property is not provided, the component will be displayed without any label`
    })
], PskCheckbox.prototype, "checkboxLabel", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies that the psk-checkbox must be checked before submitting the form.`,
            `Accepted values: "true" and "false"`],
        isMandatory: false,
        propertyType: 'boolean',
        defaultValue: "false"
    })
], PskCheckbox.prototype, "required", void 0);
__decorate([
    TableOfContentProperty({
        description: [`This property indicates the status of the component, if it checked or not. Also, by using this property, you can set the default value of the psk-checkbox, in case you need it to be checked.`],
        isMandatory: false,
        propertyType: 'boolean'
    })
], PskCheckbox.prototype, "checked", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies the value of a psk-checkbox component.`,
            `This value is updated also in the model using the two-way binding. Information about two-way binding using models and templates can be found at: <psk-link tag="using-forms">Using forms</psk-link>.`],
        isMandatory: false,
        propertyType: 'string'
    })
], PskCheckbox.prototype, "value", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies the value that will be assigned to the component when it is checked.`],
        isMandatory: false,
        propertyType: 'string'
    })
], PskCheckbox.prototype, "checkedValue", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies the value that will be assigned to the component when it is unchecked.`],
        isMandatory: false,
        propertyType: 'string'
    })
], PskCheckbox.prototype, "uncheckedValue", void 0);

export { PskCheckbox as psk_checkbox };
