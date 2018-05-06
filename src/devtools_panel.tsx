import * as React from "react";
import * as ReactDOM from "react-dom";

import Panel from "./panel/Panel";

import "./panel/style.less";

ReactDOM.render(
    <Panel />,
    document.getElementById("root") as HTMLElement,
);
