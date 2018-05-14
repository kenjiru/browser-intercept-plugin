import {Component, ReactElement} from "react";
import * as React from "react";
import * as SplitPane from "react-split-pane";

import "./SmartSplitPane.less";

interface ISmartSplitPaneProps {
    isDisabled: boolean;
}

export default class SmartSplitPane extends Component<ISmartSplitPaneProps> {
    public render(): ReactElement<any> {
        console.log("isDisabled", this.props.isDisabled);

        return (
            <SplitPane
                split="vertical"
                size={this.getSize()}
                defaultSize="80%"
                allowResize={this.getAllowResize()}
            >
                {this.props.children}
            </SplitPane>
        );
    }

    private getSize(): string {
        if (this.props.isDisabled === true) {
            return "100%";
        }

        return "80%";
    }

    private getAllowResize(): boolean {
        return this.props.isDisabled !== true;
    }
}
