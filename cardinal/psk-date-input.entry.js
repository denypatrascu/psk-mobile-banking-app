import { r as registerInstance, h } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { B as BindModel } from './BindModel-524e1a2c.js';
import { C as CustomTheme } from './CustomTheme-f57ed858.js';
import { T as TableOfContentProperty } from './TableOfContentProperty-de8188be.js';

const pskDateInputCss = ".formated-date{position:relative;color:transparent!important}.formated-date:before{position:absolute;top:0.45rem;left:0.7rem;content:attr(data-date);display:inline-block;color:#333333}.formated-date::-webkit-datetime-edit,.formated-date::-webkit-inner-spin-button,.formated-date::-webkit-clear-button{display:none}.formated-date::-webkit-calendar-picker-indicator{position:absolute;top:0.41rem;right:0.8rem;opacity:1}";

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
const YEAR_LEADING_ZEROS = {
    0: '',
    1: '0',
    2: '00',
    3: '000'
};
const PskDateInput = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.__getBrowser = () => {
            let userAgent = navigator.userAgent, tem, M = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if (/trident/i.test(M[1])) {
                tem = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
                return { name: 'IE', version: (tem[1] || '') };
            }
            if (M[1] === 'Chrome') {
                tem = userAgent.match(/\bOPR|Edge\/(\d+)/);
                if (tem != null) {
                    return { name: 'Opera', version: tem[1] };
                }
            }
            M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
            if ((tem = userAgent.match(/version\/(\d+)/i)) != null) {
                M.splice(1, 1, tem[1]);
            }
            return {
                name: M[0],
                version: M[1]
            };
        };
        this.__isSafari = () => {
            return this.__getBrowser().name.indexOf('Safari') !== -1;
        };
        this.__inputHandler = (event) => {
            event.stopImmediatePropagation();
            if (!this.__isSafari()) {
                this.__focusOutHandler(event);
            }
        };
        this.__focusOutHandler = (event) => {
            event.stopImmediatePropagation();
            let currentDate = event.target.value;
            if (currentDate && currentDate.trim().length) {
                const newValue = new Date(currentDate).getTime();
                this.modelHandler.updateModel('value', newValue);
            }
        };
        this.__getFormattedDate = () => {
            if (!this.value || !this.value.trim().length) {
                return {};
            }
            let newDate = new Date(parseInt(this.value));
            const utcYear = newDate.getUTCFullYear();
            const utcMonth = newDate.getUTCMonth() + 1;
            const utcDayOfMonth = newDate.getUTCDate();
            const day = utcDayOfMonth <= 9 ? `0${utcDayOfMonth}` : `${utcDayOfMonth}`;
            const month = utcMonth <= 9 ? `0${utcMonth}` : `${utcMonth}`;
            let year = utcYear.toString();
            const leadingZeros = year.length < 4 ? 4 - year.length : 0;
            year = `${YEAR_LEADING_ZEROS[leadingZeros]}${year}`;
            const dateVariables = {
                "DD": day,
                "MM": month,
                "YYYY": year
            };
            const dateValue = "YYYY MM DD".split(' ')
                .map((type) => dateVariables[type])
                .join("-");
            const formattedDate = this.dataFormat
                ? this.dataFormat.trim()
                    .split(' ')
                    .map((type) => dateVariables[type])
                    .join('/')
                : dateValue;
            return {
                dateToDisplay: formattedDate,
                dateToAssign: dateValue
            };
        };
        this.label = null;
        this.value = null;
        this.name = null;
        this.placeholder = null;
        this.required = "false";
        this.readOnly = false;
        this.invalidValue = null;
        this.dataFormat = null;
    }
    render() {
        const { dateToDisplay, dateToAssign } = this.__getFormattedDate();
        return h("psk-input", { type: "date", label: this.label, name: this.name, value: dateToAssign, placeholder: this.placeholder, required: this.required === 'true', readOnly: this.readOnly, invalidValue: this.invalidValue, specificProps: {
                onKeyUp: this.__inputHandler.bind(this),
                onChange: this.__inputHandler.bind(this),
                onfocusout: this.__focusOutHandler.bind(this),
                "data-date": dateToDisplay,
                class: this.dataFormat && !this.__isSafari() ? "form-control formated-date" : 'form-control'
            } });
    }
};
__decorate([
    CustomTheme(),
    BindModel()
], PskDateInput.prototype, "modelHandler", void 0);
__decorate([
    TableOfContentProperty({
        description: [`By filling out this property, the component will display above it, a label using <psk-link page="forms/psk-label">psk-label</psk-link> component.`],
        isMandatory: false,
        propertyType: 'string',
        specialNote: `If this property is not provided, the component will be displayed without any label`
    })
], PskDateInput.prototype, "label", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies the value of an psk-date-input component.`,
            `This value is updated also in the model using the two-way binding. Information about two-way binding using models and templates can be found at: <psk-link page="forms/using-forms">Using forms</psk-link>.`,
            `This property should respect the format give nto the data-format property.`],
        isMandatory: false,
        propertyType: 'string'
    })
], PskDateInput.prototype, "value", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies the name of a psk-date-input component. It is used along with the psk-label component.`],
        isMandatory: false,
        propertyType: 'string'
    })
], PskDateInput.prototype, "name", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies a short hint that describes the expected value of an psk-date-input component`],
        isMandatory: false,
        propertyType: 'string'
    })
], PskDateInput.prototype, "placeholder", void 0);
__decorate([
    TableOfContentProperty({
        description: [`Specifies that an input field must be filled out before submitting the form.`,
            `Accepted values: "true" and "false"`],
        isMandatory: false,
        propertyType: 'boolean',
        defaultValue: "false"
    })
], PskDateInput.prototype, "required", void 0);
__decorate([
    TableOfContentProperty({
        description: [`	Specifies that an input field is read-only.`,
            `Accepted values: "true" and "false"`],
        isMandatory: false,
        propertyType: 'boolean',
        defaultValue: "false"
    })
], PskDateInput.prototype, "readOnly", void 0);
__decorate([
    TableOfContentProperty({
        description: [`This property indicates if the value entered by the user is a valid one according to some validation present in the controller.`],
        isMandatory: false,
        propertyType: 'boolean'
    })
], PskDateInput.prototype, "invalidValue", void 0);
__decorate([
    TableOfContentProperty({
        isMandatory: false,
        description: `This property is the format of the date. At the moment the component can format only "MM DD YYYY", "DD MM YYYY", "MM YYYY DD", "YYYY MM DD", "YYYY DD MM" and "DD YYYY MM".`,
        propertyType: 'string',
        defaultValue: "null"
    })
], PskDateInput.prototype, "dataFormat", void 0);
PskDateInput.style = pskDateInputCss;

export { PskDateInput as psk_date_input };
