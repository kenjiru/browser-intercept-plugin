let isPluginEnabled: boolean = true;

function updateToolbarButton(isEnabled) {
    let iconPath;

    if (isEnabled) {
        iconPath = {
            16: "icons/intercept-16.png",
            32: "icons/intercept-32.png",
        };
    } else {
        iconPath = {
            16: "icons/intercept-disabled-16.png",
            32: "icons/intercept-disabled-32.png",
        };
    }

    chrome.browserAction.setIcon({
        path: iconPath,
    });
    chrome.browserAction.setTitle({
        title: isEnabled ? "Disable" : "Enable",
    });
}

function togglePluginState() {
    isPluginEnabled = !isPluginEnabled;
}

function handleToolbarIconClick() {
    togglePluginState();
    updateToolbarButton(isPluginEnabled);
}

chrome.browserAction.onClicked.addListener(handleToolbarIconClick);
