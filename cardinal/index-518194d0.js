import { P as PskButtonEvent } from './PskButtonEvent-128aba69.js';

// import EVENT_TYPES from "../constants";
const DEFAULT_EVENT_OPTIONS = { bubbles: true, cancelable: true, composed: true };
/**
 * @description This function is a helper for Cardinal components. It has the role to dispatch an event based on @Props.
 *
 * @param {HTMLElement} host - which element dispatches the event if the eventDispatcher is not specified
 * // @param {typeof EVENT_TYPES} eventType - what kind of event is dispatched
 * @param {EventProps} eventProps - properties of your Component (eventName, eventData, eventDispatcher)
 * @param {EventOptions} eventOptions - properties of a CustomEvent (bubbles, cancelable, composed)
 **/
function dispatchEvent(host, 
// eventType: typeof EVENT_TYPES,
eventProps, eventOptions = DEFAULT_EVENT_OPTIONS) {
    if (!eventProps.eventName)
        return;
    const { eventName, eventData, eventDispatcher } = eventProps;
    const isGlobalDispatcher = (eventDispatcher && [document, window].indexOf(window[eventDispatcher]) !== -1);
    const event = new PskButtonEvent(eventName, eventData, eventOptions);
    const dispatcher = (isGlobalDispatcher ? window[eventDispatcher] : host);
    dispatcher.dispatchEvent(event);
}

export { dispatchEvent as d };
