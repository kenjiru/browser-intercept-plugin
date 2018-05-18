import {Collapse} from "antd";
import * as _ from "lodash";
import {PureComponent, ReactElement} from "react";
import * as React from "react";

import DetailField from "../detail-field/DetailField";

interface IRequestTabProps {
    harRequest: any;
}

export default class RequestTab extends PureComponent<IRequestTabProps> {
    public render(): ReactElement<Collapse> {
        const {harRequest} = this.props;

        return (
            <Collapse className="request-tab">
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

                <Collapse.Panel
                    header="Headers"
                    key="2"
                >
                    {this.renderHeaders()}
                </Collapse.Panel>

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

    private renderHeaders(): Array<ReactElement<DetailField>> {
        const headers: any[] = this.getHeaders();

        return _.map(headers, (header: any, index: number): ReactElement<any> => (
            <DetailField
                key={index}
                label={header.name}
                value={header.value}
            />
        ));
    }

    private getHeaders(): any[] {
        return _.sortBy(this.props.harRequest.headers, "name");
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
