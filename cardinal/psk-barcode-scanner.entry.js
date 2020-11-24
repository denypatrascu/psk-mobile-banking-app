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
    let { x1, y1, x2, y2, x3, y3, x4, y4 } = points;
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

class ImageOverlay extends CanvasOverlay{

  constructor(scannerContainer) {
    super(scannerContainer);
  }

  createOverlaysCanvases(imageCanvas){
    let style = {
      position:"relative",
      display:"block"
    };
    this.imageCanvas = this.addCanvasToView(imageCanvas,style);
  }

  removeOverlays(){
    this.scannerContainer.removeChild(this.imageCanvas);
  }

  getImageCanvasContext(){
    return this.imageCanvas.getContext("2d");
  }


  drawOverlay(points){

    let x1,y1,x2,y2,x3,y3,x4,y4;
    x1 = points.x1;
    y1 = points.y1;
    x2 = points.x2;
    y2 = points.y2;
    x3 = points.x3;
    y3 = points.y3;
    x4 = points.x4;
    y4 = points.y4;


    let isLine = x3 + y3 + x4 + y4 === 0;
    if (this.imageCanvas.getContext) {
      let ctx = this.imageCanvas.getContext('2d');
      ctx.lineWidth = 8;
      ctx.strokeStyle = "#48d96099";
      ctx.fillStyle = "#48d96099";

      ctx.beginPath();

      if (isLine) {
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      else {
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
    }
  }

  drawUnmatch(message){
    let ctx = this.imageCanvas.getContext('2d');
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.beginPath();
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fill();
    let fontSize = Math.floor(ctx.canvas.width/20);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = fontSize+'px serif';
    let textWidth = ctx.measureText(message).width;

    ctx.fillText(message , (ctx.canvas.width/2) - (textWidth / 2), (ctx.canvas.height/2) + fontSize);


  }
}

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
        this.componentIsDisconnected = false;
        this.decodePtr = null;
        this.videoElement = null;
        this.cameraIsOn = false;
        this.overlay = null;
        this.codeReader = null;
        this.ZXing = null;
        this.devices = [];
        this.activeDeviceId = null;
        this.cameraIsAvailable = false;
        this.handleCameraError = (error) => {
            console.log('Error: ', error);
            // this.cameraIsAvailable = false;
            // this.stopCameraUsage();
        };
        this.changeCamera = () => {
            this.stopTracks();
            this.getStream();
        };
        /**
         * select the stream and get barcode from the stream
         */
        this.getStream = () => {
            let camerasSelectList = this.element.querySelector('select#videoSource');
            let scannerContainer = this.element.querySelector('#scanner_container');
            let alternativeCameras = Array.from(camerasSelectList.querySelectorAll('option')).map((option) => {
                return option.value;
            }).filter((cameraId) => {
                return cameraId !== camerasSelectList.value;
            });
            let constraints = {
                audio: false
            };
            if (camerasSelectList.value) {
                constraints['video'] = {
                    width: { ideal: scannerContainer.offsetWidth },
                    height: { ideal: scannerContainer.offsetHeight },
                    facingMode: {
                        // this is the back camera
                        ideal: 'environment'
                    },
                    deviceId: {
                        exact: camerasSelectList.value
                    }
                };
            }
            else {
                constraints['video'] = true;
            }
            let gotStream = (stream) => {
                window['stream'] = stream; // make stream available to console
                this.cameraIsOn = true;
                this.videoElement.srcObject = stream;
                this.scanBarcodeFromCamera();
            };
            let startVideo = (constraints) => {
                navigator.mediaDevices.getUserMedia(constraints).then(gotStream.bind(this)).catch(err => {
                    if (err.message === "Could not start video source") {
                        if (alternativeCameras.length) {
                            this.removeDeviceIdFromList(constraints['video'].deviceId.exact);
                            constraints.video.deviceId = { exact: alternativeCameras.shift() };
                            startVideo(constraints);
                        }
                    }
                    else {
                        this.handleCameraError(err);
                    }
                });
            };
            startVideo(constraints);
        };
    }
    stopTracks() {
        if (window['stream']) {
            window['stream'].getTracks().forEach(track => track.stop());
            this.cameraIsOn = false;
        }
    }
    drawOverlays(scannerContainer) {
        this.overlay = new VideoOverlay(scannerContainer, this.videoElement);
        this.overlay.createOverlaysCanvases('lensCanvas', 'overlayCanvas');
        this.overlay.drawLensCanvas();
    }
    cleanupOverlays() {
        if (this.overlay) {
            this.overlay.removeOverlays();
        }
    }
    /**
     * stop camera and prepare the view for enabling it again
     */
    stopCameraUsage() {
        let scannerContainer = this.element.querySelector('#scanner_container');
        let useCameraBtn = this.element.querySelector('#use-camera-btn');
        if (useCameraBtn) {
            if (this.cameraIsAvailable) {
                this.stopTracks();
                useCameraBtn.style.display = 'block';
            }
            else {
                useCameraBtn.style.display = 'none';
            }
        }
        this.element.querySelector('#video').style.display = 'none';
        this.element.querySelector('#camera-source').style.display = 'none';
        let videoSelectOptions = this.element.querySelector('select#videoSource');
        videoSelectOptions.options.length = 0;
        videoSelectOptions.removeEventListener('change', this.changeCamera);
        this.cleanupOverlays();
        this.overlay = new ImageOverlay(scannerContainer);
        this.overlay.createOverlaysCanvases('imageCanvas');
    }
    /**
     * start camera and prepare the view for overlaying the video stream
     */
    startCameraUsage() {
        let useCameraBtn = this.element.querySelector('#use-camera-btn');
        if (useCameraBtn) {
            useCameraBtn.style.display = 'none';
        }
        this.element.querySelector('#video').style.display = 'block';
        this.element.querySelector('#camera-source').style.display = 'block';
        let scannerContainer = this.element.querySelector('#scanner_container');
        this.cleanupOverlays();
        this.startCameraScan();
        this.drawOverlays(scannerContainer);
        window.addEventListener('resize', _ => {
            this.cleanupOverlays();
            this.drawOverlays(scannerContainer);
        });
    }
    removeDeviceIdFromList(deviceId) {
        let camerasSelectList = this.element.querySelector('select#videoSource');
        for (let i = 0; i < camerasSelectList.length; i++) {
            if (camerasSelectList.options[i].value === deviceId) {
                camerasSelectList.remove(i);
                if (camerasSelectList.length) {
                    camerasSelectList.selectedIndex = i;
                }
                else {
                    camerasSelectList.selectedIndex = -1;
                }
                break;
            }
        }
    }
    /**
     * attempt to start camera and get the stream
     */
    startCameraScan() {
        this.videoElement = this.element.querySelector('video');
        let videoSelect = this.element.querySelector('select#videoSource');
        let scannerContainer = this.element.querySelector('#scanner_container');
        // let gotDevices = (deviceInfos) => {
        //   // TODO: log devices information
        //   console.log('[gotDevices] deviceInfos', deviceInfos);
        //
        //   if (deviceInfos.length) {
        //
        //     for (let i = deviceInfos.length - 1; i >= 0; --i) {
        //       let deviceInfo = deviceInfos[i];
        //       let option = document.createElement('option');
        //       option.value = deviceInfo.deviceId;
        //       if (deviceInfo.kind === 'videoinput') {
        //         option.text = deviceInfo.label || `Camera ${videoSelect.length + 1}`;
        //         videoSelect.appendChild(option);
        //       }
        //     }
        //
        //     if (videoSelect.length === 1) {
        //       scannerContainer.nextElementSibling.style.display = 'none';
        //       this.cleanupOverlays();
        //       this.drawOverlays(scannerContainer);
        //     }
        //   } else {
        //     // this.stopCameraUsage();
        //   }
        // }
        // @ts-ignore
        const codeReader = new ZXing.BrowserMultiFormatReader(null, 1500);
        codeReader.listVideoInputDevices()
            // .then(gotDevices)
            .then((deviceInfos) => {
            let selectedDeviceId = deviceInfos[0].deviceId;
            debugger;
            codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
                console.log(err, result);
            });
        });
        // .then(this.getStream).catch(this.handleCameraError);
        videoSelect.addEventListener('change', this.changeCamera.bind(this));
    }
    /**
     * ZXing library initialization
     * @param successCallback will be called when the library is ready to accept decoding tasks
     * @param resultCallback will be called when decoding tasks has positive results
     */
    initializeZXing(successCallback, resultCallback) {
        let tick = () => {
            if (window['ZXing']) {
                this.ZXing = window['ZXing']();
                this.decodePtr = this.ZXing.Runtime.addFunction(decodeCallback);
                setTimeout(successCallback, SCAN_TIMEOUT);
            }
            else {
                setTimeout(tick, SCAN_TIMEOUT);
            }
        };
        setTimeout(tick, SCAN_TIMEOUT);
        let decodeCallback = (ptr, len, _resultIndex, _resultCount, x1, y1, x2, y2, x3, y3, x4, y4) => {
            let result = new Uint8Array(this.ZXing.HEAPU8.buffer, ptr, len);
            let stringResult = '';
            let separatorIndex = 0;
            let separatorStarted = false;
            for (let i = 0; i < result.length; i++) {
                // 29 - group separator char code
                if (result[i] == 29) {
                    stringResult += '(';
                    separatorStarted = true;
                    separatorIndex = 0;
                }
                else {
                    stringResult += String.fromCharCode(result[i]);
                    if (separatorStarted) {
                        separatorIndex++;
                        if (separatorIndex == 2) {
                            stringResult += ')';
                            separatorStarted = false;
                        }
                    }
                }
            }
            resultCallback({ points: { x1, y1, x2, y2, x3, y3, x4, y4 }, data: stringResult });
        };
    }
    /**
     * this function is taking an uploaded image from the device and sending it to the decoder
     * @param event
     */
    scanBarcodeFromUploadedFile(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.stopCameraUsage();
        if (!event.data || !event.data.length) {
            return;
        }
        let file = event.data[0];
        let reader = new FileReader();
        // load to image to get it's width/height
        let img = new Image();
        img.onload = () => {
            let ctx = this.overlay.getImageCanvasContext();
            // scale canvas to image
            let scaled = BarcodeUtilFunctions.getScaledDim(img, 640, 480);
            ctx.canvas.width = scaled.width;
            ctx.canvas.height = scaled.height;
            // draw image
            ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
            let imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
            let idd = imageData.data;
            let image = this.ZXing._resize(ctx.canvas.width, ctx.canvas.height);
            this.decodeImage(image, idd, () => {
                this.overlay.drawUnmatch("No code was matched!");
            });
        };
        // this is to setup loading the image
        reader.onloadend = function () {
            //@ts-ignore
            img.src = reader.result;
        };
        // this is to read the file
        reader.readAsDataURL(file);
    }
    /**
     * this function is taking a snapshot from the video and sending a task to the decoder
     */
    scanBarcodeFromCamera() {
        const container = this.element.querySelector('#scanner_container');
        const dimensions = {
            // original video dimensions
            original: {
                width: this.videoElement.videoWidth,
                height: this.videoElement.videoHeight
            },
            // resized dimensions of video (scaled for view)
            video: {
                width: this.videoElement.offsetWidth,
                height: this.videoElement.offsetHeight
            },
            // visible part from the original video
            image: {
                width: container.offsetWidth,
                height: container.offsetHeight
            }
        };
        const ratio = dimensions.original.width / dimensions.video.width;
        if (ratio) {
            dimensions.image = {
                width: ratio * container.offsetWidth,
                height: ratio * container.offsetHeight
            };
        }
        const barcodeCanvas = document.createElement('canvas');
        const barcodeContext = barcodeCanvas.getContext('2d');
        if (!this.disableFrame) {
            let { frame: frameSize } = this.overlay.getDimensions(container);
            if (ratio) {
                frameSize *= ratio;
            }
            dimensions.image.width = frameSize;
            dimensions.image.height = frameSize;
        }
        barcodeCanvas.width = dimensions.image.width;
        barcodeCanvas.height = dimensions.image.height;
        barcodeContext.drawImage(this.videoElement, (dimensions.original.width - dimensions.image.width) / 2, (dimensions.original.height - dimensions.image.height) / 2, dimensions.image.width, dimensions.image.height, 0, 0, dimensions.image.width, dimensions.image.height);
        const { data } = barcodeContext.getImageData(0, 0, dimensions.image.width, dimensions.image.height);
        // TODO: log image extracted from video
        // const scale = 0.35;
        // const url = barcodeCanvas.toDataURL('image/png')
        // const output = [
        //   'padding: ' + barcodeCanvas.height * scale + 'px ' + barcodeCanvas.width * scale + 'px;',
        //   'background: url('+ url +') no-repeat;',
        //   'background-size: contain;'
        // ].join(' ');
        //
        // console.log('dimensions', dimensions);
        // console.log('ratio', ratio);
        // console.log('%c ', output);
        const image = this.ZXing._resize(dimensions.image.width, dimensions.image.height);
        this.decodeImage(image, data, () => {
            if (!this.componentIsDisconnected) {
                setTimeout(() => {
                    if (this.cameraIsOn) {
                        this.scanBarcodeFromCamera();
                    }
                }, SCAN_TIMEOUT);
            }
        });
    }
    decodeImage(image, idd, callback) {
        for (let i = 0, j = 0; i < idd.length; i += 4, j++) {
            this.ZXing.HEAPU8[image + j] = idd[i];
        }
        let err = this.ZXing._decode_any(this.decodePtr);
        if (err === -2) {
            if (typeof callback === 'function') {
                callback();
            }
        }
    }
    /**
     * COMPONENT LIFECYCLE  METHODS
     */
    /**
     * check if any camera is available before first render
     */
    // componentWillLoad(): Promise<any> {
    //   return new Promise((resolve => {
    //     // @ts-ignore
    //     const codeReader = new ZXing.BrowserMultiFormatReader()
    //     codeReader.listVideoInputDevices()
    //       .then(videoInputDevices => {
    //         if (videoInputDevices.length >= 1) {
    //           this.cameraIsAvailable = true;
    //         }
    //         return resolve();
    //       })
    //   }))
    // }
    // async componentWillLoad() {
    //   let ZXing = window['ZXing'];
    //   const codeReader = new ZXing.BrowserMultiFormatReader();
    //
    //   return codeReader.listVideoInputDevices().then(videoInputDevices => {
    //     if (videoInputDevices.length >= 1) {
    //       this.cameraIsAvailable = true;
    //     }
    //   })
    // }
    cameraChanged(deviceId) {
        this.activeDeviceId = deviceId;
        const videoElement = this.element.querySelector('#video');
        this.codeReader.reset();
        let log = console.log;
        console.log = (...args) => {
            if (args.length != 0 && args[0] instanceof this.ZXing.NotFoundException)
                return;
            log(...args);
        };
        this.codeReader.decodeFromVideoDevice(this.activeDeviceId, videoElement, (result, err) => {
            if (result) {
                console.log(result);
                // document.getElementById('result').textContent = result.text
            }
            if (err && !(err instanceof this.ZXing.NotFoundException)) {
                // console.error(err)
                // document.getElementById('result').textContent = err
            }
        });
        console.log(`Started continous decode from camera with id ${this.activeDeviceId}`);
    }
    async componentWillLoad() {
        let tick = () => {
            if (window['ZXing']) {
                this.ZXing = window['ZXing'];
                this.codeReader = new this.ZXing.BrowserMultiFormatReader(null, 15000);
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
                this.activeDeviceId = this.devices[1].deviceId;
            }
        }
    }
    async componentDidRender() {
        // if (this.componentIsDisconnected) return;
        //
        // if (this.cameraIsAvailable === false) {
        //   this.element.addEventListener('loaded-local-file', this.scanBarcodeFromUploadedFile.bind(this));
        // } else {
        //   if (stringToBoolean(this.allowFileBrowsing)) {
        //     this.element.addEventListener('loaded-local-file', this.scanBarcodeFromUploadedFile.bind(this));
        //     this.element.addEventListener('use-camera', this.startCameraUsage.bind(this));
        //   }
        // }
        // this.initializeZXing(this.startCameraUsage.bind(this), result => {
        //   this.modelHandler.updateModel('data', result.data);
        //   audioData.play();
        //   this.overlay.drawOverlay(result.points);
        //   if (!this.componentIsDisconnected) {
        //     setTimeout(() => {
        //       if (this.cameraIsOn) this.scanBarcodeFromCamera();
        //     }, 1000);
        //   }
        // });
    }
    disconnectedCallback() {
        this.componentIsDisconnected = true;
        this.stopTracks();
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
        const selectCamera = (h("select", { style: style.select, onChange: (e) => this.cameraChanged(e.target.value) }, this.devices.map(device => (h("option", { value: device.deviceId }, device.label)))));
        // TODO: zxing testing
        // (window as any).cardinalBase}/cardinal/libs/zxing.js
        // <script async src="/cardinal/libs/zxing.new.js"/>
        return [
            h("script", { async: true, src: `${window.cardinalBase}/cardinal/libs/zxing.new.js` }),
            h("div", { title: this.title, style: style.barcodeWrapper }, this.cameraIsAvailable === false
                ? (h("psk-highlight", { title: "No camera detected", "type-of-highlight": "warning" }, h("p", null, "You can still use your device files to check for barcodes!")))
                : [
                    h("div", { id: "scanner_container", style: style.videoWrapper }, h("video", { id: "video", muted: true, autoplay: true, playsinline: true, style: style.video })),
                    h("div", { style: style.controls }, h("label", { htmlFor: "video-source", style: { margin: '0' } }, "Video source: "), h("div", { class: "select", id: "camera-source" }, h("span", null, this.activeDeviceId), selectCamera))
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
