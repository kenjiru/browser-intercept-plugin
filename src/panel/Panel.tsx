import * as React from "react";
import {ReactElement} from "react";

import "./Panel.less";

import RequestTable from "./request-table/RequestTable";

const dataSource = [{
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
}, {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
}];

export default class Panel extends React.PureComponent {

    public render(): ReactElement<RequestTable> {
        return (
            <RequestTable dataSource={dataSource} />
        );
    }
}
