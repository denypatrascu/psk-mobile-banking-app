const MOBILE_MAX_WIDTH = 960;
const DEFINED_PROPERTIES = "definedProperties";
const DEFINED_EVENTS = "definedEvents";
const DEFINED_CONTROLLERS = "definedControllers";
const DATA_DEFINED_PROPS = "data-define-props";
const DATA_DEFINED_EVENTS = "data-define-events";
const DATA_DEFINED_CONTROLLERS = "data-define-controller";
const TOOLTIP_TEXT = "Copy to clipboard";
const TOOLTIP_COPIED_TEXT = "Copied!";
const LIST_TYPE_ORDERED = "ordered";
const LIST_TYPE_UNORDERED = "unordered";
const EVENTS_TYPES = {
    PSK_BUTTON_EVT: "PSK_BUTTON_EVT",
    PSK_SCROLL_EVT: "PSK_SCROLL_EVT",
    PSK_WIZARD_EVT: "PSK_WIZARD_EVT",
    PSK_FILE_CHOOSER_EVT: "PSK_FILE_CHOOSER_EVT",
    PSK_SUB_MENU_EVT: "PSK_SUB_MENU_EVT"
};
const INVALID_ID_CHARACTERS_REGEX = /[^A-Za-z0-9_-]/g;
const PSK_LIST_PARSE_CONFIG = {
    startTag: /^<([a-z]+-?[a-z]*)+[^>]*>/,
    endTag: /^<\/([a-z]+-?[a-z]*)+[^>]*>/,
    inlineTag: /^<([a-z]+-?[a-z]*)+[^>]*>.*<\/([a-z]+-?[a-z]*)+[^>]*>/
};
const ACTIONS_ICONS = {
    view: {
        value: "eye",
        color: "rgba(108, 192, 145, 1)"
    },
    edit: {
        value: "edit",
        color: "#007bff"
    },
    cancel: {
        value: "close",
        color: "#dc3545"
    },
    bid: {
        value: "gavel"
    },
    calendar: {
        value: "calendar-check-o"
    }
};
const GRID_IGNORED_COMPONENTS = ["link", "style", "slot", "#text", "#comment", "text", "comment"];
const GRID_BREAKPOINTS = ["xs", "s", "m", "l", "xl"];
const GRID_HIDDEN_BREAKPOINTS = {
    xs: "d-none d-sm-block",
    sm: "d-sm-none d-md-block",
    md: "d-md-none d-lg-block",
    lg: "d-lg-none d-xl-block",
    xl: "d-xl-none"
};
const DATE_FORMAT_MASKS = {
    'default': 'mm dd yyyy HH:MM',
    'shortTime': 'HH:MM ',
    'isoTime': 'HH:MM:ss',
    'isoDate': 'yyyy-mm-dd',
};
const BREADCRUMB_CONSTANTS = {
    ARROWS: "arrows",
    DEFAULT: "default",
    SCROLL: "scroll",
    PREVIOUS_ID: "prev",
    NEXT_ID: "next",
    BREADCRUMB_CLICK: "breadcrumb-click"
};

export { ACTIONS_ICONS as A, BREADCRUMB_CONSTANTS as B, DEFINED_PROPERTIES as D, EVENTS_TYPES as E, GRID_IGNORED_COMPONENTS as G, INVALID_ID_CHARACTERS_REGEX as I, LIST_TYPE_ORDERED as L, MOBILE_MAX_WIDTH as M, PSK_LIST_PARSE_CONFIG as P, TOOLTIP_TEXT as T, DEFINED_EVENTS as a, DEFINED_CONTROLLERS as b, DATA_DEFINED_PROPS as c, DATA_DEFINED_EVENTS as d, DATA_DEFINED_CONTROLLERS as e, TOOLTIP_COPIED_TEXT as f, LIST_TYPE_UNORDERED as g, GRID_BREAKPOINTS as h, GRID_HIDDEN_BREAKPOINTS as i, DATE_FORMAT_MASKS as j };
