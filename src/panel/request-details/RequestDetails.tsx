import {PureComponent, ReactElement} from "react";
import * as React from "react";
import {IRequestRow} from "../PanelService";

interface IRequestDetailsProps {
    requestRow: IRequestRow;
}

export default class RequestDetails extends PureComponent<IRequestDetailsProps> {
    public render(): ReactElement<any> {
        return (
            <div className="request-details">
                Request Details
            </div>
        );
    }
}
