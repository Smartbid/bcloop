
export const serverUrl = "https://www.adserving247.com";

export const sendLead = (endPoint, leadData, beforeSendingToServer, onSuccess, onError) => {
  return postData(endPoint, leadData, beforeSendingToServer, onSuccess, onError).then(res => {
    return res;
  });
};

export const postData = (url = '', data = {}, beforeSendingToServer, onSuccess, onError) => {
  beforeSendingToServer && beforeSendingToServer();
  return fetch(serverUrl + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(data),
  })
    .then(res => {
      onSuccess && onSuccess(res);
      return res.json()
    })
    .catch(res => {
      onError && onError(res);
      return res
    });
};

export function csvJSON(csv) {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i])
            continue;
        const obj = {};
        const currentline = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j]
        }
        result.push(obj)
    }
    return result
}


export function createPixel(url) {
  let eventItem = window.document.createElement("img");
  eventItem.setAttribute('src', url);
  eventItem.width = 0;
  eventItem.height = 0;
  eventItem.style.display = "none";
  document.body.appendChild(eventItem);
}


export function createIframePixel(pxlUrl, originalLeadId, accountId, redirectUrl) {
  let iFrame = document.createElement('iframe');
  iFrame.setAttribute("src", decodeURIComponent(pxlUrl));
  iFrame.style.height = "1px";
  iFrame.style.width = "1px";
  iFrame.onload = function () {

    createPixel(serverUrl + "/leadsevents/" + accountId + "/" +
      originalLeadId + "/after_sending_pixel/{}");

    if (window.sbidTracking) {
      window.sbidTracking.settings.params.iframe_loaded = "1";
    }

    try{
      window.sbidTracking.sendVideoEvents();
    }
    catch (e) {
      console.log('error sending track_v');
    }
    setTimeout(() => {
      console.log("in setTimeout");
      window.location.replace(redirectUrl);
    }, 600);
  };
  document.body.appendChild(iFrame);
}
