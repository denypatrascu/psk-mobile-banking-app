import { r as registerInstance, h } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
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
const PskStepperRenderer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    computeStepDesign(stepIndex, activeStepIndex, lastStepIndex) {
        let stepClass = "";
        if (stepIndex === 0) {
            stepClass += "first ";
        }
        else if (stepIndex === lastStepIndex) {
            stepClass += "last ";
        }
        if (stepIndex < activeStepIndex) {
            stepClass += "done";
        }
        else if (stepIndex === activeStepIndex) {
            stepClass += "current";
        }
        return stepClass;
    }
    render() {
        return (h("div", { class: "steps clearfix" }, h("ul", { role: "tablist" }, this.wizardSteps.map((step) => (h("li", { role: "tab", class: this.computeStepDesign(step.stepIndex, this.activeStep.stepIndex, this.wizardSteps.length - 1) }, h("div", { class: "button", onClick: (ev) => {
                ev.preventDefault();
                ev.stopImmediatePropagation();
                this.handleStepChange(step.stepIndex);
            } }, h("span", { class: "current-info audible" }), h("div", { class: "title" }, h("p", { class: "step-icon" }, h("span", null, step.stepIndex + 1)), h("div", { class: "step-text" }, h("span", { class: "step-inner" }, step.stepName))))))))));
    }
};
__decorate([
    CustomTheme(),
    TableOfContentProperty({
        description: `This property holds an array of:
            wizard configuration
            the names of the steps
            the components that will be displayed
            other properties, like information for the steps.(optional).`,
        isMandatory: false,
        propertyType: `array for WizardStep items(WizardStep[])`,
        defaultValue: `psk-stepper-renderer`
    })
], PskStepperRenderer.prototype, "wizardSteps", void 0);
__decorate([
    TableOfContentProperty({
        description: `The WizardStep created by psk-wizard and passed on by psk-stepper.`,
        isMandatory: true,
        propertyType: `WizardStep`
    })
], PskStepperRenderer.prototype, "activeStep", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property is a function that modifies the way the step change is interpreted.`,
        isMandatory: true,
        propertyType: `Function`
    })
], PskStepperRenderer.prototype, "handleStepChange", void 0);

export { PskStepperRenderer as psk_stepper_renderer };
