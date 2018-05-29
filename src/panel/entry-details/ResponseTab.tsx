import {Collapse} from "antd";
import {PureComponent, ReactElement} from "react";
import * as React from "react";

import HeadersPanel from "./HeadersPanel";

interface IResponseTabProps {
    harResponse: any;
}

export default class ResponseTab extends PureComponent<IResponseTabProps> {
    public render(): ReactElement<Collapse> {
        return (
            <Collapse
                className="response-tab"
                bordered={false}
                defaultActiveKey={["1", "2"]}
            >
                <HeadersPanel
                    key="1"
                    headers={this.props.harResponse.headers}
                />
            </Collapse>
        );
    }
}
