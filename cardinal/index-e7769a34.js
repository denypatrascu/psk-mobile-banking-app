import './constants-507b64b1.js';
import './utilFunctions-5499adff.js';
import './BindModel-8ea50ef5.js';
import './CustomTheme-3f558a4e.js';
import './TableOfContentEvent-91503dab.js';
import './TableOfContentProperty-900b66d0.js';
import './highlightChapter-a383cc89.js';

const DEFAULTS = {
    OPTIONS: { propagate: true, permissive: false },
    PROPAGATE_PATH: 'inheritor'
};
function ComponentInheritor(options = DEFAULTS.OPTIONS) {
    const params = __prepareOptions();
    const inherited = { attributes: [] };
    function __prepareOptions() {
        if (typeof options !== 'object')
            return DEFAULTS.OPTIONS;
        if (typeof options.propagate !== 'boolean')
            options.propagate = DEFAULTS.OPTIONS.propagate;
        if (typeof options.permissive !== 'boolean')
            options.permissive = DEFAULTS.OPTIONS.permissive;
        return options;
    }
    return (proto, instance) => {
        const { componentWillLoad } = proto;
        proto.componentWillLoad = function () {
            const definitions = [];
            for (const key in this) {
                // this.hasOwnProperty(key)) must not be used!
                if (typeof this[key] === 'function' && !params.permissive)
                    continue;
                definitions.push(key);
            }
            inherited.attributes = definitions;
            this[instance] = inherited;
            if (params.propagate)
                this[DEFAULTS.PROPAGATE_PATH] = inherited;
            return componentWillLoad && componentWillLoad.call(this);
        };
    };
}

export { ComponentInheritor as C };
