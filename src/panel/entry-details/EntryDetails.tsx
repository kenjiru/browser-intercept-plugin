import {Tabs} from "antd";
import {PureComponent, ReactElement} from "react";
import * as React from "react";

import RequestTab from "./RequestTab";

import "./EntryDetails.less";

interface IRequestDetailsProps {
    harEntry: any;
}

export default class EntryDetails extends PureComponent<IRequestDetailsProps> {
    public render(): ReactElement<any> {
        return (
            <div className="entry-details">
                <Tabs
                    defaultActiveKey="1"
                    size="small"
                >
                    <Tabs.TabPane
                        tab="Request"
                        key="1"
                    >
                        <RequestTab
                            harRequest={this.props.harEntry.request}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        tab="Response"
                        key="2"
                    >
                        Content of Tab Pane 2
                    </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
}
