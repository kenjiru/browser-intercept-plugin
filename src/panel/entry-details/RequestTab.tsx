import {PureComponent, ReactElement} from "react";
import * as React from "react";

import DetailField from "../detail-field/DetailField";

interface IRequestTabProps {
    harEntry: any;
}

export default class RequestTab extends PureComponent<IRequestTabProps> {
    public render(): ReactElement<any> {
        return (
            <div className="request-tab">
                <DetailField
                    label="Request URL"
                    value={this.props.harEntry.request.url}
                />

                <DetailField
                    label="Request Method"
                    value={this.props.harEntry.request.method}
                />
            </div>
        );
    }
}
