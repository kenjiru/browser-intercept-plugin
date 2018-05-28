import {Tabs} from "antd";
import * as classNames from "classnames";
import {PureComponent, ReactElement} from "react";
import * as React from "react";

import RequestTab from "./RequestTab";
import ResponseContentTab from "./ResponseContentTab";
import ResponseTab from "./ResponseTab";

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
                        <ResponseTab
                            harResponse={this.props.harEntry.response}
                        />
                    </Tabs.TabPane>

                    <Tabs.TabPane
                        tab="Response Content"
                        key="3"
                    >
                        <ResponseContentTab
                            harEntry={this.props.harEntry}
                        />
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
