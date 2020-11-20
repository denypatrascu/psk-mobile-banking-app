import { E as EVENTS_TYPES } from './constants-507b64b1.js';

const EVENT_TYPE = EVENTS_TYPES.PSK_BUTTON_EVT;
class PskButtonEvent extends CustomEvent {
    constructor(eventName, eventData, eventOptions) {
        super(eventName, eventOptions);
        this.getEventType = function () {
            return EVENT_TYPE;
        };
        this.data = eventData;
    }
}

export { PskButtonEvent as P };
