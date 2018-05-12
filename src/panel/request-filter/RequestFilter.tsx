import {Col, Input, Row} from "antd";
import {PureComponent, ReactElement} from "react";
import * as React from "react";

import "./RequestFilter.less";

interface IRequestFilterProps {
    onChange: (value: string) => void;
}

export default class RequestFilter extends PureComponent<IRequestFilterProps> {
    public render(): ReactElement<any> {
        return (
            <Row className="request-filter">
                <Col span={4}>
                    <Input
                        size="small"
                        placeholder="Filter"
                        onChange={this.handleChange}
                    />
                </Col>
            </Row>
        );
    }

    private handleChange = (ev) => {
        this.props.onChange(ev.target.value);
    }
}
