import { r as registerInstance, h, g as getElement } from './index-bb32d9fe.js';
import './index-90f51874.js';
import './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { B as BindModel } from './BindModel-524e1a2c.js';
import { C as CustomTheme } from './CustomTheme-f57ed858.js';
import './TableOfContentEvent-f33bf2c4.js';
import { T as TableOfContentProperty } from './TableOfContentProperty-de8188be.js';

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
const SCAN_TIMEOUT = 100;
const PskBarcodeScanner = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.title = '';
        this.allowFileBrowsing = false;
        this.disableFrame = false;
        this.codeReader = null;
        this.ZXing = null;
        this.devices = [];
        this.activeDeviceId = null;
        this.cameraIsAvailable = false;
    }
    startCamera(deviceId) {
        const videoElement = this.element.querySelector('#video');
        let scannerContainer = this.element.querySelector('#scanner_container');
        let log = console.log;
        console.log = (...args) => {
            if (args.length != 0 && args[0] instanceof this.ZXing.NotFoundException) {
                return;
            }
            log(...args);
        };
        const constraints = {
            video: {
                facingMode: 'environment',
                width: { ideal: scannerContainer.offsetWidth },
                height: { ideal: scannerContainer.offsetHeight },
            }
        };
        if (deviceId && deviceId !== 'no-camera') {
            delete constraints.video.facingMode;
            constraints.video['deviceId'] = { exact: deviceId };
        }
        videoElement.width = constraints.video.width.ideal;
        videoElement.height = constraints.video.height.ideal;
        this.codeReader.reset();
        this.codeReader.decodeFromConstraints(constraints, videoElement, (result, err) => {
            if (result) {
                console.log('result', result);
                if (this.modelHandler) {
                    this.modelHandler.updateModel('data', result.text);
                }
            }
            if (err && !(err instanceof this.ZXing.NotFoundException)) {
                console.error(err);
            }
        });
    }
    cameraChanged(deviceId) {
        this.activeDeviceId = deviceId;
        // this.startCamera(this.activeDeviceId);
    }
    async componentWillLoad() {
        let tick = () => {
            if (window['ZXing']) {
                this.ZXing = window['ZXing'];
                this.codeReader = new this.ZXing.BrowserMultiFormatReader();
            }
            else {
                setTimeout(tick, SCAN_TIMEOUT);
            }
        };
        setTimeout(tick, SCAN_TIMEOUT);
    }
    async componentWillRender() {
        // ZXing unloaded
        if (!this.ZXing) {
            return;
        }
        // No devices yet
        if (this.devices.length === 0 || !this.activeDeviceId) {
            this.devices = await this.codeReader.listVideoInputDevices();
            console.log('devices', this.devices);
            if (this.devices.length > 0) {
                this.cameraIsAvailable = true;
                // this.activeDeviceId = this.devices[0].deviceId;
            }
        }
    }
    async componentDidRender() {
        if (this.cameraIsAvailable) {
            this.startCamera(this.activeDeviceId);
        }
    }
    render() {
        // if (this.componentIsDisconnected) return null;
        // let fileBrowsingIsAllowed = stringToBoolean(this.allowFileBrowsing);
        const style = {
            barcodeWrapper: {
                display: 'grid', gridTemplateRows: '1fr auto',
                width: '100%', height: '100%'
            },
            videoWrapper: {
                position: 'relative',
                display: 'grid', gridTemplateRows: '1fr',
                overflow: 'hidden',
                minHeight: '300px'
            },
            video: {
                position: 'absolute',
                left: '50%', transform: 'translateX(-50%)',
                height: '100%'
            },
            controls: {
                padding: '1em', margin: '0.25em 0',
                display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center'
            },
            select: {
                padding: '5px',
                background: 'transparent', border: '0'
            }
        };
        console.log('render devices', this.devices);
        const selectCamera = (h("select", { style: style.select, onChange: (e) => this.cameraChanged(e.target.value) }, h("option", { value: "no-camera" }, "Select camera"), this.devices.map(device => (h("option", { value: device.deviceId }, device.label)))));
        // TODO: zxing testing
        // (window as any).cardinalBase}/cardinal/libs/zxing.js
        // <script async src="/cardinal/libs/zxing.new.js"/>
        return [
            h("script", { async: true, src: `${window.cardinalBase}/cardinal/libs/zxing.new.js` }),
            h("div", { title: this.title, style: style.barcodeWrapper }, this.cameraIsAvailable === false
                ? (h("psk-highlight", { title: "No camera detected", "type-of-highlight": "warning" }, h("p", null, "You can still use your device files to check for barcodes!")))
                : [
                    h("div", { id: "scanner_container", style: style.videoWrapper }, h("input", { type: "file", accept: "video/*", capture: "camera", style: { display: 'none' } }), h("video", { id: "video", muted: true, autoplay: true, playsinline: true, style: style.video })),
                    h("div", { style: style.controls }, h("label", { htmlFor: "video-source", style: { margin: '0' } }, "Video source: "), h("div", { class: "select", id: "camera-source" }, selectCamera))
                ], this.cameraIsAvailable === false
                ? [
                    h("psk-files-chooser", { accept: "image/*", label: "Load a file from device", "event-name": "loaded-local-file" }),
                    h("psk-button", { "event-name": "use-camera", label: "Use camera", style: { display: "none" }, id: "use-camera-btn" })
                ]
                : null)
        ];
    }
    get element() { return getElement(this); }
};
__decorate([
    BindModel()
], PskBarcodeScanner.prototype, "modelHandler", void 0);
__decorate([
    CustomTheme()
], PskBarcodeScanner.prototype, "element", void 0);
__decorate([
    TableOfContentProperty({
        description: `The data-model that will be updated with the retrieved data from the scanner.`,
        isMandatory: true,
        propertyType: `string`
    })
], PskBarcodeScanner.prototype, "data", void 0);
__decorate([
    TableOfContentProperty({
        description: `A title that will be used for the current component instance.`,
        isMandatory: false,
        propertyType: `string`
    })
], PskBarcodeScanner.prototype, "title", void 0);
__decorate([
    TableOfContentProperty({
        description: `A boolean value indicating that the current component instance is accepting files from the device. Please note that if no camera is detected, this feature will be automatically enabled.`,
        isMandatory: false,
        propertyType: `boolean`
    })
], PskBarcodeScanner.prototype, "allowFileBrowsing", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `A boolean value indicating the scope of the 2D matrix of scanner.`,
            `If it is <code>true</code> the component will analyze only the center square / frame.`,
            `Otherwise the entire screen.`
        ],
        isMandatory: false,
        propertyType: `boolean`
    })
], PskBarcodeScanner.prototype, "disableFrame", void 0);

export { PskBarcodeScanner as psk_barcode_scanner };
