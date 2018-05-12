import * as _ from "lodash";
import * as React from "react";
import {PureComponent, ReactElement} from "react";
import PanelService, {IRequestRow} from "./PanelService";
import RequestFilter from "./request-filter/RequestFilter";
import RequestTable from "./request-table/RequestTable";

import "./Panel.less";

interface IPanelState {
    requestRows?: IRequestRow[];
    filter?: string;
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
            <div>
                <RequestFilter onChange={this.handleFilterChange} />
                <RequestTable dataSource={this.getTableDataSource()} />
            </div>
        );
    }

    private handleFilterChange = (filter: string) => {
        this.setState({
            filter,
        });
    }

    private getTableDataSource(): IRequestRow[] {
        return _.filter(this.state.requestRows, this.filterTableRow);
    }

    private filterTableRow = (tableRow: IRequestRow): boolean => {
        const filter: string = this.state.filter;

        return _.isEmpty(filter) || _.isEmpty(tableRow.url) || tableRow.url.indexOf(filter) > -1;
    }
}
