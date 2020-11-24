import { r as registerInstance, h } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { C as CustomTheme } from './CustomTheme-f57ed858.js';
import { T as TableOfContentProperty } from './TableOfContentProperty-de8188be.js';

const Config = {
    HIGHLIGHT_NOTE: 'note',
    HIGHLIGHT_ISSUE: 'issue',
    HIGHLIGHT_EXAMPLE: 'example',
    HIGHLIGHT_WARNING: 'warning'
};

const pskHighlightCss = ".psk-highlight{border-left:.5em solid;margin:1em auto;padding:.5em}.psk-highlight .body{margin:1em 0}.psk-highlight-note{background-color:#E9FBE9;border-color:#52E052}.psk-highlight-note .header{color:#178217}.psk-highlight-issue{background-color:#FBE9E9;border-color:#E05252}.psk-highlight-issue .header{color:#AE1E1E}.psk-highlight-example,.psk-highlight-warning{background-color:#FCFAEE;border-color:#E0CB52}.psk-highlight-example .header,.psk-highlight-warning .header{color:#827017}";

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
const PskHighlight = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.title = "";
        this.typeOfHighlight = Config.HIGHLIGHT_NOTE;
    }
    render() {
        return (h("div", { class: `psk-highlight psk-highlight-${this.typeOfHighlight}` }, this.title ? h("div", { class: "header" }, this.title) : null, h("div", { class: "body" }, h("slot", null))));
    }
};
__decorate([
    CustomTheme(),
    TableOfContentProperty({
        description: `The title of the highlighted section.`,
        isMandatory: false,
        propertyType: `string`
    })
], PskHighlight.prototype, "title", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property is the type of highlight. Possible values are: "note", "issue", "example", "warning". Defaults to "note".`,
        isMandatory: false,
        propertyType: `string`
    })
], PskHighlight.prototype, "typeOfHighlight", void 0);
PskHighlight.style = pskHighlightCss;

export { PskHighlight as psk_highlight };
