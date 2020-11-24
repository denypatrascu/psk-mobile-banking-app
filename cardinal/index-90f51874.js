import './BindModel-524e1a2c.js';
import './CustomTheme-f57ed858.js';
import './TableOfContentEvent-f33bf2c4.js';
import './TableOfContentProperty-de8188be.js';

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
