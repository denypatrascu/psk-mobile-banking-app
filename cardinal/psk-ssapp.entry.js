import { r as registerInstance, h, g as getElement } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { B as BindModel } from './BindModel-524e1a2c.js';
import { C as CustomTheme } from './CustomTheme-f57ed858.js';
import { T as TableOfContentProperty } from './TableOfContentProperty-de8188be.js';
import { N as NavigatinTrackerService } from './NavigationTrackerService-e3e04b6b.js';

function registerPowerCord(identity, reference){
  //power cord to communicate with the iframe in which SSApp is loaded
  let PowerCord = require("swarm-engine").SSAppPowerCord;
  let pc = new PowerCord(reference.contentWindow);
  $$.swarmEngine.plug(identity, pc);
}

function getIdentityFromSSAppName(ssappName){
  //todo: build a power cord identity based on ssappName
  return ssappName;
}

class SSAppInstancesRegistry {

  constructor(){
    this.registry = [];
    if(typeof $$.flows === "undefined"){
      require('callflow').initialise();
    }
    if(typeof $$.swarms === "undefined"){
      const se = require("swarm-engine");
      se.initialise("wallet");
    }else {
      //this should force an error and help identify misuse of swarm engine
      $$.swarmEngine.updateIdentity("wallet");
    }
  }

  addSSAppReference(ssappName, reference) {
    console.log("registering ssapp", ssappName, reference);
    if (typeof this.registry[ssappName] !== "undefined" && this.registry[ssappName] !== reference) {
      //todo: what should do when this happens
      console.log("Replacing a reference.");
    }else {
      registerPowerCord(getIdentityFromSSAppName(ssappName), reference);
    }
    this.registry[ssappName] = reference;
  }

  removeSSAppReference(ssappName) {
    if (typeof this.registry[ssappName] === "undefined") {
      return;
    }
    delete this.registry[ssappName];
    $$.swarmEngine.unplug(getIdentityFromSSAppName(ssappName));
  }

  getSSAppReference(ssappName) {
    return this.registry[ssappName];
  }
}

let instance = new SSAppInstancesRegistry();

const SSAppInstanceRegistry = {
  getInstance: function () {
    return instance;
  }
};

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
const PskSelfSovereignApp = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.seed = null;
        this.componentInitialized = false;
    }
    connectedCallback() {
        navigator.serviceWorker.addEventListener('message', this.__getSWOnMessageHandler());
    }
    disconnectedCallback() {
        navigator.serviceWorker.removeEventListener('message', this.__getSWOnMessageHandler());
    }
    componentShouldUpdate(newValue, oldValue, changedState) {
        if (newValue !== oldValue && changedState === "digestKeySsiHex") {
            window.document.removeEventListener(oldValue, this.eventHandler);
            window.document.addEventListener(newValue, this.eventHandler);
            return true;
        }
        return false;
    }
    componentWillLoad() {
        if (!this.element.isConnected) {
            return;
        }
        return new Promise((resolve) => {
            this.componentInitialized = true;
            this.loadApp(resolve);
        });
    }
    componentDidLoad() {
        let iframe = this.element.querySelector("iframe");
        console.log("#### Trying to register ssapp reference");
        SSAppInstanceRegistry.getInstance().addSSAppReference(this.appName, iframe);
        this.eventHandler = this.__ssappEventHandler.bind(this);
        window.document.addEventListener(this.digestKeySsiHex, this.eventHandler);
        NavigatinTrackerService.getInstance().listenForSSAppHistoryChanges();
    }
    loadApp(callback) {
        if (this.__hasRelevantMatchParams()) {
            this.seed = this.match.params.keySSI;
        }
        if (this.componentInitialized) {
            this.digestKeySsiHex = this.__digestMessage(this.seed);
            NavigatinTrackerService.getInstance().setIdentity(this.digestKeySsiHex);
            if (typeof callback === "function") {
                callback();
            }
        }
    }
    ;
    render() {
        let basePath;
        let parentWindow = window.parent;
        let currentWindow = window;
        try {
            while (currentWindow !== parentWindow) {
                basePath = parentWindow.location.origin + parentWindow.location.pathname;
                // @ts-ignore
                currentWindow = parentWindow;
                parentWindow = parentWindow.parent;
            }
        }
        catch (e) { }
        finally {
            basePath = currentWindow.location.origin + currentWindow.location.pathname;
            if (basePath[basePath.length - 1] !== '/') {
                basePath += '/';
            }
            const iframeSrc = basePath + "iframe/" + this.digestKeySsiHex;
            return (h("iframe", { "landing-page": this.landingPath, frameborder: "0", style: {
                    overflow: "hidden",
                    height: "100%",
                    width: "100%"
                }, src: iframeSrc }));
        }
    }
    __hasRelevantMatchParams() {
        return this.match && this.match.params && this.match.params.keySSI;
    }
    __ssappEventHandler(e) {
        const data = e.detail || {};
        let iframe = this.element.querySelector("iframe");
        if (data.query === 'seed') {
            iframe.contentWindow.document.dispatchEvent(new CustomEvent(this.digestKeySsiHex, {
                detail: {
                    seed: this.seed
                }
            }));
            return;
        }
        if (data.status === 'completed') {
            iframe.contentWindow.location.reload();
        }
    }
    __getSWOnMessageHandler() {
        if (this.__onServiceWorkerMessageHandler) {
            return this.__onServiceWorkerMessageHandler;
        }
        /**
         * Listen for seed requests
         */
        this.__onServiceWorkerMessageHandler = (e) => {
            if (!e.data || e.data.query !== 'seed') {
                return;
            }
            const swWorkerIdentity = e.data.identity;
            if (swWorkerIdentity === this.digestKeySsiHex) {
                e.source.postMessage({
                    seed: this.seed
                });
            }
        };
        return this.__onServiceWorkerMessageHandler;
    }
    __digestMessage(message) {
        // @ts-ignore
        const PskCrypto = require("pskcrypto");
        const hexDigest = PskCrypto.pskHash(message, "hex");
        return hexDigest;
    }
    get element() { return getElement(this); }
    static get watchers() { return {
        "seed": ["loadApp"],
        "match": ["loadApp"],
        "landingPath": ["loadApp"]
    }; }
};
__decorate([
    BindModel()
], PskSelfSovereignApp.prototype, "modelHandler", void 0);
__decorate([
    CustomTheme(),
    TableOfContentProperty({
        isMandatory: true,
        description: [`This property represents the name of the Self Sovereign Application that you want to run.`],
        propertyType: 'string'
    })
], PskSelfSovereignApp.prototype, "appName", void 0);
__decorate([
    TableOfContentProperty({
        isMandatory: false,
        description: `This property keeps should have 2 keys: currentDossierPath and fullPath`,
        propertyType: 'string'
    })
], PskSelfSovereignApp.prototype, "seed", void 0);
__decorate([
    TableOfContentProperty({
        isMandatory: true,
        description: `This property represents the direct path that will be passed to the Iframe as the landing-page property.`,
        propertyType: 'string'
    })
], PskSelfSovereignApp.prototype, "landingPath", void 0);

export { PskSelfSovereignApp as psk_ssapp };
