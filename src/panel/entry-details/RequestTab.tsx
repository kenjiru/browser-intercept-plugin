import {Collapse} from "antd";
import {PureComponent, ReactElement} from "react";
import * as React from "react";

import DetailField from "../detail-field/DetailField";
import HeadersPanel from "./HeadersPanel";

interface IRequestTabProps {
    harRequest: any;
}

export default class RequestTab extends PureComponent<IRequestTabProps> {
    public render(): ReactElement<Collapse> {
        const {harRequest} = this.props;

        return (
            <Collapse
                className="request-tab"
                bordered={false}
                defaultActiveKey={["1", "2", "3"]}
            >
                <Collapse.Panel
                    header="General"
                    key="1"
                >
                    <DetailField
                        label="Request URL"
                        value={harRequest.url}
                    />

                    <DetailField
                        label="Request Method"
                        value={harRequest.method}
                    />
                </Collapse.Panel>

                <HeadersPanel
                    key="2"
                    headers={this.props.harRequest.headers}
                />

                <Collapse.Panel
                    header="Post Data"
                    key="3"
                >
                    <div>
                        {this.getPostData()}
                    </div>
                </Collapse.Panel>
            </Collapse>
        );
    }

    private getPostData(): string {
        const {harRequest} = this.props;

        if (harRequest.bodySize === -1) {
            return "Not available";
        }

        if (harRequest.bodySize === 0) {
            return "Empty";
        }

        return JSON.stringify(harRequest.postData);
    }
}
