chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received in background script:", request);
    if (request.action === "setSpeed") {
      if (request.tabId !== undefined) {
        chrome.scripting.executeScript({
          target: {tabId: request.tabId},
          func: setSpeed,
          args: [request.speed]
        }, () => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            sendResponse({status: "error", message: chrome.runtime.lastError.message});
          } else {
            sendResponse({status: "success"});
          }
        });
      } else {
        console.error("request.tabId is undefined");
        sendResponse({status: "error", message: "request.tabId is undefined"});
      }
      return true;
    }
  });
  
  function setSpeed(speed) {
    console.log("Setting speed to:", speed);
    document.querySelector('video').playbackRate = speed;
  }
  