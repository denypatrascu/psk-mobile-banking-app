const EVENT_PREFIX = "@event:";
const PAGES_URL = "pages/";
class AppConfigurationHelper {


  static _prepareRoutesTree(menuPages, historyType) {
    let leafSearch = function (menu) {
      let tree = {};
      menu.forEach((leaf) => {
        let pageName = leaf.name.replace(/(\s+|-)/g, '').toLowerCase();

        if (!tree[pageName]) {
          let leafPath = leaf.path;
          switch (historyType) {
            case "browser":
            case "query":
              leafPath = leaf.path;
              break;
            case "hash":
              leafPath = "/#" + leaf.path;
              break;
          }
          tree[pageName] = {
            path: leafPath
          };
        }

        if (typeof leaf.children === 'object' && Array.isArray(leaf.children.items)) {
          tree[pageName].children = {type: "known", items: leafSearch(leaf.children.items)};
        }
        else if (typeof leaf.children === "string" && leaf.children.indexOf(EVENT_PREFIX) === 0) {
          let eventName = leaf.children.substring(EVENT_PREFIX.length);
          tree[pageName].children = {type: "event", event: eventName};
        }
      });
      return tree;
    };

    return leafSearch(menuPages);
  }


  static _prepareConfiguration(rawConfig, basePath) {

    let configuration = {};
    configuration.baseUrl = basePath;

    let basePagesUrl = basePath + PAGES_URL;
    let appDir = new URL(basePath).pathname;
    if (rawConfig.modals) {
      configuration.modals = {};
      if (Object.keys(rawConfig.modals).length) {
        for (let key in rawConfig.modals) {
          configuration.modals[key] = basePagesUrl + rawConfig.modals[key];
        }
      }
    }

    if (!rawConfig.menu || !rawConfig.menu.defaultMenuConfig) {
      throw new Error("Default menu configuration is missing");
    }

    let defaultMenuConfig = rawConfig.menu.defaultMenuConfig;

    if (rawConfig.profile) {
      configuration.profile = rawConfig.profile;
    }

    let filterIndexedItems = function (menuItems) {
      for (let i = 0; i < menuItems.length; i++) {
        if (menuItems[i].children && menuItems[i].children.items) {
          filterIndexedItems(menuItems[i].children.items);
        } else {
          if (typeof menuItems[i].indexed !== "undefined" && menuItems[i].indexed.toString() === "false") {
            menuItems.splice(i, 1);
            i--;
          }
        }
      }
      return menuItems;
    };

    let fillOptionalPageProps = function (navigationPages, pathPrefix) {
      if (pathPrefix) {
        pathPrefix = pathPrefix.replace(/^\/|\/$/g, '');
      }else {
        pathPrefix = '';
      }
      navigationPages.forEach(page => {
        if (!page.path) {
          let pageName = page.name.toLowerCase();
          let pagePath = pageName.toLowerCase().replace(/\s+/g, '-');
          pagePath = pagePath.replace(/[:\/]/g, '');
          page.path = pagePath;
        }

        let sep = "/";
        if (pathPrefix.length === 0) {
          sep = "";
        }
        if(!page.path.startsWith("/")){
          page.path = sep + page.path;
        }
        let relativePrefix = pathPrefix + page.path;
        relativePrefix = relativePrefix.replace(/^\//g, '');
        page.path = relativePrefix;

        if (page.children) {
          page.type = "abstract";
          if (!page.icon) {
            page.icon = defaultMenuConfig.icon;
          }
        } else {
          for (let prop in defaultMenuConfig) {
            if (!page.hasOwnProperty(prop)) {
              page[prop] = defaultMenuConfig[prop];
            }
          }

          if (page.component === "psk-page-loader") {
            if (!page.componentProps) {
              page.componentProps = {};
            }
            //page.componentProps.options = page.options;
            Object.assign(page.componentProps, page.options);
            if (page.pageSrc) {
              if (page.pageSrc.startsWith("http")) {
                page.componentProps.pageUrl = page.pageSrc;
              }
              else {
                page.componentProps.pageUrl = basePagesUrl + page.pageSrc;
              }
            } else {
              let filename = page.name.replace(/[:.!?]/g, "").replace(/\s/g, '-').toLowerCase();

              page.componentProps.pageUrl = basePagesUrl + pathPrefix + sep + filename + ".html";
            }
          }
        }

        if (typeof page.children === "object" && Array.isArray(page.children)) {
          page.children = {type: "known", items: JSON.parse(JSON.stringify(page.children))};
          fillOptionalPageProps(page.children.items, relativePrefix);
        }
        else {
          if (typeof page.children === "string" && page.children.indexOf(EVENT_PREFIX) == 0) {
            let eventName = page.children.substring(EVENT_PREFIX.length);
            page.children = {type: "event", event: eventName};
          }
        }
      });
      return navigationPages
    };

    configuration.routes = fillOptionalPageProps(rawConfig.menu.pages);

    configuration.historyType = "browser";
    let historyType = rawConfig.menu.defaultMenuConfig.historyType;
    if (historyType === "hash" ||
      historyType === "query") {
      configuration.historyType = historyType;
    }

    let completeWithPrefixes = (pathPrefix) => {
      let addPathPrefix = function (pages) {
        pages.forEach(page => {
          let pagePath = page.path;
          if (pagePath.indexOf("/") === 0) {
            pagePath = pagePath.substr(1);
          }
          page.path = `${pathPrefix}${pagePath}`;
          if (page.children && page.children.items) {
            addPathPrefix(page.children.items);
          }
        });
      };
      addPathPrefix(configuration.routes);
    };


    let pathPrefix = appDir;

    if (historyType === "query") {
      let pagePrefix = "?";
      if (rawConfig.menu.defaultMenuConfig.pagePrefix) {
        pagePrefix = rawConfig.menu.defaultMenuConfig.pagePrefix;
      }
      pathPrefix = appDir+pagePrefix;
    }

    completeWithPrefixes(pathPrefix);

    let getPagesTags = function (routes) {
      let tagsDictionary = [];

      function iterateThroughRoutes(routes) {
        routes.forEach((route) => {
            if (Object.prototype.hasOwnProperty.call(route, 'tags')) {

              let routeTags = route['tags'].split(",").map(tag => tag.trim());

              routeTags.forEach((tag)=>{
                //we don't care if we overwrite a previous path
                tagsDictionary[tag] = route.path;
              });

            }
            if (typeof route.children === 'object' && Array.isArray(route.children.items)) {
              iterateThroughRoutes(route.children.items);
            }
          }
        );
      }

      iterateThroughRoutes(routes);

      return tagsDictionary;
    };

    let routesForTags = JSON.parse(JSON.stringify(configuration.routes));
    let routesForMenu = JSON.parse(JSON.stringify(routesForTags));
    configuration.menu = filterIndexedItems(routesForMenu);
    configuration.tags = getPagesTags(routesForTags);
    configuration.pagesHierarchy = AppConfigurationHelper._prepareRoutesTree(configuration.routes, historyType);
    return configuration;
  }
}

const theme = "default";
const appVersion = "1.0.0";
const profile = {
	username: "Cardinal App",
	email: "privatesky@axiologic.net",
	avatar: "https://privatesky.xyz/assets/images/privatesky.png"
};
const menu = {
	defaultMenuConfig: {
		icon: "fa-bars",
		type: "route",
		component: "psk-page-loader",
		exact: false,
		indexed: true,
		historyType: "browser"
	},
	pages: [
		{
			name: "Home",
			path: "/home",
			pageSrc: "index.html"
		}
	]
};
const defaultApplicationConfig = {
	theme: theme,
	appVersion: appVersion,
	profile: profile,
	menu: menu
};

let configUrl = "config.json";
let menuUrl = "menu.json";
window.globalConfig = {};
class DefaultApplicationController  {

  constructor(element) {
    this.configIsLoaded = false;
    this.pendingRequests = [];
    let basePath;

    if (window && window.location && window.location.origin) {
      basePath = window.location.origin;
    }

    let baseElement = document.querySelector("base");
    if(baseElement){
      let appDir = baseElement.getAttribute("href");
      if (appDir) {
        basePath += appDir;
      }
    }
    if (!basePath.endsWith("/")) {
      basePath += "/";
    }
    configUrl = basePath + configUrl;
    menuUrl = basePath + menuUrl;
    window.basePath = basePath;
    this._getAppConfiguration(configUrl, (err, _configuration) => {

      if (err) {
        return console.log(err);
      }

      this._fetchConfigurationFile(menuUrl, (err, menuConfig) => {

        if(err){
          console.log(err);
        }
        else {
          _configuration.menu = menuConfig;
        }

        this.configuration = AppConfigurationHelper._prepareConfiguration(_configuration, basePath);
        this.configuration.theme = _configuration.theme;
        this.configuration.appVersion = _configuration.appVersion;
        this.configIsLoaded = true;
        while (this.pendingRequests.length) {
          let request = this.pendingRequests.pop();
          this.respondWithConfiguration(request.configName, request.callback);
        }
      });
    });

    element.addEventListener("getThemeConfig", this._provideConfig("theme"));
    element.addEventListener("getAppVersion", this._provideConfig("appVersion"));
    element.addEventListener("needRoutes", this._provideConfig("routes"));
    element.addEventListener("needMenuItems", this._provideConfig("menu"));
    element.addEventListener("getUserInfo", this._provideConfig("profile"));
    element.addEventListener("getHistoryType", this._provideConfig("historyType"));
    element.addEventListener("getModals", this._provideConfig("modals"));
    element.addEventListener("getTags", this._provideConfig("tags"));
    element.addEventListener("getConfiguration", this._provideConfig());
    element.addEventListener("validateUrl", (e) => {
      e.stopImmediatePropagation();
      let { sourceUrl, callback } = e.detail;
      if (callback && typeof callback === "function") {
        this._parseSourceUrl(sourceUrl, callback);
      } else {
        console.error("Callback was not properly provided!");
      }
    });


    //this should be added in a SSApp lifecycle mechanism
    element.addEventListener("getCustomLandingPage",(e)=>{

      let callback = e.detail;
      if (window.frameElement) {
        if(window.frameElement.hasAttribute("landing-page")){
          let landingPage = window.frameElement.getAttribute("landing-page");
          return callback(undefined, landingPage);
        }
      }
      callback();
    });

  }

  _provideConfig(configName) {
    return (e) => {
      e.stopImmediatePropagation();
      let callback = e.detail;

      if (callback && typeof callback === "function") {
        if (this.configIsLoaded) {
          return this.respondWithConfiguration(configName, callback);
        } else {
          this.pendingRequests.push({configName: configName, callback: callback});
        }
      }
    }
  }

  respondWithConfiguration(configName, callback) {
    if (typeof configName !== "undefined" && !this.configuration[configName]) {
      throw new Error(`Config ${configName} does not exists`)
    }

    if (typeof configName === "undefined") {
      return callback(undefined, this.configuration);
    }

    callback(undefined, this.configuration[configName]);
  }

  _parseSourceUrl(sourceUrl, callback) {
    sourceUrl = sourceUrl.replace(/(\s+|-)/g, '').toLowerCase();
    let paths = sourceUrl.split("/");

    let root = this.configuration.pagesHierarchy;
    for (let i = 0; i < paths.length; i++) {
      let segment = paths[i];

      const segmentInsideMenu = Object.keys(root).find(function(key) {
        return root[key].path.toLowerCase().indexOf(segment) !== -1;
      });

      let isSegmentInsideMenu = typeof root[segmentInsideMenu] !== 'undefined';

      if (!root[segment] && !isSegmentInsideMenu) {
        callback(`${sourceUrl} is not a valid path in the application!`);
        break;
      }

      let children;
      if(isSegmentInsideMenu) {
        children = root[segmentInsideMenu].children;
      } else {
        children = root[segment].children;
      }

      if (typeof children === 'object' && typeof children.items === 'object' && i !== paths.length) {
        root = children.items;
        continue;
      }

      let linkPath;
      if(isSegmentInsideMenu) {
        linkPath = root[segmentInsideMenu].path;
      } else {
        linkPath = root[segment].path;
      }

      return callback(undefined, linkPath);
    }
  }

  _getAppConfiguration(url, callback) {
    this._fetchConfigurationFile(url, (err, configuration) => {
      if (err) {
        console.log(err);
        //use default configuration
        return callback(undefined, defaultApplicationConfig);
      }

      for (let i in defaultApplicationConfig) {
        if (!configuration.hasOwnProperty(i)) {
          configuration[i] = defaultApplicationConfig[i];
        }
      }
      callback(undefined, configuration);

    });
  }

  _fetchConfigurationFile(url, callback) {
    fetch(url).then(function (response) {
      return response.json();
    }).then(function (data) {
      callback(undefined, data);
    }).catch(function (e) {
      callback(e);
    });
  }
}

export { AppConfigurationHelper as A, DefaultApplicationController as D, defaultApplicationConfig as d };
