import{r as e,h as i}from"./p-87f0c668.js";import"./p-ff3b654f.js";import"./p-185b2ebc.js";import"./p-a5fc534d.js";import{B as t}from"./p-67458612.js";import{C as s}from"./p-b4c074e0.js";import{T as o}from"./p-9a6ac7e0.js";var a=function(e,i,t,s){var o,a=arguments.length,n=a<3?i:null===s?s=Object.getOwnPropertyDescriptor(i,t):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,i,t,s);else for(var p=e.length-1;p>=0;p--)(o=e[p])&&(n=(a<3?o(n):a>3?o(i,t,n):o(i,t))||n);return a>3&&n&&Object.defineProperty(i,t,n),n};const n=class{constructor(i){e(this,i),this.__inputHandler=e=>{e.stopImmediatePropagation(),this.modelHandler.updateModel("value",e.target.value)},this.label=null,this.value=null,this.name=null,this.placeholder=null,this.required=!1,this.readOnly=!1,this.invalidValue=null}render(){return i("psk-input",{type:"email",label:this.label,name:this.name,value:this.value,placeholder:this.placeholder,required:this.required,readOnly:this.readOnly,invalidValue:this.invalidValue,specificProps:{onKeyUp:this.__inputHandler.bind(this),onChange:this.__inputHandler.bind(this)}})}};a([s(),t()],n.prototype,"modelHandler",void 0),a([o({description:['By filling out this property, the component will display above it, a label using <psk-link page="forms/psk-label">psk-label</psk-link> component.'],isMandatory:!1,propertyType:"string",specialNote:"If this property is not provided, the component will be displayed without any label"})],n.prototype,"label",void 0),a([o({description:["Specifies the value of an psk-email-input component.",'This value is updated also in the model using the two-way binding. Information about two-way binding using models and templates can be found at: <psk-link page="forms/using-forms">Using forms</psk-link>.'],isMandatory:!1,propertyType:"string"})],n.prototype,"value",void 0),a([o({description:["Specifies the name of a psk-email-input component. It is used along with the psk-label component."],isMandatory:!1,propertyType:"string"})],n.prototype,"name",void 0),a([o({description:["Specifies a short hint that describes the expected value of an psk-email-input component"],isMandatory:!1,propertyType:"string"})],n.prototype,"placeholder",void 0),a([o({description:["Specifies that an input field must be filled out before submitting the form.",'Accepted values: "true" and "false"'],isMandatory:!1,propertyType:"boolean",defaultValue:"false"})],n.prototype,"required",void 0),a([o({description:["\tSpecifies that an input field is read-only.",'Accepted values: "true" and "false"'],isMandatory:!1,propertyType:"boolean",defaultValue:"false"})],n.prototype,"readOnly",void 0),a([o({description:["This property indicates if the value entered by the user is a valid one according to some validation present in the controller."],isMandatory:!1,propertyType:"boolean"})],n.prototype,"invalidValue",void 0);export{n as psk_email_input}