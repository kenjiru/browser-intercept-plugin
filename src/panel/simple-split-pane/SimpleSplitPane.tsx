import {Component, ReactElement} from "react";
import * as React from "react";

import "./SimpleSplitPane.less";

interface ISimpleSplitPaneProps {
    isDisabled: boolean;
}

export default class SimpleSplitPane extends Component<ISimpleSplitPaneProps> {
    public render(): ReactElement<any> {
        return (
            <div className="simple-split-pane">
                {this.renderChildren()}
            </div>
        );
    }

    private renderChildren(): Array<ReactElement<any>> {
        return React.Children.map(this.props.children, (child: ReactElement<any>, index: number): ReactElement<any> => {
            if (index === 1 && this.props.isDisabled) {
                return null;
            }

            return React.cloneElement(child, {
                className: `pane-${index}`,
            });
        });
    }
}
