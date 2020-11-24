import { r as registerInstance, f as createEvent, h, g as getElement } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import { j as normalizeModelChain, k as stringToBoolean } from './utilFunctions-74de6735.js';
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
const SLOT_CONDITION_FALSE = 'condition-false';
const SLOT_CONDITION_TRUE = 'condition-true';
const PskCondition = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.getModelEvent = createEvent(this, "getModelEvent", 7);
        this.condition = null;
        this.conditionResult = false;
        this.falseSlot = null;
        this.trueSlot = null;
    }
    componentWillLoad() {
        if (!this._host.isConnected) {
            return;
        }
        this.modelChain = this.condition;
        this.modelChain = normalizeModelChain(this.modelChain);
        let checkCondition = (model) => {
            if (model.hasExpression(this.modelChain)) {
                let evaluateExpression = () => {
                    this.condition = model.evaluateExpression(this.modelChain);
                };
                model.onChangeExpressionChain(this.modelChain, evaluateExpression);
                evaluateExpression();
            }
            else {
                let evaluateCondition = () => {
                    this.condition = model.getChainValue(this.modelChain);
                };
                model.onChange(this.modelChain, evaluateCondition);
                evaluateCondition();
            }
            this.falseSlot = null;
            const children = Array.from(this._host.children);
            let trueSlotsElements = children.filter((child) => {
                const slotName = child.getAttribute('slot');
                return slotName === SLOT_CONDITION_TRUE;
            });
            this.trueSlot = trueSlotsElements.map((slotElement) => { return slotElement.outerHTML; }).join("");
            let falseSlotsElements = children.filter((child) => {
                const slotName = child.getAttribute('slot');
                return slotName === SLOT_CONDITION_FALSE;
            });
            this.falseSlot = falseSlotsElements.map((slotElement) => { return slotElement.outerHTML; }).join("");
            if (this.trueSlot.length === 0 && this.falseSlot.length === 0) {
                this.trueSlot = children.map(child => {
                    return child.outerHTML;
                }).join("");
            }
            this._host.innerHTML = "";
        };
        return new Promise((resolve) => {
            this.getModelEvent.emit({
                callback: (err, model) => {
                    if (err) {
                        console.log(err);
                    }
                    checkCondition(model);
                    this._updateConditionResult().then(() => {
                        resolve();
                    });
                }
            });
        });
    }
    componentWillUpdate() {
        return this._updateConditionResult();
    }
    _updateConditionResult() {
        let conditionPromise;
        if (this.condition instanceof Promise) {
            conditionPromise = this.condition;
        }
        else {
            conditionPromise = Promise.resolve(this.condition);
        }
        return conditionPromise.then((result) => {
            this.conditionResult = stringToBoolean(result);
            return Promise.resolve();
        });
    }
    render() {
        return h("psk-hoc", { innerHTML: this.conditionResult ? this.trueSlot : this.falseSlot });
    }
    get _host() { return getElement(this); }
};
__decorate([
    TableOfContentProperty({
        description: `The property value must be the name of a model property or expression. Children are rendered only if the value of the condition is evaluated to true`,
        isMandatory: true,
        propertyType: `any`
    })
], PskCondition.prototype, "condition", void 0);

export { PskCondition as psk_condition };
