import { r as registerInstance, h, g as getElement } from './index-bb32d9fe.js';
import './active-router-89a25b91.js';
import { i as injectHistory } from './index-f0762390.js';
import './match-path-760e1797.js';
import './location-utils-fea12957.js';

const QueryPagesRouter = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.routes = {};
        this.redirectTo = "";
    }
    componentWillLoad() {
        let routes = {};
        let renderItems = function (pages) {
            pages.forEach((page) => {
                if (page.children && page.children.type === "known") {
                    renderItems(page.children.items);
                }
                else {
                    let { path, component, componentProps } = page;
                    routes[path] = { component, componentProps };
                }
            });
            return routes;
        };
        this.routes = renderItems(this.pages);
    }
    locationChanged(newValue) {
        this.currentRoute = newValue;
        let basePathname = new URL(window['basePath']).pathname;
        if (basePathname.includes(this.currentRoute.pathname) && this.currentRoute.search === "") {
            this.redirectTo = this.pages[0].path;
        }
        else {
            let notFoundRoute = this.pages.map((item, index) => item.name == "404" ? index : null).filter(item => item !== null)[0];
            if (notFoundRoute) {
                this.redirectTo = this.pages[notFoundRoute].path;
            }
            else {
                this.redirectTo = this.pages[0].path;
            }
        }
    }
    render() {
        let currentRouteSearchUrl = this.currentRoute.pathname + this.currentRoute.search;
        if (currentRouteSearchUrl.indexOf("&") !== -1) {
            currentRouteSearchUrl = currentRouteSearchUrl.substring(0, currentRouteSearchUrl.indexOf("&"));
        }
        let currentRoute = this.routes[currentRouteSearchUrl];
        let componentName = "psk-page-not-found";
        let componentProps = { urlDestination: this.redirectTo };
        if (currentRoute) {
            componentName = currentRoute.component;
            componentProps = currentRoute.componentProps;
        }
        return (h("stencil-route", { component: componentName, componentProps: componentProps }));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "location": ["locationChanged"]
    }; }
};
injectHistory(QueryPagesRouter);

export { QueryPagesRouter as query_pages_router };
