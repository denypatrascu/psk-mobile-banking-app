import { g as getElement } from './index-bb32d9fe.js';
import { a as DEFINED_EVENTS, d as DATA_DEFINED_EVENTS, e as DATA_DEFINED_CONTROLLERS, b as DEFINED_CONTROLLERS } from './constants-507b64b1.js';
import { c as createCustomEvent } from './utilFunctions-74de6735.js';

function TableOfContentEvent(opts) {
    return function (proto, propertyKey) {
        const { connectedCallback, componentWillLoad, componentDidLoad, render } = proto;
        let actionSend = 'psk-send-events';
        let typeDefined = DEFINED_EVENTS;
        let dataDefineAction = DATA_DEFINED_EVENTS;
        let definedAction = 'definedEvents';
        proto.componentWillLoad = function () {
            let self = this;
            let thisElement = getElement(self);
            if (!thisElement.hasAttribute(DATA_DEFINED_EVENTS) && !thisElement.hasAttribute(DATA_DEFINED_CONTROLLERS)) {
                return componentWillLoad && componentWillLoad.call(self);
            }
        };
        proto.componentDidLoad = function () {
            let self = this;
            let thisElement = getElement(self);
            if (!thisElement.hasAttribute(DATA_DEFINED_EVENTS) && !thisElement.hasAttribute(DATA_DEFINED_CONTROLLERS)) {
                return componentDidLoad && componentDidLoad.call(self);
            }
        };
        proto.connectedCallback = function () {
            let self = this;
            let thisElement = getElement(self);
            if (opts.controllerInteraction) {
                dataDefineAction = DATA_DEFINED_CONTROLLERS;
                definedAction = 'definedControllers';
                typeDefined = DEFINED_CONTROLLERS;
                actionSend = 'psk-send-controllers';
            }
            if (thisElement.hasAttribute(dataDefineAction)) {
                if (!self.componentDefinitions) {
                    self.componentDefinitions = {};
                    self.componentDefinitions[definedAction] = [Object.assign(Object.assign({}, opts), { eventName: String(propertyKey) })];
                    return connectedCallback && connectedCallback.call(self);
                }
                let componentDefinitions = self.componentDefinitions;
                const newEvent = Object.assign(Object.assign({}, opts), { eventName: String(propertyKey) });
                if (componentDefinitions && componentDefinitions.hasOwnProperty(typeDefined)) {
                    let tempProps = [...componentDefinitions[typeDefined]];
                    tempProps.push(newEvent);
                    componentDefinitions[typeDefined] = [...tempProps];
                }
                else {
                    componentDefinitions[typeDefined] = [newEvent];
                }
                self.componentDefinitions = Object.assign({}, componentDefinitions);
            }
            return connectedCallback && connectedCallback.call(self);
        };
        proto.render = function () {
            let self = this;
            if (!self.componentDefinitions
                || !(self.componentDefinitions && self.componentDefinitions[typeDefined])) {
                return render && render.call(self);
            }
            let definedEvts = self.componentDefinitions[typeDefined];
            if (definedEvts) {
                definedEvts = definedEvts.reverse();
            }
            createCustomEvent(actionSend, {
                composed: true,
                bubbles: true,
                cancelable: true,
                detail: definedEvts
            }, true);
        };
    };
}

export { TableOfContentEvent as T };
