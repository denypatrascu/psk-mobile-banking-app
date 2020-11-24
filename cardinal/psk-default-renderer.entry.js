import { r as registerInstance, f as createEvent, h } from './index-bb32d9fe.js';
import { M as MOBILE_MAX_WIDTH } from './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { C as CustomTheme } from './CustomTheme-f57ed858.js';

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
const AppRootDefaultRender = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.getAppVersion = createEvent(this, "getAppVersion", 7);
        this.mobileLayout = false;
        this.disableSidebar = false;
    }
    componentWillLoad() {
        return new Promise((resolve) => {
            this.getAppVersion.emit((err, appVersion) => {
                if (!err) {
                    this.appVersion = appVersion;
                }
                resolve();
            });
        });
    }
    render() {
        let appMenuCmpt = h("psk-app-menu", { "item-renderer": "sidebar-renderer", hamburgerMaxWidth: MOBILE_MAX_WIDTH });
        let versionCmpt = h("div", { class: "nav-footer" }, "version ", this.appVersion);
        let asideComponents = [];
        if (this.mobileLayout) {
            asideComponents = [h("psk-user-profile", { "profile-renderer": "mobile-profile-renderer" }), appMenuCmpt];
        }
        else {
            asideComponents = [h("psk-user-profile", null), appMenuCmpt, versionCmpt];
        }
        return (h("div", { class: `global_container ${this.mobileLayout ? "is-mobile" : ""}` }, this.disableSidebar === false ? h("aside", null, asideComponents) : null, h("section", null, h("psk-app-router", null), this.mobileLayout === true ? versionCmpt : null)));
    }
};
__decorate([
    CustomTheme()
], AppRootDefaultRender.prototype, "mobileLayout", void 0);

export { AppRootDefaultRender as psk_default_renderer };
