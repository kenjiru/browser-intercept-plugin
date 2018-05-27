import * as _ from "lodash";
import {inject, observer} from "mobx-react";
import * as React from "react";
import {PureComponent, ReactElement} from "react";
import {RowsStore, rowsStore} from "../model/RowsStore";
import {IRequestRow} from "../services/HarService";
import EntryDetails from "./entry-details/EntryDetails";
import RequestFilter from "./request-filter/RequestFilter";
import RequestTable from "./request-table/RequestTable";
import SimpleSplitPane from "./simple-split-pane/SimpleSplitPane";

import "./Panel.less";

interface IPanelState {
    selectedRow?: IRequestRow;
    filter?: string;
}

interface IPanelProps {
    rowsStore?: RowsStore;
}

@inject("rowsStore")
@observer
export default class Panel extends PureComponent<IPanelProps, IPanelState> {
    constructor(props: any) {
        super(props);

        this.state = {
        };
    }

    public render(): ReactElement<RequestTable> {
        return (
            <div className="panel">
                <RequestFilter onChange={this.handleFilterChange} />
                <SimpleSplitPane isDisabled={this.isRowSelected() === false}>
                    <RequestTable
                        dataSource={this.getTableDataSource()}
                        onSelectRow={this.handleTableRowSelected}
                        selectedRow={this.state.selectedRow}
                    />
                    {this.renderEntryDetails()}
                </SimpleSplitPane>
            </div>
        );
    }

    private renderEntryDetails(): ReactElement<any> {
        if (this.isRowSelected() === false) {
            return;
        }

        return (
            <EntryDetails
                harEntry={this.state.selectedRow.harEntry}
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
        return _.filter(this.props.rowsStore.getRows(), this.filterTableRow);
    }

    private filterTableRow = (tableRow: IRequestRow): boolean => {
        const filter: string = this.state.filter;

        return _.isEmpty(filter) || _.isEmpty(tableRow.url) || tableRow.url.indexOf(filter) > -1;
    }

    private isEqualToSelectedRow(selectedRow: IRequestRow): boolean {
        return _.isEmpty(this.state.selectedRow) === false && this.state.selectedRow.key === selectedRow.key;
    }

    private isRowSelected(): boolean {
        return _.isNil(this.state.selectedRow) === false;
    }
}
