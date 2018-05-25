import {Provider} from "mobx-react";
import * as React from "react";
import * as ReactDOM from "react-dom";

import {rowsStore} from "./model/RowsStore";
import Panel from "./panel/Panel";
import PanelService from "./panel/PanelService";

import "./panel/style.less";

PanelService.handleRequests();

ReactDOM.render(
    (
        <Provider
            rowsStore={rowsStore}
        >
            <Panel />
        </Provider>
    ),
    document.getElementById("root") as HTMLElement,
);
