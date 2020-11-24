import { r as registerInstance, h } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import { g as normalizeElementId } from './utilFunctions-74de6735.js';

const PskControllerDescriptor = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.title = "";
        this.decoratorControllers = [];
    }
    receivedControllersDescription(evt) {
        const payload = evt.detail;
        evt.stopImmediatePropagation();
        if (payload && payload.length > 0) {
            this.decoratorControllers = JSON.parse(JSON.stringify(payload));
        }
    }
    render() {
        let componentControllersDefinitions = this.decoratorControllers.map((controller) => {
            const cardSubtitle = `${controller.eventName}: CustomEvent`;
            const required = `Required : ${controller.controllerInteraction.required}`;
            return (h("psk-chapter-wrapper", { title: controller.eventName }, h("p", { class: "subtitle" }, h("i", null, cardSubtitle)), h("p", { class: "subtitle" }, h("b", null, required)), h("p", null, controller.description), controller.specialNote ? (h("p", null, h("b", null, "Note: ", controller.specialNote))) : null));
        });
        return (h("psk-chapter", { title: this.title, id: normalizeElementId(this.title) }, componentControllersDefinitions));
    }
};

export { PskControllerDescriptor as psk_controller_descriptor };
