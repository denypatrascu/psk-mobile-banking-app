import{r as A,h as t,g as i}from"./p-87f0c668.js";import"./p-ff3b654f.js";import"./p-185b2ebc.js";import"./p-a5fc534d.js";import{B as s}from"./p-67458612.js";import{C as e}from"./p-b4c074e0.js";import{T as o}from"./p-9a6ac7e0.js";class a extends class{constructor(A){this.scannerContainer=A,window.cardinal.barcodeScanner?this.dimensions=window.cardinal.barcodeScanner.dimensions:(this.dimensions=this.getDimensions(this.scannerContainer),window.cardinal.barcodeScanner={dimensions:this.dimensions})}getDimensions(A){return{width:A.offsetWidth,height:A.offsetHeight,frame:.75*Math.min(A.offsetWidth,A.offsetHeight)-40}}addCanvasToView(A,t){let i=document.createElement("canvas");return i.id=A,i.width=this.dimensions.width,i.height=this.dimensions.height,i.style.position="absolute",i.style.width="100%",i.style.top="0",i.style.left="0","object"==typeof t&&Object.keys(t).forEach(A=>{i.style[A]&&(i.style[A]=t[A])}),this.scannerContainer.appendChild(i),i}}{constructor(A,t){super(A),this.videoSource=t;let i=this.dimensions;this.cropOptions=[(i.width-i.frame)/2,(i.height-i.frame)/2,i.frame,i.frame]}getCropOptions(){return this.cropOptions}createOverlaysCanvases(A,t){this.lensCanvas=this.addCanvasToView(A),this.overlayCanvas=this.addCanvasToView(t)}removeOverlays(){try{this.scannerContainer.removeChild(this.lensCanvas),this.scannerContainer.removeChild(this.overlayCanvas)}catch(A){}}drawOverlay(A){let t,i,s,e;A.length>=2&&(t=A[0].x,i=A[0].y,s=A[1].x,e=A[1].y);let o=t+i+s+e===0;this.overlayCanvas.width=this.dimensions.width,this.overlayCanvas.height=this.dimensions.height;let a=this.cropOptions[0],n=this.cropOptions[1],h=this.cropOptions[2];if(this.overlayCanvas.getContext){let A=this.overlayCanvas.getContext("2d");if(A.lineWidth=5,A.strokeStyle="#48d96099",A.fillStyle="#48d96099",A.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),A.beginPath(),o)A.lineTo(t,i),A.lineTo(s,e);else{const t=60,i=h-2*t;A.rect(a+t,n+t,i,i)}A.closePath(),A.fill(),A.stroke(),A.strokeStyle="#48d960FF",this.addLensCorners(A,a,n,h,50),setTimeout(()=>{A.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height)},500)}}drawLensCanvas(){let A=this.lensCanvas.getContext("2d");A.beginPath();let t=[[0,0],[this.dimensions.width,0],[this.dimensions.width,this.dimensions.height],[0,this.dimensions.height]];A.moveTo(t[0][0],t[0][1]),A.lineTo(t[1][0],t[1][1]),A.lineTo(t[2][0],t[2][1]),A.lineTo(t[3][0],t[3][1]),A.lineTo(t[0][0],t[0][1]),A.closePath();let i=this.dimensions,s=(i.width-i.frame)/2,e=(i.height-i.frame)/2,o=i.frame,a=[[s,e],[s,e+o],[s+o,e+o],[s+o,e]];A.moveTo(a[0][0],a[0][1]),A.lineTo(a[1][0],a[1][1]),A.lineTo(a[2][0],a[2][1]),A.lineTo(a[3][0],a[3][1]),A.lineTo(a[0][0],a[0][1]),A.closePath(),A.fillStyle="#77777799",A.strokeStyle="#FFFFFFFF",A.lineWidth=2,A.fill(),this.addLensCorners(A,s,e,o,50)}addLensCorners(A,t,i,s,e){A.beginPath(),A.moveTo(t,i+e),A.lineTo(t,i),A.lineTo(t+e,i),A.moveTo(t+s-e,i),A.lineTo(t+s,i),A.lineTo(t+s,i+e),A.moveTo(t+s-e,i+s),A.lineTo(t+s,i+s),A.lineTo(t+s,i+s-e),A.moveTo(t,i+s-e),A.lineTo(t,i+s),A.lineTo(t+e,i+s),A.stroke()}}const n=new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");var h=function(A,t,i,s){var e,o=arguments.length,a=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(A,t,i,s);else for(var n=A.length-1;n>=0;n--)(e=A[n])&&(a=(o<3?e(a):o>3?e(t,i,a):e(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a};const r=class{constructor(t){A(this,t),this.title="",this.ZXing=null,this.activeDeviceId=null,this.status="Camera detection in progress...",this.isCameraAvailable=!1,this.codeReader=null,this.overlay=null,this.devices=[],this.isScanDone=!1,this.isComponentDisconnected=!1,window.addEventListener("resize",()=>{this.cleanupOverlays(),this.drawOverlays()})}drawOverlays(){if(!this.element)return;const A=this.element.querySelector("#video"),t=this.element.querySelector("#scanner-container");this.overlay=new a(t,A),this.overlay.createOverlaysCanvases("lensCanvas","overlayCanvas"),this.overlay.drawLensCanvas()}cleanupOverlays(){this.overlay&&this.overlay.removeOverlays()}startScanning(A){const t=this.element.querySelector("#video"),i={video:{facingMode:"environment"}};A&&"no-camera"!==A&&(delete i.video.facingMode,i.video.deviceId={exact:A}),this.isScanDone||(this.cleanupOverlays(),this.drawOverlays(),this.codeReader.reset(),this.codeReader.decodeFromConstraints(i,t,(A,t)=>{A&&!this.isScanDone&&(console.log("result",A),this.modelHandler&&(n.play(),this.overlay.drawOverlay(A.resultPoints),this.modelHandler.updateModel("data",A.text),this.isScanDone=!0,this.status="Scan done.",setTimeout(()=>{this.codeReader.reset(),this.overlay.removeOverlays()},500))),!t||t instanceof this.ZXing.NotFoundException||console.error(t)}))}switchCamera(){let A=[void 0];for(const t of this.devices)A.push(t.deviceId);let t=A.indexOf(this.activeDeviceId);t===A.length-1&&(t=-1),t++,this.activeDeviceId=A[t],this.isScanDone=!1}async componentWillLoad(){let A=()=>{!window.ZXing||this.ZXing||this.codeReader?setTimeout(A,300):(this.ZXing=window.ZXing,this.codeReader=new this.ZXing.BrowserMultiFormatReader(null,2e3))};A()}async componentWillRender(){if(this.ZXing&&(0===this.devices.length||!this.activeDeviceId)){try{this.devices=await this.codeReader.listVideoInputDevices()}catch(A){}this.devices.length>0?this.isCameraAvailable=!0:this.status="No camera detected."}}async componentDidRender(){this.isCameraAvailable&&!this.isComponentDisconnected&&this.startScanning(this.activeDeviceId)}async connectedCallback(){this.isComponentDisconnected=!1}async disconnectedCallback(){this.isComponentDisconnected=!0,this.codeReader&&this.codeReader.reset()}render(){const A={barcodeWrapper:{display:"grid",gridTemplateRows:"1fr",width:"100%",height:"100%"},videoWrapper:{position:"relative",display:"grid",gridTemplateRows:"1fr",overflow:"hidden",minHeight:"350px",padding:"0",margin:"0"},video:{height:"100%",width:"100%",objectFit:"cover"},input:{display:"none"},button:{position:"absolute",zIndex:"1",padding:"0.3em 0.6em",bottom:"1em",left:"50%",transform:"translateX(-50%)",color:"#FFFFFF",background:"transparent",borderRadius:"2px",border:"2px solid rgba(255, 255, 255, 0.75)",fontSize:"15px"}},i=window.cardinal&&window.cardinal.base?window.cardinal.base:"cardinal";return[t("script",{async:!0,src:i+"/libs/zxing.js"}),t("div",{title:this.title,style:A.barcodeWrapper},this.isCameraAvailable&&!this.isScanDone?t("div",{id:"scanner-container",style:A.videoWrapper},t("input",{type:"file",accept:"video/*",capture:"camera",style:A.input}),t("video",{id:"video",muted:!0,autoplay:!0,playsinline:!0,style:A.video}),t("button",{onClick:()=>this.switchCamera(),style:A.button},"Change camera")):t("div",null,this.status))]}get element(){return i(this)}};h([s()],r.prototype,"modelHandler",void 0),h([e()],r.prototype,"element",void 0),h([o({description:"The data-model that will be updated with the retrieved data from the scanner.",isMandatory:!0,propertyType:"string"})],r.prototype,"data",void 0),h([o({description:"A title that will be used for the current component instance.",isMandatory:!1,propertyType:"string"})],r.prototype,"title",void 0);export{r as psk_barcode_scanner}