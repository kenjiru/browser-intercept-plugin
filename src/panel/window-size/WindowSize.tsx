import * as _ from "lodash";
import {Component, ReactElement} from "react";
import * as React from "react";

interface IWindowSizeProps {
    render: (width: number, height: number) => ReactElement<any>;
    updateTimeStamp: number;
}

interface IWindowSizeState {
    width: number;
    height: number;
}

export default class WindowSize extends Component<IWindowSizeProps, IWindowSizeState> {
    constructor(props: IWindowSizeProps) {
        super(props);

        this.state = {
            width: 0,
            height: 0,
        };

        this.updateDimensions = _.debounce(this.updateDimensions, 200);
    }

    public componentWillReceiveProps(nextProps: IWindowSizeProps): void {
        if (this.props.updateTimeStamp !== nextProps.updateTimeStamp) {
            this.updateDimensions();
        }
    }

    public componentDidMount(): void {
        window.addEventListener("resize", this.updateDimensions);

        this.updateDimensions();
    }

    public componentWillUnmount(): void {
        window.removeEventListener("resize", this.updateDimensions);
    }

    public render(): ReactElement<any> {
        return this.props.render(this.state.width, this.state.height);
    }

    private updateDimensions = (): void => {
        this.setState({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        });
    }
}
