import { r as registerInstance } from './index-d1085cc4.js';
import './active-router-44a70032.js';
import { i as injectHistory } from './index-34b70e38.js';
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
