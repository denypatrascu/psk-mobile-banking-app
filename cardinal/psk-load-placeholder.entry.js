import { r as registerInstance, h } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { C as CustomTheme } from './CustomTheme-f57ed858.js';

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
const PskLoadPlaceholder = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.shouldBeRendered = false;
    }
    componentDidLoad() {
        setTimeout(() => {
            this.shouldBeRendered = true;
        }, 0);
    }
    render() {
        if (this.shouldBeRendered) {
            return (h("slot", null));
        }
    }
};
__decorate([
    CustomTheme()
], PskLoadPlaceholder.prototype, "shouldBeRendered", void 0);

export { PskLoadPlaceholder as psk_load_placeholder };
