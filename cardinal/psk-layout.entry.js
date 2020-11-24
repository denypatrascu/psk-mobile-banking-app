import { r as registerInstance, h, i as Host, g as getElement } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { C as CustomTheme } from './CustomTheme-f57ed858.js';
import { T as TableOfContentProperty } from './TableOfContentProperty-de8188be.js';
import { a as applyStyles } from './psk-style.utils-46a368b3.js';
import { g as generateRule } from './psk-layout.utils-8d21e9d9.js';

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
const PskLayout = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.templateColumns = null;
        this.templateRows = null;
        this.columns = null;
        this.rows = null;
        this.autoColumns = null;
        this.autoRows = null;
        this.autoFlow = null;
        this.gap = null;
        this.columnGap = null;
        this.rowGap = null;
        this.alignItems = null;
        this.alignItemsX = null;
        this.alignItemsY = null;
        this.alignContent = null;
        this.alignContentX = null;
        this.alignContentY = null;
    }
    async componentWillLoad() {
        const styles = generateRule(':host', this.__getProperties());
        applyStyles(this.__host, styles);
    }
    __getProperties() {
        const properties = { 'display': 'grid' };
        if (this.templateColumns)
            properties['grid-template-columns'] = this.templateColumns;
        else if (this.columns)
            properties['grid-template-columns'] = `repeat(${this.columns}, 1fr)`;
        if (this.templateRows)
            properties['grid-template-rows'] = this.templateRows;
        else if (this.rows)
            properties['grid-template-rows'] = `repeat(${this.rows}, 1fr)`;
        if (this.autoFlow)
            properties['grid-auto-flow'] = this.templateRows;
        if (this.autoColumns)
            properties['grid-auto-columns'] = this.templateRows;
        if (this.autoRows)
            properties['grid-auto-rows'] = this.templateRows;
        if (this.gap)
            properties['gap'] = this.gap;
        if (this.columnGap)
            properties['column-gap'] = this.columnGap;
        if (this.rowGap)
            properties['row-gap'] = this.rowGap;
        if (this.alignItems)
            properties['place-items'] = this.alignItems;
        if (this.alignItemsX)
            properties['justify-items'] = this.alignItemsX;
        if (this.alignItemsY)
            properties['align-items'] = this.alignItemsY;
        if (this.alignContent)
            properties['place-content'] = this.alignContent;
        if (this.alignContentX)
            properties['justify-content'] = this.alignContentX;
        if (this.alignContentY)
            properties['align-content'] = this.alignContentY;
        return properties;
    }
    render() {
        return (h(Host, null, h("slot", null)));
    }
    get __host() { return getElement(this); }
};
__decorate([
    CustomTheme()
], PskLayout.prototype, "__host", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `Equivalent to <em>grid-template-columns</em>.`,
            `You can use all available CSS keywords and functions, for example:
        <code>repeat</code>,
        <code>minmax</code>,
        <code>auto</code>,
        <code>min-content</code>,
        <code>max-content</code>,
        <code>fr</code>,
        etc.`
        ],
        isMandatory: false,
        propertyType: `string`
    })
], PskLayout.prototype, "templateColumns", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `Equivalent to <em>grid-template-rows</em>.`
        ],
        isMandatory: false,
        propertyType: `string`
    })
], PskLayout.prototype, "templateRows", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `The property represents the number of columns that the grid will have.`,
            `It produces the same result as <code>template-columns="repeat(number-of-columns, 1fr)"</code>.`
        ],
        isMandatory: false,
        propertyType: `number`
    })
], PskLayout.prototype, "columns", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `The property represents the number of rows that the grid will have.`,
            `It produces the same result as <code>template-rows="repeat(number-of-rows, 1fr)"</code>.`
        ],
        isMandatory: false,
        propertyType: `number`
    })
], PskLayout.prototype, "rows", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `Equivalent to <em>grid-auto-columns</em>.`
        ],
        isMandatory: false,
        propertyType: `string`
    })
], PskLayout.prototype, "autoColumns", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `Equivalent to <em>grid-auto-rows</em>.`
        ],
        isMandatory: false,
        propertyType: `string`
    })
], PskLayout.prototype, "autoRows", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `Equivalent to <em>grid-auto-flow</em>.`
        ],
        isMandatory: false,
        propertyType: `string`
    })
], PskLayout.prototype, "autoFlow", void 0);
__decorate([
    TableOfContentProperty({
        description: '',
        isMandatory: false,
        propertyType: `string`
    })
], PskLayout.prototype, "gap", void 0);
__decorate([
    TableOfContentProperty({
        description: '',
        isMandatory: false,
        propertyType: `string`
    })
], PskLayout.prototype, "columnGap", void 0);
__decorate([
    TableOfContentProperty({
        description: '',
        isMandatory: false,
        propertyType: `string`
    })
], PskLayout.prototype, "rowGap", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `Equivalent to <em>place-items</em>.`
        ],
        isMandatory: false,
        propertyType: `string`
    })
], PskLayout.prototype, "alignItems", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `Equivalent to <em>justify-items</em>.`
        ],
        isMandatory: false,
        propertyType: `string`
    })
], PskLayout.prototype, "alignItemsX", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `Equivalent to <em>align-items</em>.`
        ],
        isMandatory: false,
        propertyType: `string`
    })
], PskLayout.prototype, "alignItemsY", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `Equivalent to <em>place-content</em>.`
        ],
        isMandatory: false,
        propertyType: `string`
    })
], PskLayout.prototype, "alignContent", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `Equivalent to <em>justify-content</em>.`
        ],
        isMandatory: false,
        propertyType: `string`
    })
], PskLayout.prototype, "alignContentX", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `Equivalent to <em>align-content</em>.`
        ],
        isMandatory: false,
        propertyType: `string`
    })
], PskLayout.prototype, "alignContentY", void 0);

export { PskLayout as psk_layout };
