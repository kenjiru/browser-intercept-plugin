import * as React from "react";
import {Table} from "antd";

import "./Panel.less";

const dataSource = [{
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street'
}, {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
}];

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
}, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
}];

export default class Panel extends React.PureComponent {
    static getRowClassName(record: any, index: number): string {
        return index % 2 === 0 ? "row-even" : "row-odd";
    }

    render() {
        return (
            <div>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    size="small"
                    rowClassName={Panel.getRowClassName}
                />
            </div>
        );
    }
}
