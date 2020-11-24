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
const PskRadioGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.options = null;
        this.label = null;
        this.value = null;
        this.name = null;
        this.required = false;
        this.invalid = true;
    }
    onChangeRadioHandler(evt) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        if (!evt.detail || !evt.detail.value) {
            return;
        }
        const radioButtons = this._host.querySelectorAll("psk-radio");
        radioButtons.forEach((radio) => {
            const inputRadio = radio.getElementsByTagName('input')[0];
            if (inputRadio.value === evt.detail.value) {
                this.value = evt.detail.value;
                this.__updateModel.call(this);
                inputRadio.checked = true;
            }
            else {
                inputRadio.checked = false;
            }
        });
    }
    render() {
        return (h("div", { class: "form-group" }, h("psk-label", { for: this.name, label: this.label }), h("div", { id: "psk-radio-group", class: `form-group` }, this.options && this.options.map((option) => {
            const inputName = option.name ? option.name
                : (option.label && option.label.replace(/\s/g, '').toLowerCase());
            return h("psk-radio", Object.assign({}, option, { name: inputName }));
        }), h("slot", null))));
    }
    __updateModel() {
        this.modelHandler.updateModel('value', this.value);
    }
    get _host() { return getElement(this); }
};
__decorate([
    CustomTheme(),
    BindModel()
], PskRadioGroup.prototype, "modelHandler", void 0);
__decorate([
    TableOfContentProperty({
        description: [`By filling out this property, the component will display above the group, a label using <psk-link page="forms/psk-label">psk-label</psk-link> component.`],
        isMandatory: false,
        propertyType: 'string',
        specialNote: `If this property is not provided, the component will be displayed without any label`
    })
], PskRadioGroup.prototype, "label", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies the selected value of a psk-radio component inside the group.`,
            `This value is updated also in the model using the two-way binding. Information about two-way binding using models and templates can be found at: <psk-link page="forms/using-forms">Using forms</psk-link>.`],
        isMandatory: false,
        propertyType: 'string'
    })
], PskRadioGroup.prototype, "value", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies the name of a psk-radio-group component. It is used along with the psk-label component.`],
        isMandatory: false,
        propertyType: 'string'
    })
], PskRadioGroup.prototype, "name", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies that a psk-radio inside the group must be checked before submitting the form.`,
            `Accepted values: "true" and "false"`],
        isMandatory: false,
        propertyType: 'boolean',
        defaultValue: "false"
    })
], PskRadioGroup.prototype, "required", void 0);
__decorate([
    TableOfContentProperty({
        description: [`This property indicates if the value entered by the user is a valid one according to some validation present in the controller.`],
        isMandatory: false,
        propertyType: 'boolean',
        specialNote: `For the moment, there is no visual implelentation for this attribute, but it will be in a further iteration.`
    })
], PskRadioGroup.prototype, "invalid", void 0);

export { PskRadioGroup as psk_radio_group };
