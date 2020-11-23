import { r as registerInstance, h, g as getElement } from './index-d1085cc4.js';
import './constants-507b64b1.js';
import './utilFunctions-5499adff.js';
import { B as BindModel } from './BindModel-8ea50ef5.js';
import { C as CustomTheme } from './CustomTheme-3f558a4e.js';
import { T as TableOfContentProperty } from './TableOfContentProperty-900b66d0.js';
import { P as PskButtonEvent } from './PskButtonEvent-128aba69.js';

const pskFilesChooserCss = ".fileDiv{display:flex}.trashButton{margin:0 5px 0 0;padding:0 !important;border:0 !important}";

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
const PskFilesChooser = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.label = "Select files";
        this.listFiles = false;
        this.filesAppend = false;
        this.files = [];
    }
    triggerBrowseFile(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.htmlElement.querySelector("input").click();
    }
    dispatchEvent() {
        let pskFileChooserEvent = new PskButtonEvent(this.eventName, this.files, {
            bubbles: true,
            composed: true,
            cancelable: true
        });
        let eventDispatcherElement = this.htmlElement;
        eventDispatcherElement.dispatchEvent(pskFileChooserEvent);
    }
    addedFile(event) {
        let filesArray = Array.from(event.target.files);
        this.files = this.filesAppend ? [...this.files, ...filesArray] : filesArray;
        if (this.eventName) {
            event.preventDefault();
            event.stopImmediatePropagation();
            this.dispatchEvent();
            /**
             * SPA issue: When you try to upload the same file/folder, onChange event is not triggered.
             * Solution: Reset the input after the files are emitted via dispatchEvent.
             */
            event.target.value = null;
        }
    }
    deleteFileFromList(data) {
        if (this.files) {
            this.files = this.files.filter(file => file != data);
            this.dispatchEvent();
        }
    }
    mapFileToDiv(file) {
        return h("div", { class: "fileDiv" }, h("button", { type: "button", class: "btn btn-secondary trashButton", onClick: () => this.deleteFileFromList(file) }, h("psk-icon", { icon: "trash" })), h("p", null, file.name));
    }
    render() {
        let directoryAttributes = {};
        let selectedFiles = null;
        if (this.accept === 'directory') {
            directoryAttributes = {
                directory: true,
                mozdirectory: true,
                webkitdirectory: true
            };
            this.accept = null;
        }
        if (this.listFiles && this.files) {
            selectedFiles = h("div", { class: this.files.length > 0 ? "selectedFiles" : "" }, this.files.map((file) => this.mapFileToDiv(file)));
        }
        return [
            h("button", { type: "button", class: "btn btn-secondary", onClick: this.triggerBrowseFile.bind(this) }, h("slot", null), h("label", null, this.label, h("input", Object.assign({ multiple: true }, directoryAttributes, { accept: this.accept, type: "file", onClick: (event) => {
                    event.stopImmediatePropagation();
                }, onChange: this.addedFile.bind(this), class: "form-control-file form-control-sm" })))),
            selectedFiles,
            (!this.eventName) ? h("h5", { class: "mt-4" }, "No controller set for this component!") : null
        ];
    }
    get htmlElement() { return getElement(this); }
};
__decorate([
    CustomTheme(),
    BindModel()
], PskFilesChooser.prototype, "modelHandler", void 0);
__decorate([
    TableOfContentProperty({
        description: `This is the label of the button`,
        isMandatory: false,
        propertyType: `string`,
        defaultValue: `Select files`
    })
], PskFilesChooser.prototype, "label", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property tells the component which types of files can be uploaded from the user's device.`,
        isMandatory: false,
        propertyType: `string`,
        specialNote: `If this property is missing, then all types of files can be uploaded.`
    })
], PskFilesChooser.prototype, "accept", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property tells the component if the list of uploaded files will be visible.`,
        isMandatory: false,
        propertyType: `boolean`,
        defaultValue: false,
        specialNote: `If this property is missing, then the list of uploaded files will be hidden.`
    })
], PskFilesChooser.prototype, "listFiles", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property tells the component if the uploaded files should be appended to the existing file list.`,
        isMandatory: false,
        propertyType: `boolean`,
        defaultValue: false,
        specialNote: `If this property is missing, then the list of uploaded files will be overridden every time the user select files again.`
    })
], PskFilesChooser.prototype, "filesAppend", void 0);
PskFilesChooser.style = pskFilesChooserCss;

export { PskFilesChooser as psk_files_chooser };
