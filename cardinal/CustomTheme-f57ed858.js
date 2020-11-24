import { g as getElement, e as Build } from './index-bb32d9fe.js';
import { o as applyStyles } from './utilFunctions-74de6735.js';

const SLOTTED = "SLOTTED:";
window.cardinal = window.cardinal || {};
window.cardinal.oldCustomTheme = window.cardinal.oldCustomTheme || {};
const { oldCustomTheme } = window.cardinal;
oldCustomTheme.dependencies = oldCustomTheme.dependencies || {};
oldCustomTheme.imports = oldCustomTheme.imports || {};
oldCustomTheme.appTheme = oldCustomTheme.appTheme || null;
const { dependencies, imports } = oldCustomTheme;
const regex = /@import.*?["']([^"']+)["'].*?;/g;
function checkForInnerDependencies(referrer, styleStr) {
    if (!imports[referrer]) {
        imports[referrer] = new Promise((resolve, reject) => {
            if (regex.exec(styleStr)) {
                styleStr.replace(regex, (match, depUrl) => {
                    if (!dependencies[depUrl]) {
                        dependencies[depUrl] = resolveDependency(depUrl);
                    }
                    dependencies[depUrl].then((content) => {
                        resolve(styleStr.replace(match, content));
                    }).catch(reject);
                });
            }
            else {
                resolve(styleStr);
            }
        });
    }
    return imports[referrer];
}
function resolveDependency(url) {
    return new Promise((resolve, reject) => {
        fetch(url).then((response) => {
            if (response.ok) {
                return resolve(response.text());
            }
            reject({ url: response.url, status: response.status, statusText: response.statusText });
        });
    });
}
function isFromSlot(child, element) {
    if (!element) {
        return false;
    }
    if (element.shadowRoot) {
        return child.parentNode === element.shadowRoot.host;
    }
    return isFromSlot(element, element.parentElement);
}
function CustomTheme() {
    let handleStyleExistenceCheck = (element) => {
        let childComponents = {};
        element.addEventListener("styleExists", (event) => {
            event.stopImmediatePropagation();
            event.preventDefault();
            let eventCallback = event.detail.callback;
            let componentName = event.detail.componentTag;
            eventCallback(undefined, childComponents.hasOwnProperty(componentName), element);
            if (!childComponents[componentName]) {
                childComponents[componentName] = true;
            }
        });
        element.addEventListener("componentWasRemoved", (event) => {
            let componentName = event.detail.componentTag;
            if (childComponents[componentName]) {
                delete childComponents[componentName];
            }
        });
    };
    handleStyleExistenceCheck(document.querySelector("body"));
    return (proto) => {
        const { componentWillLoad, disconnectedCallback } = proto;
        proto.componentWillLoad = function () {
            const host = getElement(this);
            if (!host) {
                return componentWillLoad && componentWillLoad.call(this);
            }
            else {
                let injectThemeStyle = (theme) => {
                    let componentName = host.tagName.toLowerCase();
                    let addStyleElement = (parent) => {
                        return new Promise((resolve) => {
                            // @ts-ignore
                            let themeStylePath = window.basePath + "themes/" + theme + "/components/" + componentName + "/" + componentName + ".css";
                            if (!dependencies[themeStylePath]) {
                                dependencies[themeStylePath] = new Promise((resolve, reject) => {
                                    resolveDependency(themeStylePath).then((cssRaw) => {
                                        resolve(cssRaw);
                                    }).catch(reject);
                                });
                            }
                            dependencies[themeStylePath].then((cssRaw) => {
                                checkForInnerDependencies(themeStylePath, cssRaw).then((data) => {
                                    let styleElement = document.createElement("style");
                                    styleElement.innerHTML = data;
                                    parent.append(styleElement);
                                });
                            }).catch((errorStatus) => {
                                console.log(`Request on resource ${errorStatus.url} ended with status: ${errorStatus.status} (${errorStatus.statusText})`);
                            }).finally(() => {
                                resolve(componentWillLoad && componentWillLoad.call(this));
                            });
                        });
                    };
                    if (host.shadowRoot) {
                        handleStyleExistenceCheck(host);
                        return addStyleElement(host.shadowRoot);
                    }
                    if (!host.isConnected) {
                        return new Promise(resolve => {
                            resolve(componentWillLoad && componentWillLoad.call(this));
                        });
                    }
                    return new Promise((resolve => {
                        let isSlotted = isFromSlot(host, host.parentElement);
                        host['isSlotted'] = isSlotted;
                        let styleExistsEvent = new CustomEvent("styleExists", {
                            bubbles: true,
                            cancelable: true,
                            composed: true,
                            detail: {
                                callback: (err, styleExists, shadowRootHostComponent) => {
                                    if (err) {
                                        console.log(err);
                                        return;
                                    }
                                    if (!styleExists) {
                                        if (!isSlotted) {
                                            shadowRootHostComponent = shadowRootHostComponent.shadowRoot;
                                        }
                                        addStyleElement(shadowRootHostComponent).then(() => {
                                            resolve();
                                        });
                                    }
                                    else {
                                        resolve(componentWillLoad && componentWillLoad.call(this));
                                    }
                                },
                                componentTag: isSlotted ? SLOTTED + componentName : componentName
                            }
                        });
                        host.dispatchEvent(styleExistsEvent);
                    }));
                };
                if (!oldCustomTheme.appTheme) {
                    return new Promise((resolve) => {
                        let event = new CustomEvent("getThemeConfig", {
                            bubbles: true,
                            cancelable: true,
                            composed: true,
                            detail: (err, theme) => {
                                if (err) {
                                    return console.log(err);
                                }
                                oldCustomTheme.appTheme = theme;
                                injectThemeStyle(oldCustomTheme.appTheme).then(() => {
                                    resolve();
                                });
                            }
                        });
                        host.dispatchEvent(event);
                    });
                }
                else {
                    return injectThemeStyle(oldCustomTheme.appTheme);
                }
            }
        };
        proto.disconnectedCallback = function () {
            const host = getElement(this);
            let componentName = host.tagName.toLowerCase();
            if (host['isSlotted']) {
                componentName = SLOTTED + componentName;
            }
            let componentWasRemovedEvent = new CustomEvent("componentWasRemoved", {
                bubbles: true,
                cancelable: true,
                composed: true,
                detail: {
                    componentTag: componentName
                }
            });
            host.dispatchEvent(componentWasRemovedEvent);
            disconnectedCallback && disconnectedCallback.call(this);
        };
    };
}

window.cardinal = window.cardinal || {};
window.cardinal.customTheme = window.cardinal.customTheme || {
    THEME: undefined,
    IMPORTS: {},
    // DEPENDENCIES: {},
    EVENTS: {
        GET_THEME: "getThemeConfig",
        ADD_STYLE: "CustomTheme:add-style",
        REMOVE_STYLE: "CustomTheme:remove-style"
    }
};
const GLOBALS = window.cardinal.customTheme;
async function getDependency(url) {
    try {
        const response = await fetch(url);
        const style = await response.text();
        return [true, style];
    }
    catch (err) {
        console.log(err);
        return [false];
    }
}
async function getTheme(host, asyncCallback) {
    host.dispatchEvent(new CustomEvent(GLOBALS.EVENTS.GET_THEME, {
        bubbles: true, cancelable: true, composed: true,
        detail: async (err, theme) => {
            if (err)
                return console.log(err);
            GLOBALS.THEME = theme;
            await asyncCallback(host);
        }
    }));
}
async function injectTheme(host) {
    const componentName = host.tagName.toLowerCase();
    const componentMode = host.mode || host.getAttribute('mode') || 'default';
    const file = componentName + (componentMode !== 'default' ? `.${componentMode}` : '') + '.css';
    const path = `${window.basePath}themes/${GLOBALS.THEME}/components/${componentName}/${file}`;
    if (!GLOBALS.IMPORTS[path]) {
        const [status, style] = await getDependency(path);
        if (status)
            GLOBALS.IMPORTS[path] = style;
        else
            return;
    }
    const styles = GLOBALS.IMPORTS[path];
    if (host.shadowRoot) {
        memorizeStyledElements(host.shadowRoot);
        applyStyles(host.shadowRoot, styles);
        // console.log(host.tagName, path);
    }
    else {
        host['isSlotted'] = isSlotted(host);
        // host.setAttribute('data-slotted', `${host['isSlotted']}`);
        host.dispatchEvent(new CustomEvent(GLOBALS.EVENTS.ADD_STYLE, {
            bubbles: true, cancelable: true, composed: true,
            detail: {
                data: {
                    tag: componentName,
                    slotted: host['isSlotted']
                },
                callback: async (err, data) => {
                    if (err)
                        return console.log(err);
                    const { target } = data;
                    applyStyles(target, styles);
                    // host.setAttribute('data-root', target.tagName);
                }
            }
        }));
    }
}
function isSlotted(element) {
    while (element.parentElement) {
        if (element.parentElement.shadowRoot) {
            return element.parentElement.shadowRoot.host === element.parentNode;
        }
        element = element.parentElement;
    }
    return false;
}
function memorizeStyledElements(shadowRoot) {
    const element = shadowRoot.host;
    const children = {
        true: {},
        false: {} // opposite
    };
    element.addEventListener(GLOBALS.EVENTS.ADD_STYLE, (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        const { data: { tag, slotted }, callback } = event.detail;
        if (!children[slotted][tag]) {
            if (slotted) {
                callback(undefined, { target: element });
            }
            else {
                callback(undefined, { target: shadowRoot });
            }
            children[slotted][tag] = true;
        }
    });
    element.addEventListener(GLOBALS.EVENTS.REMOVE_STYLE, (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        const { data: { tag, slotted } } = event.detail;
        children[slotted][tag] = false;
    });
}
function CustomTheme_v2() {
    return (proto) => {
        const { componentWillLoad, disconnectedCallback } = proto;
        proto.componentWillLoad = async function () {
            const host = getElement(this);
            if (host || host.isConnected) {
                if (!GLOBALS.THEME) {
                    await getTheme(host, injectTheme);
                }
                else {
                    await injectTheme(host);
                }
            }
            return componentWillLoad && componentWillLoad.call(this);
        };
        proto.disconnectedCallback = async function () {
            const host = getElement(this);
            host.dispatchEvent(new CustomEvent(GLOBALS.EVENTS.REMOVE_STYLE, {
                bubbles: true, cancelable: true, composed: true,
                detail: {
                    data: {
                        tag: host.tagName.toLowerCase(),
                        slotted: !!host['isSlotted'] // host['isSlotted'] ? true : false
                    }
                }
            }));
            return disconnectedCallback && disconnectedCallback.call(this);
        };
    };
}

const GLOBALS$1 = {
    VERSIONS: [
        { ref: CustomTheme, version: 'v1.0' },
        { ref: CustomTheme_v2, version: 'v2.0' }
    ]
};
const version = window.customThemeVersion;
const isValid = [1, 2].includes(version);
const theme = isValid ? GLOBALS$1.VERSIONS[version - 1] : GLOBALS$1.VERSIONS[0];
if (Build.isDev) {
    const STENCIL_DEV_STYLE = [
        '%c%s',
        'color: white; background: #4461b4; font-weight: bold; font-size: 10px; padding: 2px 6px; border-radius: 5px'
    ];
    if (version)
        console.log(...STENCIL_DEV_STYLE, 'CustomTheme', theme.version);
}
const CustomTheme$1 = theme.ref;

export { CustomTheme$1 as C };
