import './index-bb32d9fe.js';
import './active-router-89a25b91.js';
import './index-f0762390.js';
import './match-path-760e1797.js';
import './location-utils-fea12957.js';
export { A as AppConfigurationHelper, D as DefaultApplicationController, d as defaultApplicationConfig } from './DefaultApplicationController-858ff924.js';
import { C as ContainerController } from './ContainerController-426f692f.js';
export { C as ContainerController } from './ContainerController-426f692f.js';
export { C as ComponentInheritor } from './index-90f51874.js';
export { A as ACTIONS_ICONS, B as BREADCRUMB_CONSTANTS, e as DATA_DEFINED_CONTROLLERS, d as DATA_DEFINED_EVENTS, c as DATA_DEFINED_PROPS, j as DATE_FORMAT_MASKS, b as DEFINED_CONTROLLERS, a as DEFINED_EVENTS, D as DEFINED_PROPERTIES, E as EVENTS_TYPES, h as GRID_BREAKPOINTS, i as GRID_HIDDEN_BREAKPOINTS, G as GRID_IGNORED_COMPONENTS, I as INVALID_ID_CHARACTERS_REGEX, L as LIST_TYPE_ORDERED, g as LIST_TYPE_UNORDERED, M as MOBILE_MAX_WIDTH, P as PSK_LIST_PARSE_CONFIG, f as TOOLTIP_COPIED_TEXT, T as TOOLTIP_TEXT } from './constants-507b64b1.js';
export { o as applyStyles, i as canAttachShadow, a as closestParentElement, b as closestParentTagElement, c as createCustomEvent, l as dashToCamelCase, f as format, m as getInnerHTML, d as normalizeCamelCaseToDashed, e as normalizeDashedToCamelCase, g as normalizeElementId, n as normalizeInnerHTML, j as normalizeModelChain, h as normalizeRegexToString, s as scrollToElement, k as stringToBoolean } from './utilFunctions-74de6735.js';
export { B as BindModel } from './BindModel-524e1a2c.js';
export { C as CustomTheme } from './CustomTheme-f57ed858.js';
export { T as TableOfContentEvent } from './TableOfContentEvent-f33bf2c4.js';
export { T as TableOfContentProperty } from './TableOfContentProperty-de8188be.js';
export { C as ControllerRegistryService } from './ControllerRegistryService-229f368f.js';
export { h as highlightChapter } from './highlightChapter-84cd936d.js';

class ModalDataEvent extends CustomEvent{

  constructor(eventName, eventData, eventOptions) {
    super(eventName, eventOptions);
    this.data = eventData;
  }
}

class ModalController extends ContainerController {

  constructor(element, history) {
    super(element, history);

    let callback = (err, viewModel, responseCallback) => {
      this.model = this.setModel(JSON.parse(JSON.stringify(viewModel)));
      this.responseCallback = responseCallback;
    };

    let modalDataEvent = new ModalDataEvent("bindModalData", {
      callback: callback
    }, {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    this.element.dispatchEvent(modalDataEvent);

  }
}

export { ModalController };
