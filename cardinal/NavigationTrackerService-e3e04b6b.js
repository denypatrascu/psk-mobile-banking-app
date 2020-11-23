const SSAPP_HISTORY_CHANGED_EVT = "ssapp-history-changed";

class NavigationTrackerService {

  setIdentity(identity) {
    this.identity = identity;
  }

  setSSAppPage(ssAppPage){
    this.ssAppPage = ssAppPage;
  }
  getSSAppPage(){
    return this.ssAppPage?this.ssAppPage:this.identity;
  }

  listenForSSAppHistoryChanges() {
    window.document.addEventListener(SSAPP_HISTORY_CHANGED_EVT, (evt) => {
      let eventData = evt.detail;

      if(eventData.ssappPageUrl){
        this.setSSAppPage(this.identity+eventData.ssappPageUrl);
      }

      let currentSSAppRoute = "~"+this.getSSAppPage();
      if(eventData.childRoute){
        currentSSAppRoute += eventData.childRoute;
      }

      let currentPageTitle = eventData.ssappPageUrl?eventData.ssappPageUrl:eventData.currentPageTitle;

      console.log(currentSSAppRoute, currentPageTitle);

      this.notifyParentForChanges({
        currentPageTitle: currentPageTitle,
        childRoute: currentSSAppRoute
      });
    });
  }

   notifyParentForChanges(navigationChanges) {
    let isNestedSSApp = () => {
      try {
        return window.self !== window.parent;
      } catch (e) {
        return false;
      }
    };

    if (isNestedSSApp()) {
      window.parent.document.dispatchEvent(new CustomEvent(SSAPP_HISTORY_CHANGED_EVT, {
        detail: navigationChanges
      }));
    }
  }
}

let instance = new NavigationTrackerService();

const NavigatinTrackerService = {
  getInstance: function () {
    return instance;
  },
  notifyParentForChanges: instance.notifyParentForChanges,
};

export { NavigatinTrackerService as N };
