import * as _ from "lodash";
import * as React from "react";
import {PureComponent, ReactElement} from "react";
import PanelService, {IRequestRow} from "./PanelService";
import RequestDetails from "./request-details/RequestDetails";
import RequestFilter from "./request-filter/RequestFilter";
import RequestTable from "./request-table/RequestTable";
import SmartSplitPane from "./smart-split-pane/SmartSplitPane";

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
        setInterval(() => {
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
                <SmartSplitPane isDisabled={this.isRowSelected() === false}>
                    <RequestTable
                        dataSource={this.getTableDataSource()}
                        onSelectRow={this.handleTableRowSelected}
                    />
                    {this.renderRequestDetails()}
                </SmartSplitPane>
            </div>
        );
    }

    private renderRequestDetails(): ReactElement<any> {
        if (this.isRowSelected() === false) {
            return;
        }

        return (
            <RequestDetails
                requestRow={this.state.selectedRow}
            />
        );
    }

    private handleTableRowSelected = (selectedRow: IRequestRow): void => {
        if (this.isEqualToSelectedRow(selectedRow)) {
            selectedRow = null;
        }

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

    private isEqualToSelectedRow(selectedRow: IRequestRow): boolean {
        return _.isEmpty(this.state.selectedRow) === false && this.state.selectedRow.name === selectedRow.name;
    }

    private isRowSelected(): boolean {
        return _.isNil(this.state.selectedRow) === false;
    }
}
