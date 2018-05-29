import {Table} from "antd";
import * as classNames from "classnames";
import * as _ from "lodash";
import * as React from "react";
import {PureComponent, ReactElement} from "react";

import {IRequestRow} from "../../services/HarService";
import WindowSize from "../window-size/WindowSize";

import "./RequestTable.less";

const compareStr = (first: string = "", second: string = ""): number => {
    return first.toLowerCase().localeCompare(second.toLowerCase());
};

const compareNumber = (first: number, second: number): number => first - second;

const minimalColumns = [{
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (first: IRequestRow, second: IRequestRow): number => compareStr(first.name, second.name),
},
];

const fullColumns = [...minimalColumns, {
    title: "Method",
    dataIndex: "method",
    key: "method",
    width: 100,
    sorter: (first: IRequestRow, second: IRequestRow): number => compareStr(first.method, second.method),
}, {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 100,
    sorter: (first: IRequestRow, second: IRequestRow): number => compareNumber(first.status, second.status),
}, {
    title: "Mime Type",
    dataIndex: "type",
    key: "type",
    width: 140,
    sorter: (first: IRequestRow, second: IRequestRow): number => compareStr(first.type, second.type),
}, {
    title: "Size",
    dataIndex: "sizeString",
    key: "size",
    width: 100,
    sorter: (first: IRequestRow, second: IRequestRow): number => compareNumber(first.size, second.size),
}, {
    title: "Time",
    dataIndex: "time",
    key: "time",
    width: 100,
    sorter: (first: IRequestRow, second: IRequestRow): number => compareNumber(first.time, second.time),
}];

interface IRequestTableProps {
    className?: string;
    dataSource: any;
    onSelectRow: (selectedRow: IRequestRow) => void;
    selectedRow: IRequestRow;
}

const OFFSET_TOP: number = 30;

export default class RequestTable extends PureComponent<IRequestTableProps> {
    public render(): ReactElement<Table<IRequestRow>> {
        return this.renderTable();
    }

    // FIXME Use this method after fixing the panel layout issues
    private renderResizableTable(): ReactElement<any> {
        return (
            <WindowSize
                render={this.renderTable}
                updateTimeStamp={this.getTimeStamp()}
            />
        );
    }

    private renderTable = (width?: number, height?: number): ReactElement<Table<IRequestRow>> => {
        return (
            <Table
                className={this.getClassName()}
                dataSource={this.props.dataSource}
                columns={this.getColumns()}
                pagination={false}
                size="small"
                rowClassName={this.getRowClassName}
                onRow={this.handleRow}
            />
        );
    }

    private handleRow = (record) => ({
        onClick: () => {
            this.props.onSelectRow(record);
        },
    })

    private getColumns(): any[] {
        if (this.hasSelectedRow()) {
            return minimalColumns;
        }

        return fullColumns;
    }

    private getRowClassName = (record: IRequestRow, index: number): string => {
        const isRowSelected: boolean = this.isRowSelected(record);

        return classNames({
            "row-odd": index % 2 === 1,
            "row-selected": isRowSelected,
        });
    }

    private isRowSelected(row: IRequestRow): boolean {
        const selectedRow: IRequestRow = this.props.selectedRow;

        return _.isEmpty(selectedRow) === false && selectedRow.key === row.key;
    }

    private getTimeStamp(): number {
        return new Date().getTime();
    }

    private hasSelectedRow(): boolean {
        return _.isEmpty(this.props.selectedRow) === false;
    }

    private getClassName(): string {
        return classNames(
            "request-table",
            this.props.className,
        );
    }
}
