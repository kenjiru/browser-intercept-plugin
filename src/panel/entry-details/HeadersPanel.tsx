import {Collapse} from "antd";
import * as _ from "lodash";
import {PureComponent, ReactElement} from "react";
import * as React from "react";

import DetailField from "../detail-field/DetailField";

interface IHeadersPanelProps {
    headers: any[];
    key: string;
}

export default class HeadersPanel extends PureComponent<IHeadersPanelProps> {
    public render(): ReactElement<any> {
        // It's necessary to pass the props because the Collapse component adds some extra props when rendering
        return (
            <Collapse.Panel
                {...this.props}
                header={this.getHeaderText()}
                key={this.props.key}
            >
                {this.renderHeaders()}
            </Collapse.Panel>
        );
    }

    private renderHeaders(): Array<ReactElement<DetailField>> {
        const headers: any[] = this.getSortedHeaders();

        return _.map(headers, (header: any, index: number): ReactElement<any> => (
            <DetailField
                key={index}
                label={header.name}
                value={header.value}
            />
        ));
    }

    private getSortedHeaders(): any[] {
        return _.sortBy(this.props.headers, "name");
    }

    private getHeaderText(): string {
        return `Headers (${this.props.headers.length})`;
    }
}
