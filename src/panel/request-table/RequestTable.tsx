import {Table} from "antd";
import * as React from "react";
import {PureComponent, ReactElement} from "react";

import {IRequestRow} from "../PanelService";
import WindowSize from "../window-size/WindowSize";

import "./RequestTable.less";

const compareStr = (first: string = "", second: string = ""): number => {
    return first.toLowerCase().localeCompare(second.toLowerCase());
};

const compareNumber = (first: number, second: number): number => first - second;

const columns = [{
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (first: IRequestRow, second: IRequestRow): number => compareStr(first.name, second.name),
}, {
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
    dataSource: any;
}

const OFFSET_TOP: number = 30;

export default class RequestTable extends PureComponent<IRequestTableProps> {
    private static getRowClassName(record: any, index: number): string {
        return index % 2 === 0 ? "row-even" : "row-odd";
    }

    public render(): ReactElement<Table<IRequestRow>> {
        return (
            <WindowSize
                render={this.renderTable}
                updateTimeStamp={this.getTimeStamp()}
            />
        );
    }

    private renderTable = (width: number, height: number): ReactElement<Table<IRequestRow>> => {
        return (
            <Table
                className="request-table"
                dataSource={this.props.dataSource}
                columns={columns}
                pagination={false}
                size="small"
                rowClassName={RequestTable.getRowClassName}
                scroll={{y: height - OFFSET_TOP}}
            />
        );
    }

    private getTimeStamp(): number {
        return new Date().getTime();
    }
}
