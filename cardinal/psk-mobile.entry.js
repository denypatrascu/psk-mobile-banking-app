import { r as registerInstance, h, g as getElement } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import './utilFunctions-74de6735.js';
import { C as CustomTheme } from './CustomTheme-f57ed858.js';
import { T as TableOfContentProperty } from './TableOfContentProperty-de8188be.js';
import { C as ControllerRegistryService } from './ControllerRegistryService-229f368f.js';

const pskMobileDefaultCss = ".mobile{position:relative;height:100%;width:100%;display:grid;grid-template-rows:auto 1fr auto}.mobile>header{position:static;height:4rem;padding:0 0.5rem;display:grid;grid-template-columns:auto auto 1fr 50px;place-items:center;z-index:8}.mobile>header>.title{margin:0;padding:0;font-size:1.6rem}.mobile>header .btn{padding:0;margin:0;min-width:50px;min-height:50px;border-radius:5px}.mobile>header .btn .icon,.mobile>footer .btn .icon{padding:0;margin:0}.mobile>header .aside-menu,.mobile>header .options-menu{position:absolute;top:4rem}.mobile>header .aside-menu{left:0;bottom:0;width:100%;max-width:300px;display:grid;align-content:flex-start;overflow-y:auto;overflow-x:hidden;z-index:9}.mobile>header .aside-menu .wrapper_container{width:100%}.mobile>header .aside-menu .profile .card-body.text-center{padding-top:2rem;padding-bottom:1rem}.mobile>header .options-menu{display:grid;right:0;min-width:200px;z-index:8}.mobile>main{display:block;padding:1rem;overflow-y:auto}.mobile>main .main-cover{position:fixed;content:'';top:4rem;bottom:0;left:0;right:0;z-index:7}@media screen and (max-width: 340px){.mobile>header .aside-menu{max-width:100%}}::slotted([slot='options']){display:grid;padding:0 !important}::slotted([slot='footer']){display:flex;height:4rem;margin-bottom:-5px;padding:0 1rem;justify-content:space-between;align-items:center}:host([disable-header]) .mobile{grid-template-rows:1fr auto}:host([disable-sidebar]) .mobile>header{padding-left:50px}:host([disable-sidebar][enable-back]) .mobile>header{padding-left:0}.mobile>header{background-color:#5E7FE1}.mobile>header>.title{color:#FFFFFF}.mobile>header .btn{border-color:transparent;background-color:transparent !important}.mobile>header .btn:hover,.mobile>header .btn:focus,.mobile>header .btn:active{border-style:solid;border-color:transparent;background-color:transparent}.mobile>header .aside-menu{background-color:#4461B5}.mobile>header .options-menu{background-color:#FFFFFF;box-shadow:0 0 1px rgba(0, 0, 0, 0.25)}.mobile>main{background-color:#FAFAFA}.mobile>main>*{color:#000000}.mobile>main .main-cover{background-color:rgba(0, 0, 0, 0.75)}::-webkit-scrollbar{height:6px}::-webkit-scrollbar-thumb{background-color:#CCCCCC;border-radius:3px}::-webkit-scrollbar-track{background-color:#F1F1F1}.mobile>header .aside-menu::-webkit-scrollbar{background-color:#FFFFFF;width:7px}.mobile>header .aside-menu::-webkit-scrollbar-track{background-color:#4461B5}.mobile>header .aside-menu::-webkit-scrollbar-thumb{background-color:#FFFFFF;border-radius:10px;border:1px solid #4461B5}.mobile>header .aside-menu::-webkit-scrollbar-button{display:none}";

const pskMobileDemoCss = ".mobile{position:relative;height:100%;width:100%;display:grid;grid-template-rows:auto 1fr auto}.mobile>header{position:static;height:4rem;padding:0 0.5rem;display:grid;grid-template-columns:auto auto 1fr 50px;place-items:center;z-index:8}.mobile>header>.title{margin:0;padding:0;font-size:1.6rem}.mobile>header .btn{padding:0;margin:0;min-width:50px;min-height:50px;border-radius:5px}.mobile>header .btn .icon,.mobile>footer .btn .icon{padding:0;margin:0}.mobile>header .aside-menu,.mobile>header .options-menu{position:absolute;top:4rem}.mobile>header .aside-menu{left:0;bottom:0;width:100%;max-width:300px;display:grid;align-content:flex-start;overflow-y:auto;overflow-x:hidden;z-index:9}.mobile>header .aside-menu .wrapper_container{width:100%}.mobile>header .aside-menu .profile .card-body.text-center{padding-top:2rem;padding-bottom:1rem}.mobile>header .options-menu{display:grid;right:0;min-width:200px;z-index:8}.mobile>main{display:block;padding:1rem;overflow-y:auto}.mobile>main .main-cover{position:fixed;content:'';top:4rem;bottom:0;left:0;right:0;z-index:7}@media screen and (max-width: 340px){.mobile>header .aside-menu{max-width:100%}}::slotted([slot='options']){display:grid;padding:0 !important}::slotted([slot='footer']){display:flex;height:4rem;margin-bottom:-5px;padding:0 1rem;justify-content:space-between;align-items:center}:host([disable-header]) .mobile{grid-template-rows:1fr auto}:host([disable-sidebar]) .mobile>header{padding-left:50px}:host([disable-sidebar][enable-back]) .mobile>header{padding-left:0}.mobile>header{background-color:#5E7FE1}.mobile>header>.title{color:#FFFFFF}.mobile>header .btn{border-color:transparent;background-color:transparent !important}.mobile>header .btn:hover,.mobile>header .btn:focus,.mobile>header .btn:active{border-style:solid;border-color:transparent;background-color:transparent}.mobile>header .aside-menu{background-color:#4461B5}.mobile>header .options-menu{background-color:#FFFFFF;box-shadow:0 0 1px rgba(0, 0, 0, 0.25)}.mobile>main{background-color:#FAFAFA}.mobile>main>*{color:#000000}.mobile>main .main-cover{background-color:rgba(0, 0, 0, 0.75)}::-webkit-scrollbar{height:6px}::-webkit-scrollbar-thumb{background-color:#CCCCCC;border-radius:3px}::-webkit-scrollbar-track{background-color:#F1F1F1}.mobile>header .aside-menu::-webkit-scrollbar{background-color:#FFFFFF;width:7px}.mobile>header .aside-menu::-webkit-scrollbar-track{background-color:#4461B5}.mobile>header .aside-menu::-webkit-scrollbar-thumb{background-color:#FFFFFF;border-radius:10px;border:1px solid #4461B5}.mobile>header .aside-menu::-webkit-scrollbar-button{display:none}.mobile>main .main-cover{position:absolute}:host([id=\"demo-title\"]) .mobile{height:auto}:host([id=\"demo-title\"]) .mobile>main{display:none}:host([id=\"demo-footer\"]) .mobile{height:auto}:host([id=\"demo-footer\"]) .mobile>header,:host([id=\"demo-footer\"]) .mobile>main{display:none}:host([id=\"demo-options\"]) .mobile{height:250px}:host([id=\"demo-options\"]) .mobile>header .options-menu{visibility:hidden;display:none}:host([id=\"demo-options\"]) .mobile>header .options-menu[hidden]{visibility:visible !important;display:block !important}:host([id=\"demo-content\"]) .mobile{height:350px}:host([id=\"demo-content\"]) .mobile>header .aside-menu{height:calc(350px - 4rem)}:host([id=\"demo-overall\"]) .mobile{height:calc(100vh - 15rem)}@media (max-width: 550px){:host([id=\"demo-title\"]) .mobile>header .title{font-size:3vw}}";

const pskMobileLayoutCss = ".mobile{position:relative;height:100%;width:100%;display:grid;grid-template-rows:auto 1fr auto}.mobile>header{position:static;height:4rem;padding:0 0.5rem;display:grid;grid-template-columns:auto auto 1fr 50px;place-items:center;z-index:8}.mobile>header>.title{margin:0;padding:0;font-size:1.6rem}.mobile>header .btn{padding:0;margin:0;min-width:50px;min-height:50px;border-radius:5px}.mobile>header .btn .icon,.mobile>footer .btn .icon{padding:0;margin:0}.mobile>header .aside-menu,.mobile>header .options-menu{position:absolute;top:4rem}.mobile>header .aside-menu{left:0;bottom:0;width:100%;max-width:300px;display:grid;align-content:flex-start;overflow-y:auto;overflow-x:hidden;z-index:9}.mobile>header .aside-menu .wrapper_container{width:100%}.mobile>header .aside-menu .profile .card-body.text-center{padding-top:2rem;padding-bottom:1rem}.mobile>header .options-menu{display:grid;right:0;min-width:200px;z-index:8}.mobile>main{display:block;padding:1rem;overflow-y:auto}.mobile>main .main-cover{position:fixed;content:'';top:4rem;bottom:0;left:0;right:0;z-index:7}@media screen and (max-width: 340px){.mobile>header .aside-menu{max-width:100%}}::slotted([slot='options']){display:grid;padding:0 !important}::slotted([slot='footer']){display:flex;height:4rem;margin-bottom:-5px;padding:0 1rem;justify-content:space-between;align-items:center}:host([disable-header]) .mobile{grid-template-rows:1fr auto}:host([disable-sidebar]) .mobile>header{padding-left:50px}:host([disable-sidebar][enable-back]) .mobile>header{padding-left:0}";

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
const PskMobile = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.title = '';
        this.disableHeader = false;
        this.disableSidebar = false;
        this.enableBack = false;
        this.aside = {
            disabled: this.disableSidebar,
            hidden: true
        };
        this.options = {
            disabled: true,
            hidden: true
        };
        this.header = {
            disabled: this.disableHeader,
            title: this.title
        };
    }
    __toggleAside(hidden = !this.aside.hidden) {
        this.aside = Object.assign(Object.assign({}, this.aside), { hidden });
        this.options = Object.assign(Object.assign({}, this.options), { hidden: true });
    }
    __toggleOptions(hidden = !this.options.hidden) {
        this.options = Object.assign(Object.assign({}, this.options), { hidden });
        this.aside = Object.assign(Object.assign({}, this.aside), { hidden: true });
    }
    __findElementBySlot(slotName) {
        const children = this.__host.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i].getAttribute('slot') === slotName)
                return children[i];
        }
        return null;
    }
    onClickEvent(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const tree = e.composedPath();
        const main = this.__host.shadowRoot.querySelector('main');
        for (const elem of tree) {
            if (elem === main) {
                this.aside = Object.assign(Object.assign({}, this.aside), { hidden: true });
                this.options = Object.assign(Object.assign({}, this.options), { hidden: true });
            }
        }
    }
    // @Listen('psk-mobile:toggle-options', { target: 'document' })
    // onHandleToggleOptionsEvent(e) {
    //   this.__toggleOptions((typeof e.detail === 'boolean' ? !e.detail : !this.options.hidden));
    // }
    //
    // @Listen('psk-mobile:toggle-sidebar', { target: 'document' })
    // onHandleToggleSidebarEvent(e) {
    //   this.__toggleAside((typeof e.detail === 'boolean' ? !e.detail : !this.aside.hidden));
    // }
    async toggleSidebar(visible) {
        this.__toggleAside((typeof visible === 'boolean' ? !visible : !this.aside.hidden));
    }
    async toggleOptions(visible) {
        this.__toggleOptions((typeof visible === 'boolean' ? !visible : !this.options.hidden));
    }
    async componentWillLoad() {
        const options = this.__findElementBySlot('options');
        if (options) {
            this.options.disabled = false;
            for (let i = 0; i < options.children.length; i++) {
                options.children[i].classList.add('option-item');
            }
        }
        const footer = this.__findElementBySlot('footer');
        if (footer) {
            for (let i = 0; i < footer.children.length; i++) {
                footer.children[i].classList.add('footer-item');
            }
        }
        if (this.__findElementBySlot('title')) {
            this.header = Object.assign(Object.assign({}, this.header), { title: h("slot", { name: 'title' }) });
        }
        if (typeof this.controllerName === "string") {
            try {
                const Controller = await ControllerRegistryService.getController(this.controllerName);
                this.controller = new Controller(this.__host, this.history);
            }
            catch (err) {
                console.error(err);
            }
        }
    }
    handleAsideClick(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.__toggleAside();
    }
    handleBackClick(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        window.history.back();
    }
    handleOptionsClick(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.__toggleOptions();
    }
    render() {
        return (h("div", { class: 'mobile' }, !this.header.disabled ? (h("header", null, h("div", { class: 'back-toggler' }, this.enableBack ? (h("psk-button", { onClick: e => this.handleBackClick(e) }, h("psk-icon", { icon: 'chevron-left' }))) : null), h("div", { class: 'aside-toggler' }, !this.aside.disabled ? (h("psk-button", { onClick: e => this.handleAsideClick(e) }, h("psk-icon", { icon: 'bars' }))) : null), h("h1", { class: 'title' }, this.header.title), h("div", { class: 'options-toggler' }, !this.options.disabled ? (h("psk-button", { onClick: e => this.handleOptionsClick(e) }, h("psk-icon", { icon: 'ellipsis-v' }))) : null), h("div", { class: 'aside-menu', hidden: this.aside.hidden }, h("psk-user-profile", null), h("psk-app-menu", { "hamburger-max-width": 0, "item-renderer": 'sidebar-renderer' })), h("div", { class: 'options-menu', hidden: this.options.hidden }, h("slot", { name: 'options' })))) : null, h("main", null, h("div", { class: 'main-cover', hidden: this.aside.hidden }), h("slot", null)), h("footer", null, h("slot", { name: 'footer' }))));
    }
    get __host() { return getElement(this); }
};
__decorate([
    CustomTheme()
], PskMobile.prototype, "__host", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property is used as title for the page.`,
        isMandatory: false,
        propertyType: `string`
    })
], PskMobile.prototype, "title", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property decides if header is rendered (header includes sidebar, options and title).`,
        isMandatory: false,
        propertyType: `boolean`,
        defaultValue: `false`
    })
], PskMobile.prototype, "disableHeader", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property decides if the hamburger button and the sidebar attached with it should be rendered.`,
        isMandatory: false,
        propertyType: `boolean`,
        defaultValue: `false`
    })
], PskMobile.prototype, "disableSidebar", void 0);
__decorate([
    TableOfContentProperty({
        description: `This property decides if the return / go back button should be displayed.`,
        isMandatory: false,
        propertyType: `boolean`,
        defaultValue: `false`
    })
], PskMobile.prototype, "enableBack", void 0);
__decorate([
    TableOfContentProperty({
        description: [
            `This property is a string that will permit the developer to choose his own controller.`,
            `If no value is sent then the null default value will be taken and the component will use the basic Controller.`
        ],
        propertyType: `string`,
        isMandatory: false,
        defaultValue: `null`
    })
], PskMobile.prototype, "controllerName", void 0);
PskMobile.style = {
    default: pskMobileDefaultCss,
    demo: pskMobileDemoCss,
    layout: pskMobileLayoutCss
};

export { PskMobile as psk_mobile };
