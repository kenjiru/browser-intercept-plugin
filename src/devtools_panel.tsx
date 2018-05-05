import * as React from "react";
import * as ReactDOM from "react-dom";

import "./panel/style.less";

import Panel from "./panel/Panel";

ReactDOM.render(
    <Panel />,
    document.getElementById("root") as HTMLElement
);
