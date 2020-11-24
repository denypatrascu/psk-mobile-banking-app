import { r as registerInstance, f as createEvent, h } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { B as BindModel } from './BindModel-524e1a2c.js';
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
const PskRadio = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.onChangeRadio = createEvent(this, "onChangeRadio", 5);
        this.label = null;
        this.value = null;
        this.name = null;
        this.readOnly = false;
        this.invalidValue = null;
        this.checked = false;
    }
    render() {
        const inputName = this.name ? this.name
            : (this.label && this.label.replace(/\s/g, '').toLowerCase());
        const inputValue = this.value ? this.value : inputName;
        return (h("div", { class: "form-check form-check-inline" }, h("input", { type: "radio", class: "form-check-input", value: inputValue, name: inputName, readOnly: this.readOnly, checked: this.checked, onChange: this.__handleRadioChange.bind(this) }), h("psk-label", { for: inputName, label: this.label })));
    }
    __handleRadioChange(evt) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        this.onChangeRadio.emit({
            value: evt.target.value
        });
    }
};
__decorate([
    CustomTheme(),
    BindModel()
], PskRadio.prototype, "modelHandler", void 0);
__decorate([
    TableOfContentProperty({
        description: [`By filling out this property, the component will display near it, a label using <psk-link page="forms/psk-label">psk-label</psk-link> component.`],
        isMandatory: false,
        propertyType: 'string',
        specialNote: `If this property is not provided, the component will be displayed without any label`
    })
], PskRadio.prototype, "label", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies the value of a psk-radio component.`,
            `This value is updated also in the model using the two-way binding. Information about two-way binding using models and templates can be found at: <psk-link page="forms/using-forms">Using forms</psk-link>.`],
        isMandatory: false,
        propertyType: 'string'
    })
], PskRadio.prototype, "value", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies the name of a psk-radio component. It is used along with the psk-label component.`],
        isMandatory: false,
        propertyType: 'string'
    })
], PskRadio.prototype, "name", void 0);
__decorate([
    TableOfContentProperty({
        description: [`	Specifies that a psk-radio is read-only and it cannot be changed.`,
            `Accepted values: "true" and "false"`],
        isMandatory: false,
        propertyType: 'boolean',
        defaultValue: "false"
    })
], PskRadio.prototype, "readOnly", void 0);
__decorate([
    TableOfContentProperty({
        description: [`This property indicates if the value entered by the user is a valid one according to some validation present in the controller.`],
        isMandatory: false,
        propertyType: 'boolean'
    })
], PskRadio.prototype, "invalidValue", void 0);
__decorate([
    TableOfContentProperty({
        description: [`This property indicates the status of the component, if it checked or not. Also, by using this property, you can set the default value of the radio, in case you need it to be checked.`],
        isMandatory: false,
        propertyType: 'boolean'
    })
], PskRadio.prototype, "checked", void 0);
__decorate([
    TableOfContentEvent({
        description: ["This event is being triggered when a radio button is checked.",
            "The event bubbles to the parent component, psk-radio-group, where the component will handle the selection of the radio."],
        specialNote: "This event is not composed, it will not bubble outside the form!"
    })
], PskRadio.prototype, "onChangeRadio", void 0);

export { PskRadio as psk_radio };
