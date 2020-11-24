import { r as registerInstance, g as getElement, h } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { B as BindModel } from './BindModel-524e1a2c.js';

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
const PskLabelTest = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.connectedCallback = function () {
            let thisElement = getElement(this);
            console.log("TEST: Connected", thisElement);
        };
        this.myState = "@ceva";
    }
    componentWillLoad() {
        let thisElement = getElement(this);
        console.log("TEST: WillLoad", thisElement);
        console.log(thisElement.getAttributeNames());
    }
    componentDidLoad() {
        console.log("Loaded");
        let thisElement = getElement(this);
        console.log("TEST: WillLoad", thisElement);
        console.log(thisElement.getAttributeNames());
    }
    render() {
        let thisElement = getElement(this);
        console.log("TEST: WillLoad", thisElement);
        console.log(thisElement.getAttributeNames());
        return (h("span", { class: "col-form-label" }, "# 1: ", this.firstlabel, h("br", null), "# 2: ", this.secondLabel, h("br", null), "# 3: ", this.thirdLabel, h("br", null), "# 4: ", this.labelValue));
    }
};
__decorate([
    BindModel()
], PskLabelTest.prototype, "modelHandler", void 0);

export { PskLabelTest as psk_label_test };
