import { r as registerInstance } from './index-bb32d9fe.js';
import './active-router-89a25b91.js';
import { i as injectHistory } from './index-f0762390.js';
import './match-path-760e1797.js';
import './location-utils-fea12957.js';

const PskRouteRedirect = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    componentWillLoad() {
        if (this.url) {
            this.history.push(this.url, {});
        }
        else {
            console.error("Url was not provided");
        }
    }
};
injectHistory(PskRouteRedirect);

export { PskRouteRedirect as psk_route_redirect };
