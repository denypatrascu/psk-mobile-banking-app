import { r as registerInstance, f as createEvent, h, g as getElement } from './index-bb32d9fe.js';
import { E as EVENTS_TYPES } from './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { B as BindModel } from './BindModel-524e1a2c.js';
import { C as CustomTheme } from './CustomTheme-f57ed858.js';
import { T as TableOfContentEvent } from './TableOfContentEvent-f33bf2c4.js';
import { T as TableOfContentProperty } from './TableOfContentProperty-de8188be.js';

const EVENT_TYPE = EVENTS_TYPES.PSK_WIZARD_EVT;
class WizardEvent extends CustomEvent {
    constructor(eventName, eventData, eventOptions) {
        super(eventName, eventOptions);
        this.getEventType = function () {
            return EVENT_TYPE;
        };
        this.data = eventData;
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
const PskWizard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.needWizardConfiguration = createEvent(this, "needWizardConfiguration", 7);
        this.changeStep = createEvent(this, "changeStep", 7);
        this.finishWizard = createEvent(this, "finishWizard", 7);
    }
    componentWillLoad() {
        this.needWizardConfiguration.emit((data) => {
            this.wizardSteps = data;
            this.activeStep = this.wizardSteps.length > 0 ? this.wizardSteps[0] : null;
        });
    }
    handleStepChange(indexToAdvance) {
        let changeStepEvent = new WizardEvent("changeStep", {
            stepIndexToDisplay: indexToAdvance,
            wizardSteps: this.wizardSteps,
            activeStep: this.activeStep,
            callback: (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                this.activeStep = data.activeStep;
                this.wizardSteps = data.wizardSteps;
            }
        }, {
            bubbles: true,
            composed: true,
            cancelable: true
        });
        this.host.dispatchEvent(changeStepEvent);
    }
    handleFinish() {
        this.finishWizard.emit({
            wizardSteps: this.wizardSteps,
            callback: (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(data);
            }
        });
        return;
    }
    handleStepPropertiesChange(newProperties) {
        this.activeStep["stepProperties"] = newProperties;
    }
    computeStepDesign(stepIndex, activeStepIndex, lastStepIndex) {
        let stepClass = "";
        if (stepIndex === 0) {
            stepClass += "first ";
        }
        else if (stepIndex === lastStepIndex - 1) {
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
        const StepComponentRenderer = this.activeStep.stepComponent;
        return [
            h("div", { class: "page-content" }, h("div", { class: "wizard-content" }, h("div", { class: "wizard-form" }, h("form", { class: "form-register", action: "#", method: "post", onSubmit: (ev) => {
                    ev.preventDefault();
                    ev.stopImmediatePropagation();
                } }, h("div", { id: "form-total", class: "wizard clearfix" }, h("psk-stepper", { componentRender: this.componentRender, wizardSteps: this.wizardSteps, activeStep: this.activeStep, handleStepChange: this.handleStepChange.bind(this) }), h(StepComponentRenderer, Object.assign({}, this.activeStep.stepProperties, { onPropertiesChange: this.handleStepPropertiesChange.bind(this), stepProperties: this.activeStep.stepProperties })), h("div", { class: "actions clearfix" }, h("ul", { role: "menu", "aria-label": "Pagination" }, this.activeStep.stepIndex > 0
                ? h("li", null, h("button", { role: "menuitem", onClick: this.handleStepChange.bind(this, this.activeStep.stepIndex - 1) }, "Previous"))
                : null, this.activeStep.stepIndex < this.wizardSteps.length - 1
                ? h("li", null, h("button", { role: "menuitem", onClick: this.handleStepChange.bind(this, this.activeStep.stepIndex + 1) }, "Next"))
                : null, this.activeStep.stepIndex === this.wizardSteps.length - 1
                ? h("li", null, h("button", { role: "menuitem", onClick: this.handleFinish.bind(this) }, "Finish"))
                : null)))))))
        ];
    }
    get host() { return getElement(this); }
};
__decorate([
    BindModel()
], PskWizard.prototype, "modelHandler", void 0);
__decorate([
    CustomTheme()
], PskWizard.prototype, "host", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property is the string that defines the psk-stepper render`,
        isMandatory: false,
        propertyType: `string`,
    })
], PskWizard.prototype, "componentRender", void 0);
__decorate([
    TableOfContentProperty({
        description: `This parameter holds the wizard configuration, the names of the steps, the components that will be displayed and if there is the case, other properties, like information for the steps.`,
        isMandatory: false,
        propertyType: `array of WizardStep types (WizardStep[])`,
        specialNote: `These information are filled in and handled by the controller of the component, not by the component itself.`
    })
], PskWizard.prototype, "wizardSteps", void 0);
__decorate([
    TableOfContentEvent({
        eventName: `needWizardConfiguration`,
        controllerInteraction: {
            required: true
        },
        description: `This event is triggered when the component is loaded and if no configuration is given for the wizard.
            In this case, the controller is responsible to send the configuration to the wizard.
            This event comes with a single parameter, a callback function that sends the configuration to the component.`
    })
], PskWizard.prototype, "needWizardConfiguration", void 0);
__decorate([
    TableOfContentEvent({
        eventName: `changeStep`,
        controllerInteraction: {
            required: true
        },
        description: `This event is triggered when the buttons Next, Previous and the step names from the left side of the component are clicked.
            This event comes with the following parameters:
                stepIndexToDisplay - the number of the step to be displayed,
                wizardSteps - the list of the steps from the wizard,
                activeStep - the step that will be displayed,
                callback - a callback function that is called from the controller when the validation is done.`
    })
], PskWizard.prototype, "changeStep", void 0);
__decorate([
    TableOfContentEvent({
        eventName: `finishWizard`,
        description: `This event is triggered when the buttons Finish is clicked.
            This event comes with the following parameters:
                wizardSteps - the list of the steps from the wizard. Maybe the information inside the wizard will be stored somewhere,
                callback - a callback function that is called from the controller when the validation is done.`
    })
], PskWizard.prototype, "finishWizard", void 0);

export { PskWizard as psk_wizard };
