import {Tabs} from "antd";
import * as classNames from "classnames";
import {PureComponent, ReactElement} from "react";
import * as React from "react";

import RequestTab from "./RequestTab";

import "./EntryDetails.less";

interface IRequestDetailsProps {
    className?: string;
    harEntry: any;
}

export default class EntryDetails extends PureComponent<IRequestDetailsProps> {
    public render(): ReactElement<any> {
        return (
            <div className={this.getClassName()}>
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

    private getClassName() {
        return classNames(
            "entry-details",
            this.props.className,
        );
    }
}
