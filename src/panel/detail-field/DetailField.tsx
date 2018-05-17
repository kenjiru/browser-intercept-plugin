import {PureComponent, ReactElement} from "react";
import * as React from "react";

import "./DetailField.less";

interface IDetailFieldProps {
    label: string;
    value: string;
}

export default class DetailField extends PureComponent<IDetailFieldProps> {
    public render(): ReactElement<any> {
        return (
            <div className="details-field">
                <span className="field-label">{this.props.label}</span>
                <span className="field-value">{this.props.value}</span>
            </div>
        );
    }
}
