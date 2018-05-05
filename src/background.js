const targetPage = 'https://jsonplaceholder.typicode.com/*';

function listener(details) {
    let filter = browser.webRequest.filterResponseData(details.requestId);
    let encoder = new TextEncoder();

    filter.ondata = event => {
        filter.write(encoder.encode('{"foo": "bar"}'));
        filter.disconnect();
    }

    return {};
}

browser.webRequest.onBeforeRequest.addListener(
    listener,
    {urls: [targetPage]},
    ["blocking"]
);

let isPluginDisabled = false;

function updateToolbarButton(isDisabled) {
    let iconPath;

    if (isDisabled) {
        iconPath = {
            16: "icons/intercept-disabled-16.png",
            32: "icons/intercept-disabled-32.png",
        };
    } else {
        iconPath = {
            16: "icons/intercept-16.png",
            32: "icons/intercept-32.png",
        };
    }

    browser.browserAction.setIcon({
        path: iconPath
    });
    browser.browserAction.setTitle({
        // Screen readers can see the title
        title: isDisabled ? 'Enable' : 'Disable',
    });
}

function togglePluginState() {
    isPluginDisabled = !isPluginDisabled;
}

function handleToolbarIconClick() {
    console.log('toolbar icon clicked!');

    togglePluginState();
    updateToolbarButton(isPluginDisabled);
}

browser.browserAction.onClicked.addListener(handleToolbarIconClick);

