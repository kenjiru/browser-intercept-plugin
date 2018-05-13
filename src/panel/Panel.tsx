import * as _ from "lodash";
import * as React from "react";
import {PureComponent, ReactElement} from "react";
import PanelService, {IRequestRow} from "./PanelService";
import RequestDetails from "./request-details/RequestDetails";
import RequestFilter from "./request-filter/RequestFilter";
import RequestTable from "./request-table/RequestTable";

import "./Panel.less";

interface IPanelState {
    requestRows?: IRequestRow[];
    selectedRow?: IRequestRow;
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
                <div>
                    <RequestTable
                        dataSource={this.getTableDataSource()}
                        onSelectRow={this.handleTableRowSelected}
                    />
                    {this.renderRequestDetails()}
                </div>
            </div>
        );
    }

    private renderRequestDetails(): ReactElement<any> {
        if (_.isEmpty(this.state.selectedRow)) {
            return null;
        }

        return (
            <RequestDetails
                requestRow={this.state.selectedRow}
            />
        )
    }

    private handleTableRowSelected = (selectedRow: IRequestRow): void => {
        console.log(selectedRow);

        this.setState({
            selectedRow,
        });
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
