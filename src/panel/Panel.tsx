import * as React from "react";
import {ReactElement} from "react";

import RequestTable from "./request-table/RequestTable";

import "./Panel.less";

const dataSource = [{
    key: "1",
    name: "backgroud_process.js",
    status: 200,
    type: "script",
    size: "80KB",
}, {
    key: "2",
    name: "resize_script.js",
    status: 200,
    type: "script",
    size: "120KB",
}];

export default class Panel extends React.PureComponent {
    public render(): ReactElement<RequestTable> {
        return (
            <RequestTable dataSource={dataSource} />
        );
    }
}
