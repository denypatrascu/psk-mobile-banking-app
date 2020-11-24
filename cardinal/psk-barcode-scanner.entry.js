import { r as registerInstance, h, g as getElement } from './index-bb32d9fe.js';
import './index-90f51874.js';
import './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { B as BindModel } from './BindModel-524e1a2c.js';
import { C as CustomTheme } from './CustomTheme-f57ed858.js';
import './TableOfContentEvent-f33bf2c4.js';
import { T as TableOfContentProperty } from './TableOfContentProperty-de8188be.js';

function isMobile(restrict) {
  if (restrict) return false;
  let userAgentKey ='userAgent';
  let sUserAgent = navigator[userAgentKey].toLowerCase();
  let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  let bIsMidp = sUserAgent.match(/midp/i) == "midp";
  let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  let bIsAndroid = sUserAgent.match(/android/i) == "android";
  let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  return bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM;
}

function getScaledDim(img, maxWidth, maxHeight) {
  let scaled = {
    ratio: img.width / img.height,
    width: img.width,
    height: img.height
  };
  if (scaled.width > maxWidth) {
    scaled.width = maxWidth;
    scaled.height = scaled.width / scaled.ratio;
  }
  if (scaled.height > maxHeight) {
    scaled.height = maxHeight;
    scaled.width = scaled.height / scaled.ratio;
  }

  return scaled;

}

/* https://stackoverflow.com/questions/59287928/algorithm-to-create-a-polygon-from-points */
function polySort(points) {
  function squaredPolar(point, centre) {
    return [
      Math.atan2(point[1] - centre[1], point[0] - centre[0]),
      (point[0] - centre[0]) ** 2 + (point[1] - centre[1]) ** 2 // Square of distance
    ];
  }

  // Get "centre of mass"
  let centre = [points.reduce((sum, p) => sum + p[0], 0) / points.length,
    points.reduce((sum, p) => sum + p[1], 0) / points.length];

  // Sort by polar angle and distance, centered at this centre of mass.
  for (let point of points) point.push(...squaredPolar(point, centre));
  points.sort((a, b) => a[2] - b[2] || a[3] - b[3]);
  // Throw away the temporary polar coordinates
  for (let point of points) point.length -= 2;
}



const BarcodeUtilFunctions = {
  isMobile, polySort, getScaledDim
};

class CanvasOverlay {

  constructor(scannerContainer) {
    this.scannerContainer = scannerContainer;
    this.dimensions = this.getDimensions(this.scannerContainer);
  }

  getDimensions(scannerContainer) {
    return {
      width: scannerContainer.offsetWidth,
      height: scannerContainer.offsetHeight,
      frame: 0.75 * Math.min(scannerContainer.offsetWidth, scannerContainer.offsetHeight)
    }
  }

  addCanvasToView(canvasId, customStyle) {
    let canvasElement = document.createElement('canvas');
    canvasElement.id = canvasId;
    canvasElement.width = this.dimensions.width;
    canvasElement.height= this.dimensions.height;
    canvasElement.style.position = 'absolute';
    canvasElement.style.width = '100%';
    canvasElement.style.top = '0';
    canvasElement.style.left = '0';

    if (typeof customStyle === 'object') {
      Object.keys(customStyle).forEach(key => {
        if (canvasElement.style[key])
          canvasElement.style[key] = customStyle[key];
      });
    }

    this.scannerContainer.appendChild(canvasElement);
    return canvasElement;
  }
}

const ANGLE_WIDTH = 50;

class VideoOverlay extends CanvasOverlay {

  constructor(scannerContainer, videoSource) {
    super(scannerContainer);
    this.videoSource = videoSource;
    let dimensions = this.dimensions;
    let xPadding = (dimensions.width - dimensions.frame) / 2;
    let yPadding = (dimensions.height - dimensions.frame) / 2;
    this.cropOptions = [xPadding, yPadding, dimensions.frame, dimensions.frame];
  }

  getCropOptions() {
    return this.cropOptions;
  }

  createOverlaysCanvases(lensCanvas, overlayCanvas) {
    this.lensCanvas = this.addCanvasToView(lensCanvas);
    this.overlayCanvas = this.addCanvasToView(overlayCanvas);
  }

  removeOverlays() {
    this.scannerContainer.removeChild(this.lensCanvas);
    this.scannerContainer.removeChild(this.overlayCanvas);
  }

  drawOverlay(points) {
    let x1 = points[0].x;
    let y1 = points[0].y;

    let x2 = points[1].x;
    let y2 = points[1].y;

    let x3 = points[2].x;
    let y3 = points[2].y;

    let x4 = points[3].x;
    let y4 = points[3].y;

    let paddings = [this.cropOptions[0], this.cropOptions[1]];
    let isLine = x3 + y3 + x4 + y4 === 0;

    x1 += paddings[0];
    x2 += paddings[0];
    x3 += paddings[0];
    x4 += paddings[0];

    y1 += paddings[1];
    y2 += paddings[1];
    y3 += paddings[1];
    y4 += paddings[1];

    this.overlayCanvas.width = this.dimensions.width;
    this.overlayCanvas.height = this.dimensions.height;

    if (this.overlayCanvas.getContext) {
      let ctx = this.overlayCanvas.getContext('2d');
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#48d96099';
      ctx.fillStyle = '#48d96099';

      ctx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);
      ctx.beginPath();

      if (isLine) {
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
      } else {
        let points = [[x1, y1], [x2, y2], [x3, y3], [x4, y4]];
        BarcodeUtilFunctions.polySort(points);
        ctx.moveTo(points[0][0], points[0][1]);
        ctx.lineTo(points[1][0], points[1][1]);
        ctx.lineTo(points[2][0], points[2][1]);
        ctx.lineTo(points[3][0], points[3][1]);
      }

      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = '#48d960FF';

      let xPadding = this.cropOptions[0];
      let yPadding = this.cropOptions[1];
      let frameWidth = this.cropOptions[2];

      this.addLensCorners(ctx, xPadding, yPadding, frameWidth, ANGLE_WIDTH);

      setTimeout(() => {
        ctx.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);
      },500);
    }
  }

  drawLensCanvas() {
    let ctx = this.lensCanvas.getContext('2d');
    ctx.beginPath();

    let polygonPoints = [
      [0, 0],
      [this.dimensions.width, 0],
      [this.dimensions.width, this.dimensions.height],
      [0, this.dimensions.height]
    ];

    ctx.moveTo(polygonPoints[0][0], polygonPoints[0][1]);
    ctx.lineTo(polygonPoints[1][0], polygonPoints[1][1]);
    ctx.lineTo(polygonPoints[2][0], polygonPoints[2][1]);
    ctx.lineTo(polygonPoints[3][0], polygonPoints[3][1]);
    ctx.lineTo(polygonPoints[0][0], polygonPoints[0][1]);
    ctx.closePath();

    let dimensions = this.dimensions;

    let xPadding = (dimensions.width - dimensions.frame) / 2;
    let yPadding = (dimensions.height - dimensions.frame) / 2;
    let frameWidth = dimensions.frame;
    let holePoints = [
      [xPadding, yPadding],
      [xPadding, yPadding + frameWidth],
      [xPadding + frameWidth, yPadding + frameWidth],
      [xPadding + frameWidth, yPadding]
    ];
    ctx.moveTo(holePoints[0][0], holePoints[0][1]);
    ctx.lineTo(holePoints[1][0], holePoints[1][1]);
    ctx.lineTo(holePoints[2][0], holePoints[2][1]);
    ctx.lineTo(holePoints[3][0], holePoints[3][1]);
    ctx.lineTo(holePoints[0][0], holePoints[0][1]);
    ctx.closePath();

    ctx.fillStyle = '#77777799';
    ctx.strokeStyle = '#FFFFFFFF';
    ctx.lineWidth = 2;
    ctx.fill();

    this.addLensCorners(ctx, xPadding, yPadding, frameWidth, ANGLE_WIDTH);
  }

  addLensCorners(ctx, xPadding, yPadding, frameWidth, angleWidth) {
    ctx.beginPath();

    // top-left corner
    ctx.moveTo(xPadding, yPadding + angleWidth);
    ctx.lineTo(xPadding, yPadding);
    ctx.lineTo(xPadding + angleWidth, yPadding);

    // top-right corner
    ctx.moveTo(xPadding + frameWidth - angleWidth, yPadding);
    ctx.lineTo(xPadding + frameWidth, yPadding);
    ctx.lineTo(xPadding + frameWidth, yPadding + angleWidth);

    // bottom-right corner
    ctx.moveTo(xPadding + frameWidth - angleWidth, yPadding + frameWidth);
    ctx.lineTo(xPadding + frameWidth, yPadding + frameWidth);
    ctx.lineTo(xPadding + frameWidth, yPadding + frameWidth - angleWidth);

    // bottom-left corner
    ctx.moveTo(xPadding, yPadding + frameWidth - angleWidth);
    ctx.lineTo(xPadding, yPadding + frameWidth);
    ctx.lineTo(xPadding + angleWidth, yPadding + frameWidth);

    ctx.stroke();
  }
}

const audioData = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");

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
const SCAN_TIMEOUT = 300;
const PskBarcodeScanner = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.title = '';
        this.allowFileBrowsing = false;
        this.disableFrame = false;
        this.ZXing = null;
        this.devices = [];
        this.activeDeviceId = null;
        this.cameraIsAvailable = false;
        this.overlay = null;
        this.codeReader = null;
        window.addEventListener('resize', _ => {
            this.cleanupOverlays();
            this.drawOverlays();
            // this.startCamera(this.activeDeviceId);
        });
    }
    drawOverlays() {
        if (!this.element) {
            return;
        }
        const videoElement = this.element.querySelector('#video');
        let scannerContainer = this.element.querySelector('#scanner_container');
        this.overlay = new VideoOverlay(scannerContainer, videoElement);
        this.overlay.createOverlaysCanvases('lensCanvas', 'overlayCanvas');
        this.overlay.drawLensCanvas();
    }
    cleanupOverlays() {
        if (this.overlay) {
            this.overlay.removeOverlays();
        }
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
        this.cleanupOverlays();
        this.drawOverlays();
        // videoElement.width = constraints.video.width.ideal;
        // videoElement.height = constraints.video.height.ideal;
        this.codeReader.reset();
        this.codeReader.decodeFromConstraints(constraints, videoElement, (result, err) => {
            if (result) {
                console.log('result', result);
                if (this.modelHandler) {
                    this.overlay.drawOverlay(result.resultPoints);
                    audioData.play();
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
