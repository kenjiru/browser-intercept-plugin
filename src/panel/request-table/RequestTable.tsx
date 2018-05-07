import {Table} from "antd";
import * as React from "react";
import {PureComponent, ReactElement} from "react";

import "./RequestTable.less";

const columns = [{
    title: "Name",
    dataIndex: "name",
    key: "name",
}, {
    title: "Status",
    dataIndex: "status",
    key: "status",
}, {
    title: "Type",
    dataIndex: "type",
    key: "type",
}, {
    title: "Size",
    dataIndex: "size",
    key: "size",
}];

export default class RequestTable extends PureComponent<IRequestTableProps> {
    private static getRowClassName(record: any, index: number): string {
        return index % 2 === 0 ? "row-even" : "row-odd";
    }

    public render(): ReactElement<any> {
        return (
            <Table
                className="request-table"
                dataSource={this.props.dataSource}
                columns={columns}
                pagination={false}
                size="small"
                rowClassName={RequestTable.getRowClassName}
            />
        );
    }
}

interface IRequestTableProps {
    dataSource: any;
}
