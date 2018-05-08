import {Table} from "antd";
import * as React from "react";
import {PureComponent, ReactElement} from "react";

import {IRequestRow} from "../PanelService";
import WindowSize from "../window-size/WindowSize";

import "./RequestTable.less";

const columns = [{
    title: "Name",
    dataIndex: "name",
    key: "name",
}, {
    title: "Method",
    dataIndex: "method",
    key: "method",
    width: 100,
}, {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 100,
}, {
    title: "Type",
    dataIndex: "type",
    key: "type",
    width: 80,
}, {
    title: "Size",
    dataIndex: "size",
    key: "size",
    width: 100,
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
