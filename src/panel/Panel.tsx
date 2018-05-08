import * as React from "react";
import {PureComponent, ReactElement} from "react";
import PanelService, {IRequestRow} from "./PanelService";
import RequestTable from "./request-table/RequestTable";

import "./Panel.less";

interface IPanelState {
    requestRows: IRequestRow[];
}

export default class Panel extends PureComponent<any, IPanelState> {
    constructor(props: any) {
        super(props);

        this.state = {
            requestRows: [],
        };
    }

    public componentDidMount(): void {
        setTimeout(() => {
            PanelService.getRequestRows().then((requestRows) => {
                this.setState({
                    requestRows,
                });
            });
        }, 1000);
    }

    public render(): ReactElement<RequestTable> {
        return (
            <RequestTable dataSource={this.state.requestRows} />
        );
    }
}
