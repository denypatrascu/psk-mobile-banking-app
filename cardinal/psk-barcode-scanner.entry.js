import { r as registerInstance, h, g as getElement } from './index-bb32d9fe.js';
import './index-90f51874.js';
import './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { B as BindModel } from './BindModel-524e1a2c.js';
import { C as CustomTheme } from './CustomTheme-f57ed858.js';
import './TableOfContentEvent-f33bf2c4.js';
import { T as TableOfContentProperty } from './TableOfContentProperty-de8188be.js';

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
    let x1, y1, x2, y2;

    if (points.length >= 2) {
      x1 = points[0].x;
      y1 = points[0].y;

      x2 = points[1].x;
      y2 = points[1].y;
    }

    let isLine = x1 + y1 + x2 + y2 === 0;

    this.overlayCanvas.width = this.dimensions.width;
    this.overlayCanvas.height = this.dimensions.height;

    let xPadding = this.cropOptions[0];
    let yPadding = this.cropOptions[1];
    let frameWidth = this.cropOptions[2];

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
        const gap = 60;
        const size = frameWidth - 2 * gap;
        ctx.rect(xPadding + gap, yPadding + gap, size, size);
      }

      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = '#48d960FF';

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
        // @TableOfContentProperty({
        //   description: `A boolean value indicating that the current component instance is accepting files from the device. Please note that if no camera is detected, this feature will be automatically enabled.`,
        //   isMandatory: false,
        //   propertyType: `boolean`
        // })
        // @Prop() allowFileBrowsing: boolean = false;
        // @TableOfContentProperty({
        //   description: [
        //     `A boolean value indicating the scope of the 2D matrix of scanner.`,
        //     `If it is <code>true</code> the component will analyze only the center square / frame.`,
        //     `Otherwise the entire screen.`
        //   ],
        //   isMandatory: false,
        //   propertyType: `boolean`
        // })
        // @Prop() disableFrame = false;
        this.ZXing = null;
        this.activeDeviceId = null;
        this.cameraIsAvailable = false;
        this.devices = [];
        this.overlay = null;
        this.codeReader = null;
        this.scanDone = false;
        this.componentIsDisconnected = false;
        window.addEventListener('resize', _ => {
            this.cleanupOverlays();
            this.drawOverlays();
            // this.startScanning(this.activeDeviceId);
        });
    }
    drawOverlays() {
        if (!this.element) {
            return;
        }
        const videoElement = this.element.querySelector('#video');
        const scannerContainer = this.element.querySelector('#scanner-container');
        this.overlay = new VideoOverlay(scannerContainer, videoElement);
        this.overlay.createOverlaysCanvases('lensCanvas', 'overlayCanvas');
        this.overlay.drawLensCanvas();
    }
    cleanupOverlays() {
        if (this.overlay) {
            this.overlay.removeOverlays();
        }
    }
    startScanning(deviceId) {
        const videoElement = this.element.querySelector('#video');
        // let log = console.log;
        // console.log = (...args) => {
        //   if (args.length != 0 && args[0] instanceof this.ZXing.NotFoundException) {
        //     return;
        //   }
        //   log(...args);
        // }
        const constraints = {
            video: {
                facingMode: 'environment',
            }
        };
        if (deviceId && deviceId !== 'no-camera') {
            delete constraints.video.facingMode;
            constraints.video['deviceId'] = { exact: deviceId };
        }
        if (!this.scanDone) {
            this.cleanupOverlays();
            this.drawOverlays();
            this.codeReader.reset();
            this.codeReader.decodeFromConstraints(constraints, videoElement, (result, err) => {
                if (result && !this.scanDone) {
                    console.log('result', result);
                    if (this.modelHandler) {
                        audioData.play();
                        this.overlay.drawOverlay(result.resultPoints);
                        this.modelHandler.updateModel('data', result.text);
                        this.overlay.removeOverlays();
                        this.codeReader.reset();
                        this.scanDone = true;
                        // console.log = log;
                    }
                }
                if (err && !(err instanceof this.ZXing.NotFoundException)) {
                    console.error(err);
                }
            });
        }
    }
    switchCamera() {
        let devices = [undefined];
        for (const device of this.devices) {
            devices.push(device.deviceId);
        }
        let currentIndex = devices.indexOf(this.activeDeviceId);
        if (currentIndex === devices.length - 1) {
            currentIndex = -1;
        }
        currentIndex++;
        this.activeDeviceId = devices[currentIndex];
        this.scanDone = false;
    }
    async componentWillLoad() {
        let tick = () => {
            if (window['ZXing'] && !this.ZXing && !this.codeReader) {
                this.ZXing = window['ZXing'];
                this.codeReader = new this.ZXing.BrowserMultiFormatReader(null, 2000);
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
            if (this.devices.length > 0) {
                this.cameraIsAvailable = true;
            }
        }
    }
    async componentDidRender() {
        if (this.cameraIsAvailable && !this.componentIsDisconnected) {
            this.startScanning(this.activeDeviceId);
        }
    }
    async disconnectedCallback() {
        this.componentIsDisconnected = true;
        if (this.codeReader) {
            this.codeReader.reset();
        }
    }
    render() {
        const style = {
            barcodeWrapper: {
                display: 'grid', gridTemplateRows: '1fr',
                width: '100%', height: '100%'
            },
            videoWrapper: {
                position: 'relative',
                display: 'grid', gridTemplateRows: '1fr',
                overflow: 'hidden',
                minHeight: '300px'
            },
            video: {
                height: '100%', width: '100%',
                objectFit: 'cover'
            },
            hidden: {
                display: 'none'
            },
            button: {
                position: 'absolute', zIndex: '1',
                padding: '0.3em 0.6em',
                bottom: '1em', left: '50%', transform: 'translateX(-50%)',
                color: '#FFFFFF', background: 'transparent',
                borderRadius: '2px', border: '2px solid rgba(255, 255, 255, 0.75)',
                fontSize: '15px'
            }
        };
        return [
            h("script", { async: true, src: `${window['cardinalBase'] || ''}/cardinal/libs/zxing.new.js` }),
            h("div", { title: this.title, style: style.barcodeWrapper }, this.cameraIsAvailable === true && this.scanDone === false ? (h("div", { id: "scanner-container", style: style.videoWrapper }, h("input", { type: "file", accept: "video/*", capture: "camera", style: style.hidden }), h("video", { id: "video", muted: true, autoplay: true, playsinline: true, style: style.video }), h("button", { onClick: _ => this.switchCamera(), style: style.button }, "Change camera"))) : null)
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

export { PskBarcodeScanner as psk_barcode_scanner };
