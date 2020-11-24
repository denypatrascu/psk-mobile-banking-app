import { r as registerInstance } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { B as BindModel } from './BindModel-524e1a2c.js';
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
const PskEcho = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.value = null;
    }
    render() {
        return (this.value ? this.value : null);
    }
};
__decorate([
    BindModel()
], PskEcho.prototype, "modelHandler", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property is a string that will permit the developer to print a bound value from controller.`,
        propertyType: `string | null`,
        isMandatory: true,
        defaultValue: `null`
    })
], PskEcho.prototype, "value", void 0);

export { PskEcho as psk_echo };
