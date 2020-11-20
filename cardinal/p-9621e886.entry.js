import{r as t,h as e,H as i,g as o}from"./p-83ba3037.js";import"./p-185b2ebc.js";import"./p-93fcdef3.js";import{C as s}from"./p-372231be.js";import{T as r}from"./p-c87821a3.js";import{a as n}from"./p-c98282f3.js";import{g as a}from"./p-674fc7a6.js";var p=function(t,e,i,o){var s,r=arguments.length,n=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,i,n):s(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n};const l=class{constructor(e){t(this,e),this.templateColumns=null,this.templateRows=null,this.columns=null,this.rows=null,this.autoColumns=null,this.autoRows=null,this.autoFlow=null,this.gap=null,this.columnGap=null,this.rowGap=null,this.alignItems=null,this.alignItemsX=null,this.alignItemsY=null,this.alignContent=null,this.alignContentX=null,this.alignContentY=null}async componentWillLoad(){const t=a(":host",this.__getProperties());n(this.__host,t)}__getProperties(){const t={display:"grid"};return this.templateColumns?t["grid-template-columns"]=this.templateColumns:this.columns&&(t["grid-template-columns"]=`repeat(${this.columns}, 1fr)`),this.templateRows?t["grid-template-rows"]=this.templateRows:this.rows&&(t["grid-template-rows"]=`repeat(${this.rows}, 1fr)`),this.autoFlow&&(t["grid-auto-flow"]=this.templateRows),this.autoColumns&&(t["grid-auto-columns"]=this.templateRows),this.autoRows&&(t["grid-auto-rows"]=this.templateRows),this.gap&&(t.gap=this.gap),this.columnGap&&(t["column-gap"]=this.columnGap),this.rowGap&&(t["row-gap"]=this.rowGap),this.alignItems&&(t["place-items"]=this.alignItems),this.alignItemsX&&(t["justify-items"]=this.alignItemsX),this.alignItemsY&&(t["align-items"]=this.alignItemsY),this.alignContent&&(t["place-content"]=this.alignContent),this.alignContentX&&(t["justify-content"]=this.alignContentX),this.alignContentY&&(t["align-content"]=this.alignContentY),t}render(){return e(i,null,e("slot",null))}get __host(){return o(this)}};p([s()],l.prototype,"__host",void 0),p([r({description:["Equivalent to <em>grid-template-columns</em>.","You can use all available CSS keywords and functions, for example:\n        <code>repeat</code>,\n        <code>minmax</code>,\n        <code>auto</code>,\n        <code>min-content</code>,\n        <code>max-content</code>,\n        <code>fr</code>,\n        etc."],isMandatory:!1,propertyType:"string"})],l.prototype,"templateColumns",void 0),p([r({description:["Equivalent to <em>grid-template-rows</em>."],isMandatory:!1,propertyType:"string"})],l.prototype,"templateRows",void 0),p([r({description:["The property represents the number of columns that the grid will have.",'It produces the same result as <code>template-columns="repeat(number-of-columns, 1fr)"</code>.'],isMandatory:!1,propertyType:"number"})],l.prototype,"columns",void 0),p([r({description:["The property represents the number of rows that the grid will have.",'It produces the same result as <code>template-rows="repeat(number-of-rows, 1fr)"</code>.'],isMandatory:!1,propertyType:"number"})],l.prototype,"rows",void 0),p([r({description:["Equivalent to <em>grid-auto-columns</em>."],isMandatory:!1,propertyType:"string"})],l.prototype,"autoColumns",void 0),p([r({description:["Equivalent to <em>grid-auto-rows</em>."],isMandatory:!1,propertyType:"string"})],l.prototype,"autoRows",void 0),p([r({description:["Equivalent to <em>grid-auto-flow</em>."],isMandatory:!1,propertyType:"string"})],l.prototype,"autoFlow",void 0),p([r({description:"",isMandatory:!1,propertyType:"string"})],l.prototype,"gap",void 0),p([r({description:"",isMandatory:!1,propertyType:"string"})],l.prototype,"columnGap",void 0),p([r({description:"",isMandatory:!1,propertyType:"string"})],l.prototype,"rowGap",void 0),p([r({description:["Equivalent to <em>place-items</em>."],isMandatory:!1,propertyType:"string"})],l.prototype,"alignItems",void 0),p([r({description:["Equivalent to <em>justify-items</em>."],isMandatory:!1,propertyType:"string"})],l.prototype,"alignItemsX",void 0),p([r({description:["Equivalent to <em>align-items</em>."],isMandatory:!1,propertyType:"string"})],l.prototype,"alignItemsY",void 0),p([r({description:["Equivalent to <em>place-content</em>."],isMandatory:!1,propertyType:"string"})],l.prototype,"alignContent",void 0),p([r({description:["Equivalent to <em>justify-content</em>."],isMandatory:!1,propertyType:"string"})],l.prototype,"alignContentX",void 0),p([r({description:["Equivalent to <em>align-content</em>."],isMandatory:!1,propertyType:"string"})],l.prototype,"alignContentY",void 0);export{l as psk_layout}