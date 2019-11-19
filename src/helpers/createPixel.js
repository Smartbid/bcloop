var serverUrl = "https://www.adserving247.com"
export function createPixel(url) {
    var eventItem = window.document.createElement("img");
    eventItem.setAttribute('src', url);
    eventItem.width = 0;
    eventItem.height = 0;
    eventItem.style.display = "none";
    document.body.appendChild(eventItem);
  }
  
  export function createIframePixel(pxlUrl, originalLeadId, accountId, redirectUrl) {
    var iFrame = document.createElement('iframe');
    iFrame.setAttribute("src", decodeURIComponent(pxlUrl));
    iFrame.style.height = "1px";
    iFrame.style.width = "1px";
    iFrame.onload = function () {
  
      createPixel(serverUrl + "/leadsevents/" + accountId + "/" + originalLeadId + "/after_sending_pixel/{}");
  
      if (window.sbidTracking) {
        window.sbidTracking.settings.params.iframe_loaded = "1";
      }
  
      try {
        window.sbidTracking.sendVideoEvents();
      } catch (e) {
        console.log('error sending track_v');
      }
      setTimeout(function () {
        console.log("in setTimeout");
        window.location.replace(redirectUrl);
      }, 600);
    };
    document.body.appendChild(iFrame);
  }