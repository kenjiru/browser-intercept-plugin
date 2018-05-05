function handleShown() {
    console.log("panel is being shown");
}

function handleHidden() {
    console.log("panel is being hidden");
}

function createDevPanel() {
    browser.devtools.panels.create(
        "Intercept",
        "/icons/intercept-32.png",
        "/devtools_panel.html"
    ).then((newPanel) => {
        newPanel.onShown.addListener(handleShown);
        newPanel.onHidden.addListener(handleHidden);
    });
}

createDevPanel();
