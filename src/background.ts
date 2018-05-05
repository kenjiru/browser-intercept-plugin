const targetPage = 'https://jsonplaceholder.typicode.com/*';

function listener(details) {
    let filter: any = browser.webRequest.filterResponseData(details.requestId);
    let encoder = new TextEncoder();

    filter.ondata = event => {
        filter.write(encoder.encode('{"foo": "bar"}'));
        filter.disconnect();
    };

    return {};
}

browser.webRequest.onBeforeRequest.addListener(
    listener,
    {
        urls: [targetPage]
    },
    ['blocking']
);

let isPluginEnabled: boolean = true;

function updateToolbarButton(isPluginEnabled) {
    let iconPath;

    if (isPluginEnabled) {
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

    browser.browserAction.setIcon({
        path: iconPath
    });
    browser.browserAction.setTitle({
        title: isPluginEnabled ? 'Disable' : 'Enable',
    });
}

function togglePluginState() {
    isPluginEnabled = !isPluginEnabled;
}

function handleToolbarIconClick() {
    console.log('toolbar icon clicked!');

    togglePluginState();
    updateToolbarButton(isPluginEnabled);
}

browser.browserAction.onClicked.addListener(handleToolbarIconClick);
