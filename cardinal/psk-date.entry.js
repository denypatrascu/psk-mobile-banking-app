import { r as registerInstance, h } from './index-bb32d9fe.js';
import { j as DATE_FORMAT_MASKS } from './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { B as BindModel } from './BindModel-524e1a2c.js';
import { C as CustomTheme } from './CustomTheme-f57ed858.js';
import { T as TableOfContentProperty } from './TableOfContentProperty-de8188be.js';

class DateFormat {
    constructor(dateValue, format) {
        this.dateToken = /dd|mm|yyyy|MM|HH|s{2,3}/g;
        this.format = format || DATE_FORMAT_MASKS.default;
        this.date = dateValue ? new Date(dateValue) : new Date();
        const day = this.date.getDate();
        const month = this.date.getMonth() + 1;
        const year = this.date.getFullYear();
        const hours = this.date.getHours();
        const minutes = this.date.getMinutes();
        const seconds = this.date.getSeconds();
        const milliseconds = this.date.getMilliseconds();
        this.dateValues = {
            dd: this._addLeadingZeros(day),
            mm: this._addLeadingZeros(month),
            yyyy: this._addLeadingZeros(year, 4),
            HH: this._addLeadingZeros(hours),
            MM: this._addLeadingZeros(minutes),
            ss: this._addLeadingZeros(seconds),
            sss: this._addLeadingZeros(milliseconds)
        };
    }
    applyFormat(format) {
        const dateFormat = DATE_FORMAT_MASKS[format] || format || this.format;
        return dateFormat.replace(this.dateToken, (match) => {
            if (match in this.dateValues) {
                return this.dateValues[match];
            }
            return match.slice(1, match.length - 1);
        });
    }
    /* ###################### INTERNAL METHODS ###################### */
    _addLeadingZeros(value, len = 2) {
        value = String(value);
        while (value.length < len) {
            value = '0' + value;
        }
        return value;
    }
}

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
const PskDate = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.value = null;
        this.format = 'mm dd yyyy';
        this.hoverFormat = DATE_FORMAT_MASKS.default;
    }
    render() {
        if (!new Date(this.value).getTime()) {
            return null;
        }
        const formattedDate = new DateFormat(this.value).applyFormat(this.format);
        const hoverFormattedDate = new DateFormat(this.value).applyFormat(this.hoverFormat);
        return h("psk-label", { label: formattedDate, title: hoverFormattedDate });
    }
};
__decorate([
    CustomTheme(),
    BindModel()
], PskDate.prototype, "modelHandler", void 0);
__decorate([
    TableOfContentProperty({
        description: ['Specifies the value of the date to be formatted.',
            'It can be a string representation of the date, but also can be the timestamp value of the date.',
            'The string representation of the date must comply with the documentation of the Date object available on: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date'],
        isMandatory: true,
        propertyType: 'string | number'
    })
], PskDate.prototype, "value", void 0);
__decorate([
    TableOfContentProperty({
        description: ['Specifies how to format the displayed date according to the above described available formats.'],
        isMandatory: false,
        propertyType: 'string',
        defaultValue: 'mm dd yyyy'
    })
], PskDate.prototype, "format", void 0);
__decorate([
    TableOfContentProperty({
        description: ['This property is used to display a tooltip of the formatted date when hover the displayed date. This is very useful when you want to display a more detailed date for the user.'],
        isMandatory: false,
        propertyType: 'string',
        defaultValue: 'No default value'
    })
], PskDate.prototype, "hoverFormat", void 0);

export { PskDate as psk_date };
