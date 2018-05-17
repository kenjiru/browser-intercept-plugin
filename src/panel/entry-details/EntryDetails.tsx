import {Tabs} from "antd";
import {PureComponent, ReactElement} from "react";
import * as React from "react";

import {IRequestRow} from "../PanelService";
import RequestTab from "./RequestTab";

interface IRequestDetailsProps {
    requestRow: IRequestRow;
}

export default class EntryDetails extends PureComponent<IRequestDetailsProps> {
    public render(): ReactElement<any> {
        return (
            <div className="entry-details">
                <Tabs
                    defaultActiveKey="1"
                    onChange={this.handleTabChange}
                    size="small"
                >
                    <Tabs.TabPane tab="Request" key="1">
                        <RequestTab
                            harEntry={this.props.requestRow.harEntry}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Response" key="2">Content of Tab Pane 2</Tabs.TabPane>
                </Tabs>
            </div>
        );
    }

    private handleTabChange = () => {
    }
}
