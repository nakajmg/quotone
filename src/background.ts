chrome.browserAction.onClicked.addListener(() => {
  chrome.storage.sync.get("quotoneEnabled", ({ quotoneEnabled = true }) => {
    chrome.storage.sync.set({ quotoneEnabled: !quotoneEnabled });
    chrome.browserAction.setIcon({
      path: quotoneEnabled ? "assets/icon48_gray.png" : "assets/icon48.png",
    });
  });
});
